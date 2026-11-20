@php
    $seo = $seo ?? \App\Http\Controllers\PageController::seo(__('vitrine.seo.not_found'), __('vitrine.seo.default_description'), null);
@endphp
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title inertia>{{ $seo['title'] }}</title>
    <meta name="description" content="{{ $seo['description'] }}">
@if ($seo['index'])
    <meta name="robots" content="index, follow">
@else
    <meta name="robots" content="noindex, nofollow">
@endif
@if ($seo['canonical'])
    <link rel="canonical" href="{{ $seo['canonical'] }}">
    <meta property="og:url" content="{{ $seo['canonical'] }}">
@endif
    <meta property="og:type" content="website">
    <meta property="og:locale" content="fr_FR">
    <meta property="og:site_name" content="{{ $seo['siteName'] }}">
    <meta property="og:title" content="{{ $seo['title'] }}">
    <meta property="og:description" content="{{ $seo['description'] }}">
    <meta name="theme-color" content="#0646d8">
    <link rel="icon" href="{{ asset('favicon.svg') }}" type="image/svg+xml">
    <link rel="preload" href="{{ asset('fonts/instrument-sans-600-fr-v1.woff2') }}" as="font" type="font/woff2" crossorigin>
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.tsx'])
</head>
<body>
    @inertia
    <noscript><p class="noscript">{{ __('vitrine.seo.site_name') }} — {{ $seo['description'] }}</p></noscript>
</body>
</html>
