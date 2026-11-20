{{-- Pages d'erreur sobres, compatibles avec la CSP (feuille de style avec nonce), sans ressource externe. --}}
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex, nofollow">
    <title>@yield('title') – KinPay Cash</title>
    <link rel="icon" href="{{ asset('favicon.svg') }}" type="image/svg+xml">
    <style nonce="{{ \Illuminate\Support\Facades\Vite::cspNonce() }}">
        body{margin:0;font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;color:#0b1b44;background:#f5f7fb;line-height:1.6}
        main{max-width:36rem;margin:0 auto;padding:4rem 1rem}
        h1{font-size:2rem;line-height:1.2;margin:0 0 1rem}
        p{color:#475467}
        a{display:inline-flex;align-items:center;min-height:2.75rem;padding:.5rem 1.25rem;border-radius:.75rem;background:#0646d8;color:#fff;font-weight:600;text-decoration:none}
        a:focus-visible{outline:3px solid #0646d8;outline-offset:3px}
    </style>
</head>
<body>
<main>
    <p><strong>KinPay Cash</strong></p>
    <h1>@yield('title')</h1>
    <p>@yield('message')</p>
    <a href="{{ url('/') }}">Revenir à l’accueil</a>
</main>
</body>
</html>
