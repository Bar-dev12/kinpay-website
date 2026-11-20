<?php

/*
|--------------------------------------------------------------------------
| Site vitrine KinPay Cash
|--------------------------------------------------------------------------
|
| Toutes les adresses, tous les contacts et tous les liens viennent d'ici (variables d'environnement), jamais du code des
| pages. Une valeur vide, provisoire ou invalide n'est PAS affichée : l'élément correspondant est masqué
| (App\Support\Vitrine). Les valeurs sont lues par le serveur à chaque requête et transmises aux pages par Inertia : les
| changer ne demande aucun nouveau build front (le serveur n'a pas Node).
|
| Seules exceptions : les adresses de l'application (connexion, inscription, pages légales) ont une valeur par défaut EN
| PRODUCTION, celle de l'application officielle, comme le demande le cahier des charges (docs/NETTOYAGE.md).
|
*/

$production = env('APP_ENV') === 'production';
$appBase = env('KINPAY_APP_BASE_URL', $production ? 'https://cps.kinpaycash.com' : null);
$appPath = fn (string $path) => $appBase ? rtrim($appBase, '/').$path : null;

return [

    'brand' => 'KinPay Cash',

    // Application (autre projet, servi sur un autre domaine).
    'app' => [
        'login_url' => env('APP_LOGIN_URL', $appPath('/login')),
        'register_url' => env('APP_REGISTER_URL', $appPath('/inscription')),
    ],

    // Pages légales servies par l'application.
    'legal' => [
        'base_url' => env('LEGAL_BASE_URL', $appBase),
        'paths' => [
            'conditions' => '/conditions',
            'confidentialite' => '/confidentialite',
            'mentions' => '/mentions-legales',
        ],
        // Tant que les textes légaux sont provisoires, la mention « provisoire » accompagne chaque lien.
        'provisional' => (bool) env('LEGAL_PAGES_PROVISIONAL', true),
    ],

    // Boutiques d'applications : masquées tant qu'elles ne sont pas renseignées.
    'stores' => [
        'google_play' => env('GOOGLE_PLAY_URL'),
        'app_store' => env('APP_STORE_URL'),
    ],

    // Contacts publics : chacun masqué tant qu'il n'est pas renseigné.
    'contact' => [
        'email' => env('CONTACT_EMAIL'),
        'phone' => env('CONTACT_PHONE'),
        'whatsapp' => env('CONTACT_WHATSAPP'),
        'address' => env('CONTACT_ADDRESS'),
    ],

    // Réseaux sociaux : masqués tant qu'ils ne sont pas renseignés (adresse https complète).
    'social' => [
        'facebook' => env('SOCIAL_FACEBOOK_URL'),
        'instagram' => env('SOCIAL_INSTAGRAM_URL'),
        'linkedin' => env('SOCIAL_LINKEDIN_URL'),
        'x' => env('SOCIAL_X_URL'),
        'tiktok' => env('SOCIAL_TIKTOK_URL'),
    ],

    // Formulaire de support : destinataire obligatoire, sinon le formulaire est masqué.
    'support' => [
        'to' => env('SUPPORT_TO_ADDRESS'),
        'max_per_hour' => (int) env('SUPPORT_MAX_PER_HOUR', 5),
    ],

    /*
    | Chiffres clés : AUCUN par défaut. Le bloc « Chiffres clés » n'est rendu que si au moins une entrée complète et
    | valide est fournie ici, chacune avec sa source et sa date (AAAA-MM-JJ), par exemple :
    |
    |   ['value' => '…', 'label' => '…', 'source' => 'Rapport d’activité interne', 'date' => '2026-12-31'],
    |
    | Ne publiez qu'un chiffre vérifiable, dont vous pouvez produire la preuve.
    */
    'stats' => [],

    // Fichier unique des services et de leurs statuts (voir README, « Changer le statut d'un service »).
    'services_file' => resource_path('data/services.json'),

    // Adresse canonique du site public (production).
    'site_url' => env('APP_URL'),
];
