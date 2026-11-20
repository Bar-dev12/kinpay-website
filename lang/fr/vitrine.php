<?php

/*
| Textes du site vitrine KinPay Cash (vouvoiement, sans chiffre ni engagement invérifiable).
| Les adresses, contacts et liens ne sont JAMAIS écrits ici : ils viennent de config/vitrine.php (variables d'environnement).
| Les services et leurs statuts sont dans resources/data/services.json ; la foire aux questions dans lang/fr/aide.php.
*/

return [

    'slogan' => 'Votre argent vous accompagne partout.',

    'status' => [
        'disponible' => 'Disponible',
        'bientot' => 'Bientôt disponible',
        'masque' => 'Masqué',
    ],

    'legal' => [
        'conditions' => 'Conditions d’utilisation',
        'confidentialite' => 'Politique de confidentialité',
        'mentions' => 'Mentions légales',
    ],

    'social' => [
        'facebook' => 'Facebook',
        'instagram' => 'Instagram',
        'linkedin' => 'LinkedIn',
        'x' => 'X',
        'tiktok' => 'TikTok',
    ],

    // Textes communs à toutes les pages (en-tête, pied de page, boutons).
    'common' => [
        'skip' => 'Aller au contenu',
        'home_suffix' => ', accueil',
        'nav_label' => 'Navigation principale',
        'nav' => [
            ['label' => 'Accueil', 'href' => '/'],
            ['label' => 'Services', 'href' => '/services'],
            ['label' => 'Opérations', 'href' => '/transactions'],
            ['label' => 'Aide', 'href' => '/help'],
        ],
        'menu_open' => 'Ouvrir le menu',
        'menu_close' => 'Fermer le menu',
        'login' => 'Se connecter',
        'register' => 'Créer un compte',
        'new_tab' => '(ouvre un nouvel onglet)',
        'google_play' => 'Télécharger sur Google Play',
        'app_store' => 'Télécharger dans l’App Store',
        'stores_title' => 'Application mobile',
        'footer_about' => 'KinPay Cash : payer, envoyer de l’argent, recharger par Mobile Money et acheter une eSIM, en francs congolais et en dollars américains.',
        'footer_pages' => 'Pages',
        'footer_account' => 'Votre compte',
        'footer_legal' => 'Informations légales',
        'footer_contact' => 'Contact',
        'footer_social' => 'Réseaux sociaux',
        'provisional' => 'provisoire',
        'provisional_note' => 'Ces pages sont provisoires et peuvent évoluer.',
        'rights' => 'Tous droits réservés.',
        'back_to_top' => 'Revenir en haut de la page',
        'status_available' => 'Disponible',
        'status_soon' => 'Bientôt disponible',
        'brands_notice' => 'Les marques citées appartiennent à leurs propriétaires. Leur mention ne signifie pas un partenariat avant que le service soit indiqué comme disponible.',
        'stats_title' => 'Chiffres clés',
        'stats_source' => 'Source : :source, au :date.',
        'contact_email' => 'Courriel',
        'contact_phone' => 'Téléphone',
        'contact_whatsapp' => 'WhatsApp',
        'contact_whatsapp_action' => 'Écrire sur WhatsApp',
        'contact_address' => 'Adresse',
    ],

    'home' => [
        'title' => 'Payer, envoyer, recharger, en CDF et en USD',
        'description' => 'KinPay Cash : payer, envoyer de l’argent, recharger votre solde par Mobile Money et acheter une eSIM, en francs congolais et en dollars américains.',
        'hero' => [
            'kicker' => 'KinPay Cash',
            'lead' => 'Payez, envoyez de l’argent, rechargez votre solde par Mobile Money et achetez une eSIM, en francs congolais et en dollars américains.',
            'cta_services' => 'Voir les services',
            'figure_label' => 'Illustration d’un téléphone affichant un solde KinPay Cash en francs congolais et en dollars américains.',
            'caption' => 'Illustration, montants fictifs.',
            'screen' => [
                'balance' => 'Solde',
                'cdf_amount' => '125 000,00',
                'usd_amount' => '48,50',
                'actions' => ['Recharger', 'Envoyer', 'Payer', 'eSIM'],
                'last' => 'Dernière opération',
                'last_label' => 'Envoi',
                'last_status' => 'Réussie',
            ],
        ],
        'services' => [
            'title' => 'Ce que vous pouvez faire',
            'lead' => 'Un service n’est indiqué « Disponible » que lorsqu’il fonctionne dans l’application.',
            'available' => 'Disponible aujourd’hui',
            'soon' => 'Bientôt disponible',
            'more' => 'Voir le détail des services',
        ],
        'currencies' => [
            'title' => 'En francs congolais et en dollars américains',
            'text' => 'Vous disposez d’un solde en francs congolais (CDF) et d’un solde en dollars américains (USD), affichés côte à côte.',
        ],
        'steps' => [
            'title' => 'Pour commencer',
            'items' => [
                ['title' => 'Créez votre compte', 'text' => 'L’inscription se fait en ligne, sur l’application KinPay Cash.'],
                ['title' => 'Rechargez votre solde', 'text' => 'Depuis votre compte Mobile Money : validez la demande sur votre téléphone, le solde est crédité une fois le paiement confirmé par l’opérateur.'],
                ['title' => 'Utilisez vos services', 'text' => 'Payez, envoyez de l’argent ou achetez une eSIM. Chaque opération est confirmée par votre code PIN.'],
            ],
        ],
        'control' => [
            'title' => 'Vos opérations restent sous votre contrôle',
            'items' => [
                ['icon' => 'lock', 'title' => 'Votre code PIN', 'text' => 'Aucune opération ne part sans votre code PIN.'],
                ['icon' => 'receipt', 'title' => 'Les frais avant de valider', 'text' => 'Le récapitulatif montre les frais et le total débité avant toute validation.'],
                ['icon' => 'list', 'title' => 'Un statut pour chaque opération', 'text' => 'Dans l’historique, chaque opération affiche son statut, de la demande à la confirmation.'],
            ],
            'advice' => 'Ne communiquez jamais votre code PIN ni votre mot de passe, même à une personne qui dit travailler pour KinPay Cash.',
        ],
        'cta' => [
            'title' => 'Créez votre compte KinPay Cash',
            'text' => 'L’inscription se fait en ligne.',
        ],
    ],

    'services' => [
        'title' => 'Services',
        'description' => 'Les services KinPay Cash disponibles aujourd’hui et ceux en préparation.',
        'heading' => 'Les services KinPay Cash',
        'lead' => 'Chaque service affiche son état : « Disponible » s’il fonctionne aujourd’hui dans l’application, « Bientôt disponible » s’il est en préparation.',
        'available' => 'Disponible aujourd’hui',
        'soon' => 'En préparation',
        'soon_lead' => 'Aucune date n’est annoncée. Un service passe à « Disponible » sur ce site lorsqu’il fonctionne dans l’application.',
        'cta' => 'Voir comment se déroulent les opérations',
    ],

    'transactions' => [
        'title' => 'Opérations',
        'description' => 'Comment se déroulent l’envoi d’argent, la recharge par Mobile Money, l’achat d’une eSIM et le suivi de vos opérations dans KinPay Cash.',
        'heading' => 'Vos opérations, étape par étape',
        'lead' => 'Le déroulé des opérations disponibles aujourd’hui dans l’application.',
        'nav_label' => 'Aller à une opération',
        'step' => 'Étape :n',
        'items' => [
            ['id' => 'envoyer', 'icon' => 'send', 'title' => 'Envoyer de l’argent', 'steps' => [
                ['title' => 'Le bénéficiaire', 'text' => 'Choisissez un bénéficiaire enregistré ou saisissez un numéro Mobile Money : l’opérateur est reconnu.'],
                ['title' => 'Le montant et les frais', 'text' => 'Le récapitulatif montre les frais et le total débité avant toute validation.'],
                ['title' => 'Votre code PIN', 'text' => 'Rien ne part sans votre code PIN.'],
                ['title' => 'Le suivi', 'text' => 'L’envoi passe à « Réussie » quand l’opérateur confirme. S’il refuse, le montant débité vous est rendu.'],
            ]],
            ['id' => 'recharger', 'icon' => 'phone', 'title' => 'Recharger par Mobile Money', 'steps' => [
                ['title' => 'Le montant', 'text' => 'Choisissez le solde à créditer (CDF ou USD), puis le montant.'],
                ['title' => 'Votre compte Mobile Money', 'text' => 'Choisissez votre opérateur et votre numéro.'],
                ['title' => 'Votre code PIN', 'text' => 'Relisez le récapitulatif, puis confirmez avec votre code PIN.'],
                ['title' => 'La validation', 'text' => 'Validez la demande sur votre téléphone. Le solde est crédité une fois le paiement confirmé par l’opérateur.'],
            ]],
            ['id' => 'esim', 'icon' => 'smartphone', 'title' => 'Acheter une eSIM', 'steps' => [
                ['title' => 'La destination', 'text' => 'Choisissez un continent, puis un pays.'],
                ['title' => 'Le forfait', 'text' => 'Comparez les forfaits : volume de données, durée et prix.'],
                ['title' => 'Votre code PIN', 'text' => 'Payez depuis votre solde, avec votre code PIN.'],
                ['title' => 'L’installation', 'text' => 'Scannez le QR code d’installation dans les réglages de votre téléphone.'],
            ]],
            ['id' => 'historique', 'icon' => 'list', 'title' => 'Suivre vos opérations', 'steps' => [
                ['title' => 'L’historique', 'text' => 'Chaque ligne montre le montant, le sens de l’opération et son statut.'],
                ['title' => 'Rechercher et filtrer', 'text' => 'Par référence, bénéficiaire, devise ou période.'],
                ['title' => 'Le détail', 'text' => 'Chaque opération montre ses étapes, de la demande à la confirmation.'],
                ['title' => 'Exporter', 'text' => 'Votre relevé en Excel ou en PDF.'],
            ]],
        ],
        'statuses' => [
            'title' => 'Les statuts que vous verrez',
            'items' => [
                ['label' => 'En attente', 'text' => 'La demande est enregistrée.'],
                ['label' => 'En cours de confirmation', 'text' => 'L’opération attend la confirmation de l’opérateur.'],
                ['label' => 'Réussie', 'text' => 'L’opérateur a confirmé l’opération.'],
            ],
        ],
        'other' => 'Les autres services apparaîtront ici lorsqu’ils fonctionneront dans l’application.',
    ],

    'help' => [
        'title' => 'Aide',
        'description' => 'Réponses aux questions fréquentes sur KinPay Cash et contact du support.',
        'heading' => 'Comment pouvons‑nous vous aider ?',
        'lead' => 'Les réponses aux questions les plus fréquentes sur votre compte et vos opérations.',
        'search_label' => 'Rechercher dans l’aide',
        'search_placeholder' => 'Par exemple : recharger, eSIM, code PIN',
        'results_none' => 'Aucune réponse ne correspond à « :q ».',
        'results_one' => '1 réponse pour « :q ».',
        'results_many' => ':count réponses pour « :q ».',
        'no_result_hint' => 'Essayez un autre mot ou parcourez les thèmes ci-dessous.',
        'categories_title' => 'Thèmes',
        'faq_title' => 'Questions fréquentes',
    ],

    'support' => [
        'title' => 'Contacter le support',
        'lead' => 'Pour une question sur une opération, indiquez sa référence. N’indiquez jamais votre code PIN, votre mot de passe ni un code reçu par SMS.',
        'contacts_title' => 'Nos coordonnées',
        'no_contact' => 'Les coordonnées du support ne sont pas encore publiées sur ce site.',
        'form_title' => 'Écrire au support',
        'name' => 'Votre nom',
        'email' => 'Votre adresse électronique',
        'email_hint' => 'La réponse sera envoyée à cette adresse.',
        'subject' => 'Sujet',
        'message' => 'Votre message',
        'message_hint' => 'Entre 10 et 3 000 caractères.',
        'trap' => 'Laissez ce champ vide',
        'required' => 'obligatoire',
        'privacy' => 'Votre nom, votre adresse électronique et votre message sont conservés pour traiter votre demande, rien d’autre.',
        'submit' => 'Envoyer le message',
        'sending' => 'Envoi en cours…',
        'success_title' => 'Message envoyé',
        'success' => 'Votre demande a été transmise au support sous la référence :ref. La réponse sera envoyée à l’adresse indiquée.',
        'again' => 'Écrire un autre message',
        'error_title' => 'Message non envoyé',
        'failed' => 'Votre message n’a pas pu être transmis au support. Réessayez dans quelques minutes.',
        'throttled' => 'Trop de messages envoyés depuis votre connexion. Réessayez dans :minutes min.',
        'rejected' => 'Votre message n’a pas pu être envoyé. Vérifiez le formulaire et réessayez.',
        'mail_subject' => '[KinPay Cash – Support] :ref : :subject',
        'mail_title' => 'Nouvelle demande de support',
    ],

    'seo' => [
        'site_name' => 'KinPay Cash',
        'default_description' => 'KinPay Cash : payer, envoyer de l’argent, recharger par Mobile Money et acheter une eSIM, en francs congolais et en dollars américains.',
        'not_found' => 'Page introuvable',
    ],
];
