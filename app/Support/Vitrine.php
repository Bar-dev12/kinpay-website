<?php

namespace App\Support;

use Illuminate\Support\Carbon;

/**
 * Données publiques du site vitrine, lues dans config/vitrine.php (variables d'environnement).
 *
 * Règle : une valeur vide, provisoire (« XXX », « 000000000 », « # »…), d'un ancien domaine ou invalide est traitée
 * comme absente, et l'élément correspondant est masqué. Rien n'est jamais écrit en dur dans les pages.
 */
final class Vitrine
{
    /** Domaines d'adresse électronique des anciennes marques, jamais affichés. */
    public const OLD_EMAIL_DOMAINS = ['kinpay.com', 'kinpay.cd'];

    /** Adresse https valide, sans valeur provisoire ; sinon null. */
    public static function url(mixed $value): ?string
    {
        $value = trim((string) $value);
        if ($value === '' || self::isPlaceholder($value)) {
            return null;
        }
        if (filter_var($value, FILTER_VALIDATE_URL) === false) {
            return null;
        }
        $scheme = strtolower((string) parse_url($value, PHP_URL_SCHEME));
        $host = (string) parse_url($value, PHP_URL_HOST);
        // En local, http://localhost ou 127.0.0.1 restent acceptés pour le développement.
        $local = in_array($host, ['localhost', '127.0.0.1'], true) && ! app()->isProduction();
        if ($host === '' || ($scheme !== 'https' && ! ($scheme === 'http' && $local))) {
            return null;
        }

        return $value;
    }

    public static function email(mixed $value): ?string
    {
        $value = trim((string) $value);
        if ($value === '' || self::isPlaceholder($value) || filter_var($value, FILTER_VALIDATE_EMAIL) === false) {
            return null;
        }
        $domain = strtolower(substr(strrchr($value, '@') ?: '', 1));
        if (in_array($domain, self::OLD_EMAIL_DOMAINS, true)) {
            return null;
        }

        return $value;
    }

    /** Numéro international : chiffres seulement (indicatif compris), 8 à 15 chiffres, sinon null. */
    public static function phoneDigits(mixed $value): ?string
    {
        $value = trim((string) $value);
        if ($value === '' || self::isPlaceholder($value)) {
            return null;
        }
        $digits = preg_replace('/[\s().-]+/', '', ltrim($value, '+'));

        return preg_match('/^[1-9][0-9]{7,14}$/', (string) $digits) ? $digits : null;
    }

    public static function text(mixed $value, int $max = 200): ?string
    {
        $value = trim((string) $value);
        if ($value === '' || self::isPlaceholder($value) || mb_strlen($value) > $max) {
            return null;
        }

        return $value;
    }

    /** Valeurs manifestement provisoires : X répétés, suites de zéros, « # », « exemple », « à compléter »… */
    public static function isPlaceholder(string $value): bool
    {
        $v = mb_strtolower(trim($value));

        return $v === '#'
            || $v === 'null'
            || str_contains($v, 'xxx')
            || preg_match('/0{6,}/', $v) === 1
            || str_contains($v, 'example.')
            || str_contains($v, 'exemple')
            || str_contains($v, 'à compléter')
            || str_contains($v, 'a completer')
            || str_contains($v, 'todo');
    }

    /** Données partagées par toutes les pages. */
    public static function shared(): array
    {
        $c = config('vitrine');
        $legalBase = self::url($c['legal']['base_url'] ?? null);
        $legal = [];
        foreach (['conditions', 'confidentialite', 'mentions'] as $key) {
            $href = $legalBase ? self::url(rtrim($legalBase, '/').($c['legal']['paths'][$key] ?? '')) : null;
            if ($href) {
                $legal[] = ['key' => $key, 'label' => __('vitrine.legal.'.$key), 'href' => $href];
            }
        }

        $whatsapp = self::phoneDigits($c['contact']['whatsapp'] ?? null);
        $phone = self::phoneDigits($c['contact']['phone'] ?? null);

        $social = [];
        foreach ($c['social'] ?? [] as $network => $value) {
            if ($href = self::url($value)) {
                $social[] = ['key' => $network, 'label' => __('vitrine.social.'.$network), 'href' => $href];
            }
        }

        return [
            'brand' => $c['brand'],
            'slogan' => __('vitrine.slogan'),
            'links' => [
                'login' => self::url($c['app']['login_url'] ?? null),
                'register' => self::url($c['app']['register_url'] ?? null),
                'googlePlay' => self::url($c['stores']['google_play'] ?? null),
                'appStore' => self::url($c['stores']['app_store'] ?? null),
            ],
            'legal' => $legal,
            'legalProvisional' => (bool) ($c['legal']['provisional'] ?? true),
            'contact' => [
                'email' => self::email($c['contact']['email'] ?? null),
                'phone' => $phone ? '+'.$phone : null,
                'whatsapp' => $whatsapp ? 'https://wa.me/'.$whatsapp : null,
                'address' => self::text($c['contact']['address'] ?? null),
            ],
            'social' => $social,
            'ui' => trans('vitrine.common'),
        ];
    }

    /**
     * Chiffres clés publiables : seulement les entrées complètes (valeur, libellé, source, date AAAA-MM-JJ non future).
     *
     * @return list<array{value: string, label: string, source: string, date: string}>
     */
    public static function stats(): array
    {
        $out = [];
        foreach ((array) config('vitrine.stats', []) as $row) {
            if (! is_array($row)) {
                continue;
            }
            $value = self::text($row['value'] ?? null, 20);
            $label = self::text($row['label'] ?? null, 60);
            $source = self::text($row['source'] ?? null, 160);
            $date = (string) ($row['date'] ?? '');
            if (! $value || ! $label || ! $source || ! preg_match('/^\d{4}-\d{2}-\d{2}$/', $date)) {
                continue;
            }
            try {
                $d = Carbon::createFromFormat('!Y-m-d', $date);
            } catch (\Throwable) {
                continue;
            }
            if (! $d || $d->format('Y-m-d') !== $date || $d->isFuture()) {
                continue;
            }
            $out[] = ['value' => $value, 'label' => $label, 'source' => $source, 'date' => $d->format('d/m/Y')];
        }

        return $out;
    }
}
