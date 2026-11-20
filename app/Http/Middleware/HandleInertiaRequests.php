<?php

namespace App\Http\Middleware;

use App\Support\Vitrine;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Données partagées : marque, liens vers l'application, contacts, réseaux et textes communs, tous lus côté serveur
     * dans config/vitrine.php et lang/fr (aucun build front nécessaire pour les changer).
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'site' => fn () => Vitrine::shared(),
            'flash' => fn () => ['supportTicket' => $request->session()->get('supportTicket')],
        ];
    }
}
