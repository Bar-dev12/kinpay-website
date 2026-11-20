<?php

use App\Models\SupportTicket;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Str;

/*
| Tickets du formulaire de support (pas d'interface d'administration) :
|   php artisan support:tickets [--status=new] [--limit=20]    liste
|   php artisan support:ticket 12                               détail d'un ticket
|   php artisan support:ticket 12 --status=resolved            change le statut
*/

Artisan::command('support:tickets {--status= : new, in_progress, resolved ou closed} {--limit=20 : nombre de lignes}', function () {
    $status = $this->option('status');
    if ($status !== null && ! array_key_exists($status, SupportTicket::STATUSES)) {
        $this->error('Statut inconnu. Valeurs possibles : '.implode(', ', array_keys(SupportTicket::STATUSES)).'.');

        return 1;
    }
    $limit = max(1, min(500, (int) $this->option('limit')));
    $tickets = SupportTicket::query()
        ->when($status, fn ($q) => $q->where('status', $status))
        ->latest('id')->limit($limit)->get();

    if ($tickets->isEmpty()) {
        $this->info('Aucun ticket.');

        return 0;
    }

    $this->table(['Référence', 'Reçu le', 'Statut', 'Nom', 'Adresse', 'Sujet'], $tickets->map(fn (SupportTicket $t) => [
        $t->reference(),
        $t->created_at?->format('d/m/Y H:i'),
        SupportTicket::STATUSES[$t->status] ?? $t->status,
        Str::limit($t->name, 30),
        $t->email,
        Str::limit($t->subject, 50),
    ])->all());

    return 0;
})->purpose('Liste les tickets du formulaire de support');

Artisan::command('support:ticket {id : numéro du ticket (sans KPC-)} {--status= : nouveau statut (new, in_progress, resolved, closed)}', function () {
    $id = (int) ltrim(preg_replace('/^KPC-/i', '', (string) $this->argument('id')), '0');
    $ticket = SupportTicket::find($id);
    if (! $ticket) {
        $this->error('Ticket introuvable.');

        return 1;
    }

    if (($status = $this->option('status')) !== null) {
        if (! array_key_exists($status, SupportTicket::STATUSES)) {
            $this->error('Statut inconnu. Valeurs possibles : '.implode(', ', array_keys(SupportTicket::STATUSES)).'.');

            return 1;
        }
        $ticket->update(['status' => $status]);
        $this->info($ticket->reference().' : statut « '.SupportTicket::STATUSES[$status].' ».');

        return 0;
    }

    $this->line($ticket->reference().' — '.(SupportTicket::STATUSES[$ticket->status] ?? $ticket->status));
    $this->line('Reçu le : '.$ticket->created_at?->format('d/m/Y H:i'));
    $this->line('Nom : '.$ticket->name);
    $this->line('Adresse : '.$ticket->email);
    $this->line('Sujet : '.$ticket->subject);
    $this->newLine();
    $this->line($ticket->message);

    return 0;
})->purpose('Affiche un ticket de support ou change son statut');
