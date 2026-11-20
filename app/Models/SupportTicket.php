<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Demande envoyée par le formulaire de support. Seuls le nom, l'adresse électronique, le sujet et le message sont
 * conservés (ni adresse IP, ni navigateur). Consultation : php artisan support:tickets ; statut : support:ticket.
 */
class SupportTicket extends Model
{
    public const STATUS_NEW = 'new';

    /** Statuts de la table support_tickets (migration d'origine), avec leur libellé. */
    public const STATUSES = [
        'new' => 'Nouveau',
        'in_progress' => 'En cours',
        'resolved' => 'Résolu',
        'closed' => 'Fermé',
    ];

    protected $fillable = [
        'name',
        'email',
        'subject',
        'message',
        'status',
    ];

    /** Référence communiquée au visiteur et reprise dans le courriel. */
    public function reference(): string
    {
        return 'KPC-'.str_pad((string) $this->getKey(), 6, '0', STR_PAD_LEFT);
    }
}
