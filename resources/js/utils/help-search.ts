import type { HelpArticle } from '../types/help';

const normalizeText = (text: string): string => {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
};

export const searchHelpArticles = (articles: HelpArticle[], query: string): HelpArticle[] => {
    const normalizedQuery = normalizeText(query.trim());

    if (!normalizedQuery) {
        return [];
    }

    return articles
        .map((article) => {
            const title = normalizeText(article.title);
            const description = normalizeText(article.description);
            const keywords = article.keywords.map(normalizeText);

            let score = 0;

            if (title.includes(normalizedQuery)) {
                score += 10;
            }

            if (description.includes(normalizedQuery)) {
                score += 5;
            }

            keywords.forEach((keyword) => {
                if (keyword.includes(normalizedQuery)) {
                    score += 3;
                }
            });

            return { article, score };
        })
        .filter((result) => result.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((result) => result.article);
};
