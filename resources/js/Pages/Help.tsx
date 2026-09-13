import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import { useMemo, useState, useEffect } from 'react';
import { Search, ArrowRight, ChevronDown, MessageCircle } from 'lucide-react';
import {
    UserRound,
    CreditCard,
    ArrowLeftRight,
    Smartphone,
    WalletCards,
    Globe2,
    ShieldCheck,
    CircleHelp,
} from 'lucide-react';
import helpData from '@/data/help.json';
import type { HelpArticle, HelpCategory } from '../types/help';
import { searchHelpArticles } from '../utils/help-search';
import BackToTopButton from '@/Components/BackToTopButton';
import SupportContact from '@/Components/help/SupportContact';
import { COMPANY } from '@/config/company';

export function parseHelpData<T>(data: T): T {
    return JSON.parse(
        JSON.stringify(data).replace(
            /\{appName\}/g,
            COMPANY.name
        )
    );
}

const parsedHelpData = parseHelpData(helpData);
import Footer from '@/Components/Footer';

const categories: HelpCategory[] = parsedHelpData.categories;
const articles: HelpArticle[] = parsedHelpData.articles;
// const categories: HelpCategory[] = helpData.categories;
// const articles: HelpArticle[] = helpData.articles;

const categoryIcons = {
    UserRound,
    CreditCard,
    ArrowLeftRight,
    Smartphone,
    WalletCards,
    Globe2,
    ShieldCheck,
    CircleHelp,
};

export default function Help() {
    const [query, setQuery] = useState('');
    const [openArticle, setOpenArticle] = useState<string | null>(null);

    const searchResults = useMemo(() => {
        return searchHelpArticles(articles, query);
    }, [query]);

    const displayedArticles = query.trim() ? searchResults : articles.slice(0, 8);

    const toggleArticle = (id: string) => {
        setOpenArticle((current) => (current === id ? null : id));
    };

    const openSearchResult = (article: HelpArticle) => {
        setQuery('');
        setOpenArticle(article.id);

        setTimeout(() => {
            const element = document.getElementById(`faq-${article.id}`);

            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                });
            }
        }, 100);
    };

    return (
        <PublicLayout>
            <Head title="Centre d'aide" />

            {/* Hero */}
            <section className="relative overflow-hidden bg-[#F7F9FC] py-16 md:py-24">
                <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#0646D8]/10 blur-3xl" />
                <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-[#0646D8]/10 blur-3xl" />

                <div className="relative mx-auto max-w-[1000px] px-4 text-center md:px-6">
                    <span className="inline-flex rounded-full bg-[#0646D8]/10 px-4 py-2 text-sm font-medium text-[#0646D8]">
                        Centre d'aide {COMPANY.name}
                    </span>

                    <h1 className="mt-6 text-4xl font-bold leading-tight text-[#071A4D] md:text-6xl">
                        Comment pouvons-nous
                        <span className="block text-[#0646D8]">vous aider ?</span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#667085] md:text-lg">
                        Trouvez rapidement les réponses à vos questions sur {COMPANY.name},
                        les paiements, les transferts, Mobile Money, E-SIM et bien plus.
                    </p>

                    {/* Recherche */}
                    <div className="mx-auto mt-10 max-w-3xl">
                        <div className="relative">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#98A2B3]" size={22} />

                            <input
                                type="text"
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="Rechercher une question, un service..."
                                className="h-16 w-full rounded-2xl border border-[#E4E7EC] bg-white pl-14 pr-5 text-base text-[#071A4D] shadow-lg outline-none transition focus:border-[#0646D8] focus:ring-4 focus:ring-[#0646D8]/10"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Résultats de recherche */}
            {query.trim() && (
                <section className="border-b border-[#E4E7EC] bg-white py-10">
                    <div className="mx-auto max-w-[1280px] px-4 md:px-6">
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-[#071A4D]">
                                    Résultats de recherche
                                </h2>

                                <p className="mt-1 text-sm text-[#667085]">
                                    {searchResults.length > 0
                                        ? `${searchResults.length} résultat${searchResults.length > 1 ? 's' : ''} pour « ${query} »`
                                        : `Aucun résultat pour « ${query} »`}
                                </p>
                            </div>
                        </div>

                        {searchResults.length > 0 ? (
                            <div className="grid gap-4 md:grid-cols-2">
                                {searchResults.map((article) => (
                                    <button
                                        key={article.id}
                                        type="button"
                                        onClick={() => openSearchResult(article)}
                                        className="group rounded-2xl border border-[#E4E7EC] bg-white p-5 text-left transition hover:-translate-y-1 hover:border-[#0646D8]/30 hover:shadow-lg"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <h3 className="font-semibold text-[#071A4D] transition group-hover:text-[#0646D8]">
                                                    {article.title}
                                                </h3>

                                                <p className="mt-2 text-sm leading-6 text-[#667085]">
                                                    {article.description}
                                                </p>

                                                <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#0646D8]">
                                                    Voir la réponse
                                                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                                                </span>
                                            </div>

                                            <ArrowRight size={18} className="mt-1 shrink-0 text-[#0646D8]" />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-2xl border border-dashed border-[#D0D5DD] bg-[#F8FAFC] px-6 py-10 text-center">
                                <CircleHelp className="mx-auto text-[#98A2B3]" size={36} />

                                <h3 className="mt-4 font-semibold text-[#071A4D]">
                                    Nous n'avons pas trouvé de réponse
                                </h3>

                                <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#667085]">
                                    Essayez avec d'autres mots-clés ou contactez directement
                                    notre équipe support.
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Catégories */}
            {!query.trim() && (
                <section className="py-14 md:py-20">
                    <div className="mx-auto max-w-[1280px] px-4 md:px-6">
                        <div className="mb-10 text-center">
                            <span className="text-sm font-semibold uppercase tracking-wider text-[#0646D8]">
                                Assistance
                            </span>

                            <h2 className="mt-3 text-3xl font-bold text-[#071A4D] md:text-4xl">
                                Que recherchez-vous ?
                            </h2>

                            <p className="mx-auto mt-4 max-w-2xl text-[#667085]">
                                Choisissez une catégorie pour accéder rapidement aux
                                informations dont vous avez besoin.
                            </p>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {categories.map((category) => {
                                const Icon = categoryIcons[
                                    category.icon as keyof typeof categoryIcons
                                ];

                                return (
                                    <a
                                        key={category.id}
                                        href={`#${category.id}`}
                                        className="group rounded-2xl border border-[#E4E7EC] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#0646D8]/30 hover:shadow-xl"
                                    >
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0646D8]/10 text-[#0646D8] transition group-hover:bg-[#0646D8] group-hover:text-white">
                                            <Icon size={23} />
                                        </div>

                                        <h3 className="mt-5 font-semibold text-[#071A4D]">
                                            {category.title}
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-[#667085]">
                                            {category.description}
                                        </p>

                                        <div className="mt-4 flex items-center gap-2 text-sm font-medium text-[#0646D8]">
                                            Voir les articles
                                            <ArrowRight
                                                size={16}
                                                className="transition-transform group-hover:translate-x-1"
                                            />
                                        </div>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* FAQ */}
            {!query.trim() && (
                <section className="bg-[#F7F9FC] py-14 md:py-20">
                    <div className="mx-auto max-w-[900px] px-4 md:px-6">
                        <div className="mb-10 text-center">
                            <span className="text-sm font-semibold uppercase tracking-wider text-[#0646D8]">
                                Questions fréquentes
                            </span>

                            <h2 className="mt-3 text-3xl font-bold text-[#071A4D] md:text-4xl">
                                Les réponses aux questions les plus courantes
                            </h2>

                            <p className="mx-auto mt-4 max-w-2xl text-[#667085]">
                                Retrouvez rapidement les informations essentielles sur
                                l'utilisation de {COMPANY.name}.
                            </p>
                        </div>

                        <div className="space-y-3">
                            {displayedArticles.map((article) => {
                                const isOpen = openArticle === article.id;

                                return (
                                    <div
                                        key={article.id}
                                        id={`faq-${article.id}`}
                                        className="overflow-hidden rounded-2xl border border-[#E4E7EC] bg-white"
                                    >
                                        <button
                                            type="button"
                                            onClick={() => toggleArticle(article.id)}
                                            className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left md:px-6"
                                        >
                                            <span className="font-semibold text-[#071A4D]">
                                                {article.title}
                                            </span>

                                            <ChevronDown
                                                size={20}
                                                className={`shrink-0 text-[#0646D8] transition-transform duration-300 ${
                                                    isOpen ? 'rotate-180' : ''
                                                }`}
                                            />
                                        </button>

                                        {isOpen && (
                                            <div className="border-t border-[#E4E7EC] px-5 pb-6 pt-4 md:px-6">
                                                <p className="text-sm leading-7 text-[#667085]">
                                                    {article.content}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* Contact Support */}
            {/* <section className="py-14 md:py-20">
                <div className="mx-auto max-w-[1000px] px-4 md:px-6">
                    <div className="overflow-hidden rounded-3xl bg-[#0646D8] px-6 py-12 text-center md:px-12">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-white">
                            <MessageCircle size={27} />
                        </div>

                        <h2 className="mt-6 text-3xl font-bold text-white md:text-4xl">
                            Vous avez encore besoin d'aide ?
                        </h2>

                        <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/80">
                            Notre équipe est disponible pour vous accompagner et répondre
                            à vos questions.
                        </p>

                        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <a
                                href="#"
                                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[#0646D8] transition hover:bg-[#F7F9FC]"
                            >
                                Contacter le support
                                <ArrowRight size={18} />
                            </a>

                            <a
                                href="#"
                                className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                            >
                                WhatsApp
                                <MessageCircle size={18} />
                            </a>
                        </div>
                    </div>
                </div>
            </section> */}

            {/* Support Contact */}
            <SupportContact />

            {/* Footer */}
            <Footer />

            <BackToTopButton />
        </PublicLayout>
    );
}
