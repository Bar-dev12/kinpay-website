# KinPay Cash — site vitrine

Site public de KinPay Cash (kinpaycash.com) : pages Accueil, Services, Opérations et Aide, avec un formulaire de support.
L'application elle-même (connexion, tableau de bord, administration) est un **autre projet**, servi sur
`https://cps.kinpaycash.com` : ce site n'y renvoie que par des liens.

Construit avec Laravel 13, Inertia 3, React 19, TypeScript, Tailwind CSS 4 et Vite 8.

Le détail du nettoyage avant mise en ligne (éléments supprimés, modifiés, ajoutés, et pourquoi) est dans
[docs/NETTOYAGE.md](docs/NETTOYAGE.md).

## Règle d'or

Aucune fausse preuve, aucune fausse promesse :

- aucun chiffre sans source ni date ;
- aucun logo de marque tierce ;
- aucun contact provisoire ;
- un service n'est indiqué « Disponible » que s'il fonctionne dans l'application.

Les tests `tests/Feature/NoFakeProofTest.php` échouent si l'un de ces éléments revient.

## Prérequis

- **PHP 8.4 ou plus**, imposé dans `composer.json` (`"php": "^8.4"`). Le `composer.lock` installe Symfony 8.1, qui exige
  PHP 8.4.1 ; avec PHP 8.3, `composer install` échoue.
- Extensions PHP : `pdo_sqlite` (ou `pdo_mysql`), `mbstring`, `openssl`, `tokenizer`, `xml`, `ctype`, `fileinfo`.
- Composer 2.
- Node.js **22.12 ou plus** (ou 20.19 ou plus), sur le poste de développement seulement, pour régénérer le build.
  **Le serveur n'a pas besoin de Node** : `public/build` est committé.

## Installation locale

```bash
composer install
cp .env.example .env
php artisan key:generate
touch database/database.sqlite
php artisan migrate
npm ci
npm run build        # ou « npm run dev » pendant le développement
php artisan serve
```

## Où sont les contenus

| Contenu | Fichier |
|---|---|
| Tous les textes des pages | `lang/fr/vitrine.php` |
| Foire aux questions (page Aide) | `lang/fr/aide.php` |
| Messages d'erreur du formulaire | `lang/fr/vitrine_validation.php` |
| Services et statuts | `resources/data/services.json` |
| Liens, contacts, réseaux, chiffres clés | `config/vitrine.php`, à partir des variables d'environnement |

Ces fichiers sont lus par le serveur à chaque requête et transmis aux pages par Inertia. Les modifier ne demande donc
**aucun nouveau build front** : déployez le fichier, puis lancez `php artisan optimize:clear && php artisan optimize`.

## Variables d'environnement

Toutes sont décrites dans [.env.example](.env.example). Aucune valeur secrète n'est dans le dépôt : le `.env` n'est
jamais committé.

Une valeur vide, provisoire (`XXX`, `000000000`, `#`, « à compléter »…), d'un ancien domaine (`kinpay.com`,
`kinpay.cd`) ou invalide (adresse non `https`) est ignorée. L'élément correspondant est alors **masqué**.

| Variable | Rôle | Si vide |
|---|---|---|
| `APP_ENV` | `production` sur le serveur public | hors production : `noindex` partout |
| `APP_URL` | `https://kinpaycash.com` (URL canonique, sitemap) | pas d'URL canonique ni de sitemap |
| `APP_LOGIN_URL` | bouton « Se connecter » | production : `https://cps.kinpaycash.com/login` ; sinon masqué |
| `APP_REGISTER_URL` | bouton « Créer un compte » | production : `https://cps.kinpaycash.com/inscription` ; sinon masqué |
| `LEGAL_BASE_URL` | base des pages `/conditions`, `/confidentialite` et `/mentions-legales` | production : `https://cps.kinpaycash.com` ; sinon masqué |
| `KINPAY_APP_BASE_URL` | base commune des trois valeurs ci-dessus | production : `https://cps.kinpaycash.com` |
| `LEGAL_PAGES_PROVISIONAL` | mention « (provisoire) » sur les liens légaux | `true` |
| `GOOGLE_PLAY_URL`, `APP_STORE_URL` | liens des boutiques (en texte, sans logo) | masqués |
| `CONTACT_EMAIL`, `CONTACT_PHONE`, `CONTACT_WHATSAPP`, `CONTACT_ADDRESS` | contacts publics (numéros au format international, chiffres seulement) | masqués |
| `SOCIAL_FACEBOOK_URL`, `SOCIAL_INSTAGRAM_URL`, `SOCIAL_LINKEDIN_URL`, `SOCIAL_X_URL`, `SOCIAL_TIKTOK_URL` | réseaux sociaux | masqués |
| `SUPPORT_TO_ADDRESS` | destinataire des messages du formulaire de support | **formulaire masqué** |
| `SUPPORT_MAX_PER_HOUR` | envois maximum par heure et par adresse IP | 5 |
| `MAIL_*` | envoi des courriels (voir ci-dessous) | — |

### Chiffres clés

Le bloc « Chiffres clés » n'est **pas affiché** tant que `config/vitrine.php` → `stats` est vide (c'est le cas par
défaut). Chaque entrée doit avoir une valeur, un libellé, une source et une date passée (`AAAA-MM-JJ`) ; sinon elle est
ignorée. N'y mettez qu'un chiffre dont vous pouvez produire la preuve.

## Formulaire de support et courriel

Le formulaire suit ce déroulé :

1. Il enregistre un ticket (nom, adresse électronique, sujet, message ; ni adresse IP, ni navigateur).
2. Il envoie un courriel à `SUPPORT_TO_ADDRESS`. Le bouton « Répondre » de ce courriel écrit directement au visiteur.
3. Il n'affiche « Message envoyé » **que si le serveur de courriel a accepté le message**. Sinon, le ticket n'est pas
   conservé, et le visiteur voit un message d'erreur et l'invitation à réessayer.

Le formulaire est masqué dans trois cas :

- `SUPPORT_TO_ADDRESS` est vide ;
- l'adresse d'expédition (`MAIL_FROM_ADDRESS`) est invalide ;
- en production, `MAIL_MAILER` vaut `log` ou `array`, qui n'envoient rien à personne.

Protections en place :

- jeton CSRF ;
- limite de débit par adresse IP, conservée hachée une heure ;
- champ piège pour les robots ;
- longueurs maximales (nom 100, adresse 190, sujet 150, message 3 000 caractères) ;
- journal sans corps de message ni adresse du visiteur (`support.ticket {"ticket":"KPC-000012"}`).

### SMTP, par exemple avec Resend

Dans le `.env` **du serveur uniquement** :

```dotenv
MAIL_MAILER=smtp
MAIL_SCHEME=smtps
MAIL_HOST=smtp.resend.com
MAIL_PORT=465
MAIL_USERNAME=resend
MAIL_PASSWORD=          # votre clé API Resend
MAIL_FROM_ADDRESS=      # une adresse d'un domaine vérifié chez Resend, par exemple support@kinpaycash.com
MAIL_FROM_NAME="KinPay Cash"
SUPPORT_TO_ADDRESS=     # la boîte qui reçoit les demandes
```

Le domaine d'expédition doit être vérifié chez Resend (enregistrements DNS SPF et DKIM). Avec le port 587, utilisez
`MAIL_SCHEME=smtp`, qui passe en STARTTLS.

### Consulter les tickets

Il n'y a pas d'interface d'administration. Les tickets se consultent avec ces commandes :

```bash
php artisan support:tickets                      # 20 derniers tickets
php artisan support:tickets --status=new --limit=50
php artisan support:ticket KPC-000012            # détail d'un ticket
php artisan support:ticket 12 --status=resolved  # statuts : new, in_progress, resolved, closed
```

## Changer le statut d'un service

Les services et leurs statuts sont tous dans **`resources/data/services.json`**. Valeurs possibles de `status` :

| Statut | Affichage |
|---|---|
| `disponible` | badge « Disponible » |
| `bientot` | badge « Bientôt disponible » |
| `masque` | le service n'apparaît plus |

Un statut mal écrit est traité comme `masque` : une faute de frappe ne peut jamais afficher « Disponible ».

**Condition pour passer un service à `disponible` :** le service fonctionne réellement dans l'application, en
production, pour les clients. Une démonstration ou un accord en cours de signature ne suffisent pas.

Pour un service de marque tierce (`"marque": true` : Visa, Alibaba, AliExpress, Western Union, Ria, Netflix, PayPal),
il faut en plus que l'accord avec la marque le permette. Le nom reste en texte simple, sans logo. La mention « Les
marques citées appartiennent à leurs propriétaires… » s'affiche d'office.

Pour l'intégration avec les écoles, n'ajoutez aucune performance technique (précision, vitesse) tant qu'elle n'est pas
mesurée et documentée.

Procédure :

1. Modifiez `status` dans `resources/data/services.json`.
2. Lancez `php artisan test` : le test `test_services_file_holds_the_official_list_with_default_statuses` fixe les
   statuts par défaut validés. Mettez-le à jour dans le même commit, en indiquant qui a validé l'ouverture du service.
3. Déployez. Aucun build front n'est nécessaire.

## Build front

Le serveur n'a pas Node : le build (`public/build`) est **committé**. Après toute modification de `resources/js` ou de
`resources/css`, lancez `npm ci` puis `npm run build`, et committez le dossier `public/build`.

Les polices sont auto-hébergées dans `public/fonts` : Instrument Sans 600, réduite aux caractères du français, licence
OFL. Le build ne télécharge donc rien.

## Déploiement (serveur PHP 8.4, sans Node)

```bash
git pull
composer install --no-dev --optimize-autoloader
php artisan migrate --force          # seulement si une migration a été ajoutée
php artisan optimize:clear && php artisan optimize
```

Sur le serveur Apache :

- `DocumentRoot` pointe sur `public/` ;
- `AllowOverride All` est actif (le fichier `public/.htaccess` gère la réécriture, la compression et le cache) ;
- `mod_rewrite`, `mod_headers` et `mod_deflate` sont actifs ;
- le site est servi en HTTPS.

Les en-têtes de sécurité (CSP avec nonce, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, HSTS en
production) sont posés par `app/Http/Middleware/SecurityHeaders.php`.

## Tests

```bash
php artisan test
```

Les tests couvrent :

- la règle d'or : marques en image, textes interdits, chiffres non configurés ;
- le formulaire de support : validation, limite de débit, champ piège, envoi réussi ou en échec, masquage, CSRF,
  journal ;
- les statuts des services ;
- les liens vers l'application ;
- les contacts masqués ;
- le `noindex` hors production et le référencement en production ;
- les en-têtes de sécurité ;
- la version de PHP.
