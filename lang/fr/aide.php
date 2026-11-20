<?php

/*
| Foire aux questions du site vitrine (page Aide). Réponses limitées à ce qui existe dans l'application ; aucune date,
| aucun délai, aucun chiffre. Les mots-clés servent à la recherche (minuscules, sans accents nécessaires).
*/

return [

    'categories' => [
        ['id' => 'compte', 'title' => 'Votre compte', 'description' => 'Inscription et connexion.', 'icon' => 'user'],
        ['id' => 'operations', 'title' => 'Envoyer et payer', 'description' => 'Envois, frais et devises.', 'icon' => 'send'],
        ['id' => 'mobile-money', 'title' => 'Mobile Money', 'description' => 'Recharger votre solde.', 'icon' => 'phone'],
        ['id' => 'esim', 'title' => 'eSIM', 'description' => 'Acheter et installer une eSIM.', 'icon' => 'smartphone'],
        ['id' => 'securite', 'title' => 'Sécurité', 'description' => 'Protéger votre compte.', 'icon' => 'lock'],
        ['id' => 'probleme', 'title' => 'Un problème ?', 'description' => 'Opération en cours, services à venir.', 'icon' => 'help'],
    ],

    'articles' => [
        [
            'id' => 'creer-compte',
            'category' => 'compte',
            'title' => 'Comment créer un compte ?',
            'keywords' => ['compte', 'creer', 'inscription', 'inscrire', 'nouveau'],
            'content' => 'L’inscription se fait en ligne, sur l’application KinPay Cash : utilisez le bouton « Créer un compte » de ce site, puis suivez les étapes affichées.',
        ],
        [
            'id' => 'se-connecter',
            'category' => 'compte',
            'title' => 'Comment me connecter ?',
            'keywords' => ['connexion', 'connecter', 'identifiant', 'acceder'],
            'content' => 'Le bouton « Se connecter » ouvre la page de connexion de l’application KinPay Cash. Ce site vitrine ne vous demande jamais vos identifiants.',
        ],
        [
            'id' => 'envoyer',
            'category' => 'operations',
            'title' => 'Comment envoyer de l’argent ?',
            'keywords' => ['envoyer', 'envoi', 'transfert', 'transferer', 'beneficiaire'],
            'content' => 'Choisissez un bénéficiaire enregistré ou saisissez un numéro Mobile Money, indiquez le montant, relisez le récapitulatif puis confirmez avec votre code PIN. L’envoi passe à « Réussie » quand l’opérateur confirme ; s’il refuse, le montant débité vous est rendu.',
        ],
        [
            'id' => 'frais',
            'category' => 'operations',
            'title' => 'Quels frais vais-je payer ?',
            'keywords' => ['frais', 'cout', 'tarif', 'prix', 'commission'],
            'content' => 'Les frais sont affichés dans le récapitulatif, avec le total débité, avant que vous validiez l’opération avec votre code PIN.',
        ],
        [
            'id' => 'devises',
            'category' => 'operations',
            'title' => 'Dans quelles monnaies puis-je payer ?',
            'keywords' => ['devise', 'monnaie', 'franc', 'dollar', 'cdf', 'usd'],
            'content' => 'Vous disposez d’un solde en francs congolais (CDF) et d’un solde en dollars américains (USD). Au moment d’une opération, vous choisissez le solde utilisé.',
        ],
        [
            'id' => 'recharger',
            'category' => 'mobile-money',
            'title' => 'Comment recharger mon solde par Mobile Money ?',
            'keywords' => ['recharger', 'recharge', 'depot', 'deposer', 'mobile money', 'alimenter'],
            'content' => 'Choisissez le solde à créditer et le montant, puis votre opérateur et votre numéro. Confirmez avec votre code PIN, puis validez la demande sur votre téléphone. Le solde est crédité une fois le paiement confirmé par l’opérateur.',
        ],
        [
            'id' => 'esim',
            'category' => 'esim',
            'title' => 'Comment acheter et installer une eSIM ?',
            'keywords' => ['esim', 'e-sim', 'forfait', 'internet', 'voyage', 'qr'],
            'content' => 'Choisissez un continent, puis un pays, puis un forfait (volume de données, durée et prix). Payez depuis votre solde avec votre code PIN, puis scannez le QR code d’installation dans les réglages de votre téléphone. Vérifiez d’abord que votre téléphone accepte les eSIM.',
        ],
        [
            'id' => 'proteger',
            'category' => 'securite',
            'title' => 'Comment protéger mon compte ?',
            'keywords' => ['securite', 'pin', 'mot de passe', 'arnaque', 'fraude', 'proteger'],
            'content' => 'Ne communiquez jamais votre code PIN, votre mot de passe ni un code reçu par SMS, même à une personne qui dit travailler pour KinPay Cash. Le support ne vous les demandera pas. Vérifiez le récapitulatif avant chaque validation.',
        ],
        [
            'id' => 'en-cours',
            'category' => 'probleme',
            'title' => 'Mon opération reste « En cours de confirmation »',
            'keywords' => ['attente', 'en cours', 'bloque', 'confirmation', 'probleme', 'statut'],
            'content' => 'Le statut change quand l’opérateur confirme. Consultez le détail de l’opération dans l’historique. Si le statut ne change pas, contactez le support en indiquant la référence de l’opération, jamais votre code PIN.',
        ],
        [
            'id' => 'bientot',
            'category' => 'probleme',
            'title' => 'Quand un service « Bientôt disponible » sera-t-il ouvert ?',
            'keywords' => ['bientot', 'disponible', 'date', 'nouveau service', 'quand'],
            'content' => 'Aucune date n’est annoncée. Un service passe à « Disponible » sur ce site lorsqu’il fonctionne dans l’application.',
        ],
    ],
];
