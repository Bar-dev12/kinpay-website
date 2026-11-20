export type HelpArticle = {
    id: string;
    category: string;
    title: string;
    keywords: string[];
    content: string;
};

export type HelpCategory = { id: string; title: string; description: string; icon: string };

const normalize = (text: string): string =>
    text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '');

/** Recherche simple dans la foire aux questions : titre, puis mots-clés, puis réponse. */
export const searchHelpArticles = (articles: HelpArticle[], query: string): HelpArticle[] => {
    const q = normalize(query.trim());
    if (!q) {
        return [];
    }

    return articles
        .map((article) => {
            let score = 0;
            if (normalize(article.title).includes(q)) score += 10;
            if (article.keywords.some((k) => normalize(k).includes(q))) score += 5;
            if (normalize(article.content).includes(q)) score += 2;
            return { article, score };
        })
        .filter((r) => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((r) => r.article);
};
