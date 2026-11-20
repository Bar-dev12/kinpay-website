/**
 * Données envoyées par le serveur (Inertia). Les textes, liens, contacts et statuts viennent tous du serveur :
 * lang/fr/*.php, config/vitrine.php et resources/data/services.json. Aucun texte éditorial ni aucune adresse ici.
 */

export type Link = { label: string; href: string };

export type CommonTexts = {
    skip: string;
    home_suffix: string;
    nav_label: string;
    nav: Link[];
    menu_open: string;
    menu_close: string;
    login: string;
    register: string;
    new_tab: string;
    google_play: string;
    app_store: string;
    stores_title: string;
    footer_about: string;
    footer_pages: string;
    footer_account: string;
    footer_legal: string;
    footer_contact: string;
    footer_social: string;
    provisional: string;
    provisional_note: string;
    rights: string;
    back_to_top: string;
    status_available: string;
    status_soon: string;
    brands_notice: string;
    stats_title: string;
    stats_source: string;
    contact_email: string;
    contact_phone: string;
    contact_whatsapp: string;
    contact_whatsapp_action: string;
    contact_address: string;
};

export type Site = {
    brand: string;
    slogan: string;
    links: {
        login: string | null;
        register: string | null;
        googlePlay: string | null;
        appStore: string | null;
    };
    legal: { key: string; label: string; href: string }[];
    legalProvisional: boolean;
    contact: {
        email: string | null;
        phone: string | null;
        whatsapp: string | null;
        address: string | null;
    };
    social: { key: string; label: string; href: string }[];
    ui: CommonTexts;
};

export type Seo = { title: string; description: string };

export type SharedProps = {
    site: Site;
    seo: Seo;
    flash: { supportTicket: string | null };
    errors: Record<string, string>;
};

export type Service = {
    id: string;
    name: string;
    description: string;
    icon: string;
    status: 'disponible' | 'bientot';
    statusLabel: string;
    brand: boolean;
};

export type Stat = { value: string; label: string; source: string; date: string };

export type Step = { title: string; text: string };
