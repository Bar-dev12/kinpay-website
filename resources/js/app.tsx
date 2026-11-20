import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import type { ComponentType } from 'react';
import { createRoot } from 'react-dom/client';

// Pages chargées dans le même fichier : quatre pages légères, un aller-retour réseau de moins au premier affichage.
const pages = import.meta.glob<{ default: ComponentType }>('./Pages/*.tsx', { eager: true });

createInertiaApp({
    // Le titre complet (« Page – KinPay Cash ») est fourni par le serveur.
    title: (title) => title,

    resolve: (name) => {
        const page = pages[`./Pages/${name}.tsx`];
        if (!page) {
            throw new Error(`Page inconnue : ${name}`);
        }
        return page.default;
    },

    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },

    // Pas de barre de progression : elle injecte une balise <style> que la CSP refuse, et les pages sont légères.
    progress: false,
});
