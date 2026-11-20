<?php

namespace App\Http\Controllers;

use App\Mail\SupportMessageMail;
use App\Models\SupportTicket;
use App\Support\SupportDesk;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Validator;
use RuntimeException;
use Throwable;

/**
 * Formulaire de support de la page Aide.
 *
 * Le message de succès n'est renvoyé QUE si le courriel au support a été accepté par le transport (SMTP…). Le ticket
 * est enregistré dans la même transaction : si l'envoi échoue, rien n'est conservé et le visiteur est invité à
 * réessayer. Anti-abus : limite par adresse IP (clé hachée, durée une heure), champ piège, validation stricte. Le
 * journal ne contient ni le corps du message ni l'adresse du visiteur.
 */
class SupportController extends Controller
{
    /** Nom du champ piège : invisible pour les personnes, rempli par les robots. */
    public const TRAP = 'website';

    public function store(Request $request): RedirectResponse
    {
        abort_unless(SupportDesk::available(), 404);

        $key = 'support:'.hash('sha256', (string) $request->ip());
        if (RateLimiter::tooManyAttempts($key, SupportDesk::maxPerHour())) {
            $minutes = (int) ceil(RateLimiter::availableIn($key) / 60);

            return back()->withErrors(['form' => __('vitrine.support.throttled', ['minutes' => max(1, $minutes)])]);
        }

        if (filled($request->input(self::TRAP))) {
            RateLimiter::hit($key, 3600);
            Log::notice('support.piege');

            return back()->withErrors(['form' => __('vitrine.support.rejected')]);
        }

        $validated = Validator::make($request->only(['name', 'email', 'subject', 'message']), [
            'name' => ['required', 'string', 'min:2', 'max:100', 'regex:/^[^\p{Cc}<>]+$/u'],
            'email' => ['required', 'string', 'max:190', 'email:rfc'],
            'subject' => ['required', 'string', 'min:3', 'max:150', 'regex:/^[^\p{Cc}<>]+$/u'],
            'message' => ['required', 'string', 'min:10', 'max:3000'],
        ], trans('vitrine_validation.messages'), trans('vitrine_validation.attributes'))->validate();

        RateLimiter::hit($key, 3600);

        try {
            $ticket = DB::transaction(function () use ($validated) {
                $ticket = SupportTicket::create($validated + ['status' => SupportTicket::STATUS_NEW]);
                $sent = Mail::to(SupportDesk::recipient())->send(new SupportMessageMail($ticket));
                if ($sent === null) {
                    throw new RuntimeException('Courriel non accepté par le transport.');
                }

                return $ticket;
            });
        } catch (Throwable $e) {
            Log::warning('support.envoi_echoue', ['erreur' => $e::class]);

            return back()->withErrors(['form' => __('vitrine.support.failed')]);
        }

        Log::info('support.ticket', ['ticket' => $ticket->reference()]);

        return back()->with('supportTicket', $ticket->reference());
    }
}
