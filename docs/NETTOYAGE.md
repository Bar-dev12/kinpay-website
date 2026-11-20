# Nettoyage du site vitrine avant mise en ligne

Branche `vitrine-propre`, tag proposé `v0.1-vitrine-propre`. Objet : rendre le site vitrine de KinPay Cash publiable sur
kinpaycash.com, sans fausse preuve ni fausse promesse.

Captures avant et après, en mobile (390 px) et en bureau (1440 px), pleine page : `docs/NETTOYAGE/avant/` et
`docs/NETTOYAGE/apres/`.

## 1. Supprimé, et pourquoi

### Chiffres et engagements sans preuve

| Élément | Où | Pourquoi |
|---|---|---|
| « 25K+ utilisateurs », « 1M+ transactions », « 99,9 % disponibilité », « 24/7 » | Accueil (bloc « Chiffres clés ») | Aucune source vérifiable. Le bloc ne s'affiche plus que si des chiffres sourcés et datés sont configurés. |
| « Disponible 24h/24 et 7j/7 », « Disponible 24h/24 », « Disponibilité permanente » | Accueil, Opérations | Engagement de service non prouvé. |
| « Transactions instantanées », « en quelques secondes », « Notifications en temps réel », « Faibles frais » | Accueil, Opérations | Promesses de rapidité et de prix invérifiables. |
| « Chiffrement avancé et sécurité renforcée », « Protection avancée », « Sécurisée. Fiable. Rapide. », « solution financière de confiance » | Bandeau de confiance, Accueil, Services | Formules creuses et invérifiables. Remplacées par des faits : code PIN, frais affichés avant validation, statut de chaque opération. |
| « Internet dans plus de 200 pays », « Couverture mondiale », « Services disponibles partout » | Services, Opérations | Couverture non prouvée. |
| « Une plateforme unique », « Une plateforme moderne » | Services | Superlatifs. |
| « Particuliers et entreprises » | Accueil | Offre professionnelle non vérifiée. |
| « tout en dollars » et tout nombre de devises | — | Remplacés par « francs congolais et dollars américains », sans nombre. |

### Marques de tiers en image et logos

Les 42 fichiers suivants ont été supprimés de `public/images/`.

**Logos de marques tierces**, interdits :

- `apple_logo.png`, `playsrorelogo.png` ;
- `services/Aliexpress.png`, `services/alibaba-logo.jpg`, `services/alibaba-logo-2.png`, `services/alibaba.svg` ;
- `services/ria-logo.png`, `services/ria-seeklogo.svg`, `services/ria.png` ;
- `services/visa.png`, `services/visa_blue.jpg`, `services/western-union.png`.

**Visuels contenant des logos tiers** (Western Union, Ria, Visa, Mastercard, PayPal, Alibaba, AliExpress, opérateurs) :

- `services/payment-category.png`, `services/services-hero2.png` ;
- `transactions/Alibaba&AliExpress.png`, `transactions/Alibaba&AliExpress2.png` ;
- `transactions/Western-Union.png`, `transactions/Western-Union2.png` ;
- `transactions/ria.png`, `transactions/ria2.png` ;
- `transactions/carte-visa-virtuelle.png` ;
- `transactions/paiement-kinpay.png`, `transactions/services-kinpay.png`, `transactions/transfert-kinpay.png` ;
- `transactions/e-sim.png`.

Ces visuels montraient aussi des personnes et d'anciennes interfaces.

**Captures d'une ancienne version de l'application** (logos tiers, soldes en GBP, nom « KinPay ») :

- `hero/phone-hero.PNG`, `hero/phone-hero-2.PNG`, `hero/phone-mockup.PNG`.

Elles sont remplacées par une illustration originale en HTML et CSS, sans image, avec la mention « Illustration,
montants fictifs ».

**Anciens logos**, au nom « L-KinPay » ou « KinPay » sans « Cash » :

- `brand/logo-lkinpay-2.png`, `brand/logo-lkinpay-blanc.png` ;
- `brand/kinpay-logo.PNG`, `brand/kinpay-logo.svg` (vide) ;
- `brand/IMG_7883.PNG`, `services/payment-kinpay.png` (doublon).

**Icônes et fonds inutiles** :

- `services/carte-de-credit.png`, `services/carte-de-credit.svg`, `services/carte-sim.png` ;
- `services/mobile-money.png`, `services/transaction.png` ;
- `services/services-hero.png` (doublon du fond) ;
- `transactions/transaction-bg.png` ;
- `hero/hero-bg-01.png`, remplacé par sa version convertie (voir § 3).

Autres retraits :

- **Icônes de marques** `react-icons` (Google Play, Apple, Facebook, Instagram, LinkedIn) : la dépendance est retirée
  de `package.json` et du `package-lock.json`. Les liens de boutiques sont désormais en texte.
- **Noms d'opérateurs** (M-Pesa, Orange Money, Airtel Money, Afri Money), **Netflix et ChatGPT** cités sur les pages
  Services et Opérations, et la catégorie FAQ « Carte Visa » : marques citées hors de la liste des services, ou service
  annoncé comme existant alors qu'il ne l'est pas.

### Valeurs provisoires et données personnelles

| Élément | Pourquoi |
|---|---|
| WhatsApp `243XXXXXXXXX` | Valeur provisoire. |
| Identifiant App Store `id000000000` et lien Google Play `com.kinpay.app` | Valeurs provisoires ou non confirmées. |
| Liens `#` (Facebook, Instagram, LinkedIn, X ; boutons du menu et de la page Opérations) | Liens vides. |
| `support@kinpay.cd`, `contact@kinpay.com`, `https://kinpay.com` | Anciens domaines. |
| Nom « L-KinPay », logo « L-KinPay » | Ancien nom : la marque est « KinPay Cash ». |
| « Immeuble KinPay, Limete, Kinshasa, RDC » et son lien Google Maps | Adresse non confirmée, et lien vers un service tiers. |
| Adresse électronique personnelle écrite en dur comme destinataire du support (`SupportController`) | Donnée personnelle dans le code. Le destinataire vient maintenant de `SUPPORT_TO_ADDRESS`. |
| Liens « À propos » et « Contact » (`/a-propos`, `/about`, `/contact`) | Pages inexistantes (erreur 404). |
| Sélecteur de langue (Français, « EnglishF », Lingala) et menu « Compte » sans action | Fonctions inexistantes. |

### Fichiers de code inutilisés ou remplacés

- `resources/views/welcome.blade.php` (page Laravel par défaut, non routée) ;
- `public/robots.txt` (fixe), remplacé par une route qui dépend de l'environnement ;
- `resources/js/config/company.ts` et `app-links.ts` (valeurs écrites en dur) ;
- `resources/js/data/services.json` et `help.json`, remplacés par `resources/data/services.json` et `lang/fr/aide.php` ;
- `resources/js/types/*`, `paths.d.ts` ;
- les anciens composants `Navbar`, `TrustBar`, `ServicesSection`, `WhyChooseSection`, `ServiceCard`, `ServiceCategory`,
  `BackToTopButton` et l'ancien `SupportContact`.

## 2. Modifié

| Fichier | Changement |
|---|---|
| Toutes les pages (`resources/js/Pages/*.tsx`) | Réécrites. Aucun texte éditorial ni aucune adresse dans le code : tout vient du serveur par Inertia. |
| `lang/fr/vitrine.php`, `lang/fr/aide.php` | Nouveaux. Tous les textes en français (vouvoiement, typographie française), sans superlatif ni promesse invérifiable. Déroulés d'opérations repris des parcours réels de l'application. |
| `resources/data/services.json` | Liste officielle des services, statuts par défaut (§ 4). |
| `config/vitrine.php`, `app/Support/Vitrine.php` | Liens, contacts, réseaux et chiffres lus dans les variables d'environnement. Les valeurs vides, provisoires, d'anciens domaines ou non `https` sont masquées. |
| `app/Http/Controllers/SupportController.php`, `app/Mail/SupportMessageMail.php`, `app/Support/SupportDesk.php` | Formulaire de support corrigé (§ 5). |
| `routes/console.php` | Commandes `support:tickets` et `support:ticket`. |
| `app/Http/Middleware/SecurityHeaders.php`, `bootstrap/app.php` | En-têtes de sécurité (§ 6). |
| `config/session.php` | Cookie de session `Secure` par défaut en production ; `HttpOnly` imposé. |
| `config/app.php` | Nom par défaut « KinPay Cash ». Langue fixée à `fr`, indépendamment d'un `APP_LOCALE=en` hérité. |
| `resources/views/app.blade.php` | `lang="fr"`, title, description, robots, URL canonique et Open Graph rendus par le serveur ; préchargement de la police. |
| `resources/views/errors/*` | Pages d'erreur en français, compatibles avec la CSP. |
| `public/.htaccess` | Compression (`mod_deflate`), cache long des fichiers versionnés, types AVIF, WebP et WOFF2. |
| `vite.config.js`, `resources/css/app.css` | Retrait du téléchargement de polices au build (Bunny Fonts). Police auto-hébergée, jetons de couleur contrastés, focus visible, mouvement réduit. |
| `resources/js/app.tsx` | Pages regroupées dans un seul fichier (un aller-retour réseau de moins). Barre de progression retirée : elle injectait une balise `<style>` refusée par la CSP. |
| `composer.json`, `composer.lock` | `"php": "^8.4"`. Seule l'empreinte du lock change ; aucune version de paquet n'est modifiée. |
| `.env.example`, `README.md` | Réécrits, sans aucune valeur secrète. |
| `public/favicon.ico` (vide auparavant), `public/favicon.svg` | Icône originale (lettre K), sans logo existant. |

## 3. Ajouté

- **Illustration du téléphone** (`resources/js/Components/PhoneIllustration.tsx`) : HTML et CSS seulement, aucune
  capture, montants fictifs signalés.
- **Fond décoratif** (vague abstraite, seule image conservée) en AVIF, WebP et JPEG de repli, en 640, 1024 et
  1600 px, avec `srcset`, `width` et `height` explicites. Il pèse 2 à 5 Ko selon la largeur, contre 1,1 Mo en PNG.
  Il est le seul visuel raster et il est au-dessus de la ligne de flottaison ; aucune image ne se trouve en dessous,
  le chargement différé n'a donc rien à différer.
- **Police** Instrument Sans 600, réduite aux caractères du français (14,8 Ko en WOFF2), auto-hébergée dans
  `public/fonts`, avec sa licence OFL. Elle sert aux titres. Le texte courant utilise la police du système.
- **Logo texte « KinPay Cash »**. Le dossier `assets-marque` n'existe pas : aucun logo officiel n'a été fourni.
- **Tests** : `NoFakeProofTest`, `SupportFormTest`, `SiteConfigTest` (§ 8).

## 4. Services et statuts par défaut

Fichier unique : `resources/data/services.json`. La procédure de changement de statut est dans le README.

| Service | Statut |
|---|---|
| Paiement, Transférer, E-SIM, Mobile Money | Disponible |
| Carte Visa virtuelle, Paiement Alibaba et AliExpress, Western Union, Ria, Paiement NFC par bague, Boutique en ligne, Paiement Netflix, Réabonnement TV, PayPal, Intégration pour les écoles, Et bien plus encore | Bientôt disponible |

Les noms de marques n'apparaissent qu'en texte, dans la section des services, avec la mention : « Les marques citées
appartiennent à leurs propriétaires. Leur mention ne signifie pas un partenariat avant que le service soit indiqué
comme disponible. »

## 5. Formulaire de support

| Avant | Après |
|---|---|
| Succès affiché même avec `MAIL_MAILER=log`, où personne n'est prévenu | Succès affiché **seulement** si le transport accepte le courriel. Le ticket et l'envoi sont dans une même transaction : en cas d'échec, rien n'est conservé, message d'erreur et invitation à réessayer. |
| Destinataire personnel écrit en dur | `SUPPORT_TO_ADDRESS`. Sans destinataire, le formulaire est masqué. En production, il est aussi masqué si le transport est `log` ou `array`, ou si l'adresse d'expédition manque. |
| Aucune limite | 5 envois par heure et par adresse IP, clé hachée. Champ piège. Validation stricte avec longueurs maximales (nom 100, adresse 190, sujet 150, message 10 à 3 000 caractères). Refus des caractères de contrôle dans le nom et le sujet. Messages d'erreur en français. |
| Rien dans le journal | Journal limité à la référence du ticket : ni corps du message, ni adresse du visiteur. |
| — | Le courriel au support est en texte brut ; « Répondre » écrit au visiteur. Référence `KPC-000123` communiquée au visiteur. |
| — | Consultation des tickets par `php artisan support:tickets` et `support:ticket`. |

## 6. Sécurité et référencement

- **CSP** :
  `default-src 'none'; script-src 'self' 'nonce-…'; style-src 'self' 'nonce-…'; img-src 'self' data:; font-src 'self';
  connect-src 'self'; form-action 'self'; frame-ancestors 'none'; base-uri 'none'; object-src 'none'`.
  Ni `unsafe-inline` ni `unsafe-eval`. Les données de page d'Inertia sont un bloc JSON jamais exécuté.
- **Autres en-têtes** : `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`,
  `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` restrictive,
  `Cross-Origin-Opener-Policy`, et HSTS en production HTTPS.
- **Ressources** : aucune ressource externe ni aucun traceur, vérifié dans le navigateur (aucune requête hors du site).
- **Hors production** : balise `robots noindex, nofollow`, en-tête `X-Robots-Tag`, `robots.txt` en `Disallow: /`, pas
  de `sitemap.xml`.
- **En production** : title et description par page, URL canonique, Open Graph, `sitemap.xml`, `lang="fr"`. Aucun
  JSON-LD.

## 7. Mesures

Banc de mesure : Playwright et Chromium, réseau « 3G rapide » de Lighthouse (150 ms de latence, 1,6 Mb/s), processeur
ralenti ×4 en mobile, compression gzip comme Apache avec `mod_deflate`. Lighthouse n'est pas installable sur ce poste.

| Mesure | Avant | Après | Objectif |
|---|---|---|---|
| Poids de l'accueil (transféré) | 5,7 Mo | 132 Ko (mobile), 135 Ko (bureau) | ≤ 500 Ko |
| Au-dessus de la ligne de flottaison | 5,7 Mo | 132 à 135 Ko compressés | ≤ 150 Ko |
| Page Opérations | 17,4 Mo | 130 Ko | ≤ 500 Ko |
| LCP mobile, 3G rapide | 24,7 s (accueil), 75 s (Opérations) | 1,13 à 1,38 s | < 2,5 s |
| LCP bureau | 24,3 s (accueil) | 1,05 à 1,08 s | < 2,5 s |
| CLS | 0 à 0,004 | 0 | < 0,1 |
| Violations axe-core (WCAG 2.2 AA) | 12 à 15 par page (contrastes, libellés) | 0 sur les 4 pages, en mobile et en bureau | 0 |
| Fichiers suivis par Git | 35,3 Mo | 3,1 Mo, dont 2,1 Mo de captures de documentation | — |

Le poids « avant » était mesuré sans compression : le serveur de développement ne compresse pas. Les PNG, qui en
faisaient l'essentiel, ne se compressent de toute façon pas.

Vérifié aussi :

- aucun débordement horizontal à 320 px ni à un zoom de 200 % ;
- cibles d'au moins 44 px sur les 4 pages ;
- lien d'évitement en premier arrêt de tabulation ;
- focus visible (3 px) ;
- menu mobile au clavier, fermé par Échap ;
- mouvement réduit respecté.

L'historique Git conserve les anciennes images (environ 33 Mo dans `.git`). Les retirer imposerait de réécrire
l'historique et de forcer le push : ce n'est pas fait, et c'est à décider.

## 8. Tests

Trois nouveaux fichiers, plus les deux exemples d'origine :

- **`NoFakeProofTest`** :
  - aucun texte interdit dans les fichiers de langue, les données, les vues et les pages ;
  - « KinPay Cash » partout ;
  - aucune image de marque, et liste blanche des images ;
  - ni `react-icons` ni adresse en dur dans le front ;
  - noms de marques seulement dans la liste des services ;
  - mention sur les marques affichée ;
  - chiffres absents sans configuration, et exigeant source et date ;
  - aucun JSON-LD.
- **`SupportFormTest`** :
  - succès seulement après envoi accepté ;
  - échec du transport : ni succès, ni ticket ;
  - validation et longueurs ;
  - messages en français ;
  - champ piège ;
  - limite de 5 envois par heure ;
  - formulaire masqué sans destinataire, en production avec `log`, ou sans expéditeur ;
  - CSRF ;
  - journal sans corps de message ;
  - commandes artisan.
- **`SiteConfigTest`** :
  - liste officielle et statuts par défaut ;
  - écoles sans performance ;
  - statuts affichés conformes au fichier ;
  - statut inconnu masqué ;
  - liens de connexion lus dans les variables d'environnement, et valeurs par défaut en production ;
  - contacts et valeurs provisoires masqués ;
  - `noindex` hors production ; indexation, URL canonique et sitemap en production ;
  - CSP et en-têtes ;
  - aucune ressource externe ;
  - cookie de session ;
  - PHP 8.4 ;
  - routes existantes.

Vérification par mutation : réintroduire « 24h/24 », « partenaire Western Union » ou un fichier `ria-logo.png` fait
échouer les tests.

## 9. Décisions prises en l'absence de consigne (option la plus sûre)

1. **Configuration lue par le serveur, pas par Vite.** Les liens, contacts et textes sont transmis par Inertia et non
   par des variables `VITE_*`, qui seraient figées au build alors que le serveur n'a pas Node. Changer une valeur ne
   demande donc qu'un `.env` et un `php artisan optimize`.
2. **Statut inconnu dans `services.json` traité comme « masqué ».** Une faute de frappe ne peut jamais afficher
   « Disponible ».
3. **« Et bien plus encore » placé en fin de liste**, après l'intégration pour les écoles, et formulé sans promesse :
   « D'autres services s'ajouteront à cette liste quand ils seront prêts ».
4. **Liens des boutiques** : textes « Télécharger sur Google Play » et « Télécharger dans l'App Store », sans logo,
   affichés seulement si l'adresse est configurée. Ce sont les seuls noms de tiers hors de la liste des services : ils
   désignent la destination du lien.
5. **Page « Transactions » renommée « Opérations » dans le menu**, adresse `/transactions` inchangée. Elle ne décrit plus
   que les opérations disponibles, d'après les parcours réels de l'application : envoyer, recharger par Mobile Money,
   acheter une eSIM, suivre ses opérations. Le paiement n'a pas de déroulé détaillé, faute de parcours vérifié.
6. **Échec d'envoi du courriel** : le ticket n'est pas conservé (transaction annulée), pour qu'aucun ticket n'existe sans
   que le support ait été prévenu. Le visiteur est invité à réessayer.
7. **Formulaire masqué en production** si le transport est `log` ou `array`, ou si l'adresse d'expédition manque ou
   est une valeur d'exemple.
8. **Langue fixée à `fr`** dans `config/app.php` : un `APP_LOCALE=en` hérité de l'ancien `.env.example` aurait affiché
   les clés de traduction au lieu des textes.
9. **Police** : un seul fichier (titres, Instrument Sans 600, sous-ensemble du français). Texte courant en police
   système, pour tenir le budget de 150 Ko au-dessus de la ligne de flottaison.
10. **Mises à jour de sécurité des dépendances non appliquées** dans cette branche, pour ne pas mélanger deux
    changements. `composer audit` signale des avis sur `laravel/framework` (dont un critique sur le TokenGuard, que la
    vitrine n'utilise pas) et `league/commonmark`. `npm audit` en signale sur des outils de build (`vite`,
    `shell-quote`, `source-map-js`), qui ne sont pas livrés au navigateur. Les commandes sont dans le rapport.
11. **Historique Git non réécrit** (voir § 7).
