<?php

namespace App\Mail;

use App\Models\SupportTicket;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;

/**
 * Courriel envoyé au support (SUPPORT_TO_ADDRESS). Envoi synchrone, jamais en file d'attente : le formulaire doit savoir
 * si le transport a accepté le message avant d'afficher un succès. « Répondre » écrit directement au visiteur.
 */
class SupportMessageMail extends Mailable
{
    public function __construct(public SupportTicket $ticket) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: __('vitrine.support.mail_subject', [
                'ref' => $this->ticket->reference(),
                'subject' => str_replace(["\r", "\n"], ' ', $this->ticket->subject),
            ]),
            replyTo: [new Address($this->ticket->email, str_replace(["\r", "\n"], ' ', $this->ticket->name))],
        );
    }

    public function content(): Content
    {
        return new Content(text: 'emails.support-message');
    }
}
