# KinPay Website

Présentation technique d’un site vitrine fintech construit avec Laravel, React et Inertia.js. Ce dépôt contient la façade publique de la plateforme KinPay, avec des pages de marketing, des services de paiement et de transfert, ainsi qu’un module de support utilisateur.

## Vue d’ensemble

Le projet met en place une interface publique orientée conversion et acquisition client, avec :

- landing page marketing pour l’application KinPay ;
- sections de services financiers et digitaux ;
- pages institutionnelles pour les transactions et les services ;
- centre d’aide avec recherche et FAQ ;
- formulaire de contact support backend avec persistance et envoi de mail.

## Stack technique

- PHP 8.3
- Laravel 13
- Inertia.js
- React 19
- TypeScript
- Vite
- Tailwind CSS
- SQLite en environnement local

## Architecture

```bash
.
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   ├── Middleware/
│   │   └── Requests/
│   ├── Mail/
│   ├── Models/
│   └── Providers/
├── bootstrap/
├── config/
├── database/
│   ├── factories/
│   ├── migrations/
│   └── seeders/
├── public/
│   └── build/
├── resources/
│   ├── css/
│   ├── js/
│   │   ├── Components/
│   │   ├── Pages/
│   │   ├── config/
│   │   ├── data/
│   │   ├── types/
│   │   └── utils/
│   └── views/
├── routes/
│   └── web.php
├── storage/
├── tests/
├── .env.example
├── artisan
├── composer.json
├── package.json
├── phpunit.xml
├── tsconfig.json
├── vite.config.js
├── README.md
└── .gitignore
```

## Comportement applicatif

### Pages publiques

Routes définies dans `routes/web.php` :

- `/` → page d’accueil
- `/transactions` → vue Transactions
- `/services` → vue Services
- `/help` → centre d’aide / FAQ

### Support client

Le formulaire de contact est traité par `App\Http\Controllers\SupportController`.

Flux :

1. validation des données POST ;
2. création d’un ticket dans `support_tickets` ;
3. envoi d’un email via `SupportMessageMail` ;
4. redirection avec message de succès via `back()->with(...)`.

Le modèle associé est `App\Models\SupportTicket` avec les champs :

- `name`
- `email`
- `subject`
- `message`
- `status`

## Prérequis

- PHP `^8.3`
- Composer
- Node.js `^18`
- npm

## Installation

### 1) Cloner le dépôt

```bash
git clone <url-du-repo>
cd kinpay-website
```

### 2) Installer les dépendances PHP

```bash
composer install
```

### 3) Configurer l’environnement

```bash
cp .env.example .env
php artisan key:generate
```

### 4) Installer les dépendances frontend

```bash
npm install
```

### 5) Exécuter les migrations

```bash
php artisan migrate
```

## Démarrage du projet

### Mode développement

```bash
composer run dev
```

Cette commande lance les services de développement associés au projet (Laravel + Vite + outils de supervision).

### Build de production

```bash
npm run build
php artisan serve
```

## Variables d’environnement

Le fichier `.env.example` est préconfiguré pour un setup local minimal :

```bash
APP_NAME=Laravel
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost

DB_CONNECTION=sqlite

MAIL_MAILER=log
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"
```

Pour un environnement réel, il faudra configurer proprement :

- la base de données ;
- le mailer SMTP/SES/SendGrid ;
- l’URL publique du site ;
- les variables applicatives KinPay si besoin.

## Tests

```bash
php artisan test
```

## Points techniques importants

- Le projet utilise `Inertia` pour rendre les vues React sans API séparée.
- Les composants front sont organisés sous `resources/js/Components` et `resources/js/Pages`.
- Le site est construit comme un front-office / landing page plutôt qu’une application bancaire complète.
- La gestion du support est volontairement simple et centrée sur un workflow mail + stockage DB.

