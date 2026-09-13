/**
 * Types centralisés des services KinPay.
 * Permet de garantir une structure cohérente des données
 * entre les fichiers JSON, les composants React et le futur CMS.
 */

export interface ServiceItem {
    name: string;
    description: string;
    image: string;
}

export interface ServiceCategory {
    desc: string;
    id: string;
    title: string;
    description: string;
    image: string;
    services: ServiceItem[];
}
