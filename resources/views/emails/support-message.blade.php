{{-- Courriel en texte brut (text/plain) : aucun HTML n'est interprété, les champs sont donc repris tels quels. --}}
{!! __('vitrine.support.mail_title') !!} — {{ $ticket->reference() }}

Nom : {!! $ticket->name !!}
Adresse électronique : {!! $ticket->email !!}
Sujet : {!! $ticket->subject !!}

Message :
{!! $ticket->message !!}

--
Suivi : php artisan support:ticket {{ $ticket->getKey() }}
