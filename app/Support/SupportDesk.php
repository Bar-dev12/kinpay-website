<?php

namespace App\Support;

/**
 * Le formulaire de support n'est proposé que si un message peut réellement atteindre quelqu'un :
 *  - un destinataire valide est configuré (SUPPORT_TO_ADDRESS) ;
 *  - une adresse d'expédition valide est configurée (MAIL_FROM_ADDRESS, sans valeur d'exemple en production) ;
 *  - en production, le courrier part par un vrai transport (pas « log » ni « array », qui n'envoient rien).
 * Sinon le formulaire est masqué et la page Aide n'affiche que les contacts renseignés.
 */
final class SupportDesk
{
    /** Transports qui n'envoient aucun courriel à un humain. */
    public const SILENT_MAILERS = ['log', 'array'];

    public static function recipient(): ?string
    {
        $to = trim((string) config('vitrine.support.to'));

        return ($to !== '' && filter_var($to, FILTER_VALIDATE_EMAIL) !== false && ! Vitrine::isPlaceholder($to)) ? $to : null;
    }

    public static function available(): bool
    {
        if (! self::recipient()) {
            return false;
        }
        $from = trim((string) config('mail.from.address'));
        if (filter_var($from, FILTER_VALIDATE_EMAIL) === false) {
            return false;
        }
        if (app()->isProduction() && (Vitrine::isPlaceholder($from) || in_array(config('mail.default'), self::SILENT_MAILERS, true))) {
            return false;
        }

        return true;
    }

    public static function maxPerHour(): int
    {
        return max(1, (int) config('vitrine.support.max_per_hour', 5));
    }
}
