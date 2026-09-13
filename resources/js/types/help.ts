/**
 * Définit la structure des données du Centre d'aide KinPay.
 */

export interface HelpCategory {
    id: string;
    title: string;
    description: string;
    icon: string;
}

export interface HelpArticle {
    id: string;
    category: string;
    title: string;
    description: string;
    keywords: string[];
    content: string;
}

export interface HelpData {
    categories: HelpCategory[];
    articles: HelpArticle[];
}
