import { usePage } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import Icon from '@/Components/Icon';
import SupportContact from '@/Components/SupportContact';
import PublicLayout from '@/Layouts/PublicLayout';
import type { SharedProps } from '@/types';
import { type HelpArticle, type HelpCategory, searchHelpArticles } from '@/utils/help-search';

type Props = SharedProps & {
    t: Record<string, string>;
    faq: { categories: HelpCategory[]; articles: HelpArticle[] };
};

function Article({ article, open }: { article: HelpArticle; open?: boolean }) {
    return (
        <details id={`faq-${article.id}`} open={open} className="group rounded-2xl border border-line bg-white">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold [&::-webkit-details-marker]:hidden">
                {article.title}
                <span aria-hidden="true" className="text-xl text-primary transition-transform group-open:rotate-45">
                    +
                </span>
            </summary>
            <p className="border-t border-line px-5 py-4 text-muted">{article.content}</p>
        </details>
    );
}

/** Centre d'aide : foire aux questions (lang/fr/aide.php), recherche et contact du support. */
export default function Help() {
    const { t, faq } = usePage<Props>().props;
    const [query, setQuery] = useState('');
    const results = useMemo(() => searchHelpArticles(faq.articles, query), [faq.articles, query]);
    const searching = query.trim().length > 0;

    const summary = !searching
        ? ''
        : results.length === 0
          ? t.results_none.replace(':q', query.trim())
          : (results.length === 1 ? t.results_one : t.results_many).replace(':count', String(results.length)).replace(':q', query.trim());

    return (
        <PublicLayout>
            <section aria-labelledby="titre-page" className="bg-surface py-12 md:py-16">
                <div className="wrap">
                    <h1 id="titre-page" className="text-4xl md:text-5xl">
                        {t.heading}
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg text-muted">{t.lead}</p>
                    <form role="search" className="mt-8 max-w-2xl" onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="recherche-aide" className="font-semibold">
                            {t.search_label}
                        </label>
                        <div className="relative mt-2">
                            <Search size={20} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
                            <input
                                id="recherche-aide"
                                type="search"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder={t.search_placeholder}
                                className="field h-13 pl-12"
                                autoComplete="off"
                            />
                        </div>
                    </form>
                    <p aria-live="polite" className="mt-3 min-h-6 font-semibold" data-search-summary>
                        {summary}
                    </p>
                </div>
            </section>

            <div className="wrap py-12 md:py-16">
                {searching ? (
                    <section aria-label={summary}>
                        {results.length > 0 ? (
                            <div className="max-w-3xl space-y-3">
                                {results.map((a) => (
                                    <Article key={a.id} article={a} open />
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted">{t.no_result_hint}</p>
                        )}
                    </section>
                ) : (
                    <>
                        <section aria-labelledby="titre-themes">
                            <h2 id="titre-themes" className="text-2xl md:text-3xl">
                                {t.categories_title}
                            </h2>
                            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {faq.categories.map((c) => (
                                    <li key={c.id}>
                                        <a href={`#theme-${c.id}`} className="flex h-full items-start gap-4 rounded-2xl border border-line p-5 hover:border-primary">
                                            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                                                <Icon name={c.icon} />
                                            </span>
                                            <span>
                                                <span className="block font-semibold">{c.title}</span>
                                                <span className="mt-1 block text-muted">{c.description}</span>
                                            </span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section aria-labelledby="titre-faq" className="mt-14 max-w-3xl">
                            <h2 id="titre-faq" className="text-2xl md:text-3xl">
                                {t.faq_title}
                            </h2>
                            {faq.categories.map((c) => {
                                const items = faq.articles.filter((a) => a.category === c.id);
                                if (items.length === 0) return null;
                                return (
                                    <div key={c.id} id={`theme-${c.id}`} className="mt-8">
                                        <h3 className="text-xl">{c.title}</h3>
                                        <div className="mt-3 space-y-3">
                                            {items.map((a) => (
                                                <Article key={a.id} article={a} />
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </section>
                    </>
                )}
            </div>

            <SupportContact />
        </PublicLayout>
    );
}
