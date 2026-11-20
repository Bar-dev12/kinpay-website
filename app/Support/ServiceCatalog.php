<?php

namespace App\Support;

/**
 * Catalogue des services, lu dans un fichier unique : resources/data/services.json.
 *
 * Statuts : « disponible » (le service fonctionne dans l'application), « bientot » (annoncé, pas encore ouvert),
 * « masque » (retiré de la page). Un statut inconnu est traité comme « masque » : une faute de frappe ne peut jamais
 * afficher « Disponible ».
 */
final class ServiceCatalog
{
    public const STATUSES = ['disponible', 'bientot', 'masque'];

    /** Icônes autorisées (dessins génériques, aucun logo de marque). */
    public const ICONS = ['wallet', 'send', 'credit-card', 'package', 'smartphone', 'phone', 'arrow-down', 'nfc', 'store', 'play', 'tv', 'repeat', 'school', 'plus'];

    public static function path(): string
    {
        return (string) config('vitrine.services_file', resource_path('data/services.json'));
    }

    /** @return list<array<string, mixed>> entrées brutes du fichier */
    public static function raw(): array
    {
        $data = json_decode((string) file_get_contents(self::path()), true, 32, JSON_THROW_ON_ERROR);

        return array_values($data['services'] ?? []);
    }

    /**
     * Services visibles (statut disponible ou bientot), dans l'ordre du fichier.
     *
     * @return list<array{id: string, name: string, description: string, icon: string, status: string, statusLabel: string, brand: bool}>
     */
    public static function visible(): array
    {
        $out = [];
        foreach (self::raw() as $s) {
            $status = in_array($s['status'] ?? null, self::STATUSES, true) ? $s['status'] : 'masque';
            if ($status === 'masque') {
                continue;
            }
            $out[] = [
                'id' => (string) $s['id'],
                'name' => (string) $s['name'],
                'description' => (string) $s['description'],
                'icon' => in_array($s['icon'] ?? null, self::ICONS, true) ? $s['icon'] : 'plus',
                'status' => $status,
                'statusLabel' => __('vitrine.status.'.$status),
                'brand' => (bool) ($s['marque'] ?? false),
            ];
        }

        return $out;
    }

    /** Au moins un service de marque tierce est affiché : la mention sur les marques est alors obligatoire. */
    public static function showsBrands(): bool
    {
        foreach (self::visible() as $s) {
            if ($s['brand']) {
                return true;
            }
        }

        return false;
    }
}
