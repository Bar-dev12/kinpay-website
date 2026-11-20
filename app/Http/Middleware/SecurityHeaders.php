<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Vite;
use Symfony\Component\HttpFoundation\Response;

/**
 * En-têtes de sécurité de toutes les réponses.
 *
 * CSP stricte adaptée à Inertia servi en fichiers statiques (public/build) : scripts et feuilles de style du site
 * seulement, avec un nonce par requête pour les balises émises par @vite ; aucune ressource externe (polices, scripts,
 * images auto-hébergés), aucun traceur. Les données de page d'Inertia sont un bloc <script type="application/json">,
 * jamais exécuté. En développement avec le serveur Vite (« npm run dev »), la CSP est levée pour le rechargement à chaud.
 */
class SecurityHeaders
{
    public function handle(Request $request, Closure $next): Response
    {
        $nonce = Vite::useCspNonce();

        $response = $next($request);

        $h = $response->headers;
        if (! Vite::isRunningHot()) {
            $h->set('Content-Security-Policy', self::csp($nonce, $request->isSecure()));
        }
        $h->set('X-Content-Type-Options', 'nosniff');
        $h->set('X-Frame-Options', 'DENY');
        $h->set('Referrer-Policy', 'strict-origin-when-cross-origin');
        $h->set('Permissions-Policy', 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), browsing-topics=()');
        $h->set('Cross-Origin-Opener-Policy', 'same-origin');
        $h->set('Cross-Origin-Resource-Policy', 'same-origin');
        if (app()->isProduction() && $request->isSecure()) {
            $h->set('Strict-Transport-Security', 'max-age=31536000');
        }
        if (! app()->isProduction()) {
            $h->set('X-Robots-Tag', 'noindex, nofollow');
        }

        return $response;
    }

    public static function csp(string $nonce, bool $secure = false): string
    {
        $rules = [
            "default-src 'none'",
            "script-src 'self' 'nonce-{$nonce}'",
            "style-src 'self' 'nonce-{$nonce}'",
            "img-src 'self' data:",
            "font-src 'self'",
            "connect-src 'self'",
            "manifest-src 'self'",
            "form-action 'self'",
            "frame-ancestors 'none'",
            "base-uri 'none'",
            "object-src 'none'",
        ];
        if ($secure) {
            $rules[] = 'upgrade-insecure-requests';
        }

        return implode('; ', $rules);
    }
}
