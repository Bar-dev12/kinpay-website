import { Link, usePage } from '@inertiajs/react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import AccountLinks from '@/Components/AccountLinks';
import Icon from '@/Components/Icon';
import PhoneIllustration from '@/Components/PhoneIllustration';
import { BrandsNotice, ServiceCard, StatusBadge, splitServices } from '@/Components/Services';
import StatsSection from '@/Components/StatsSection';
import StoreLinks from '@/Components/StoreLinks';
import PublicLayout from '@/Layouts/PublicLayout';
import type { Service, SharedProps, Stat, Step } from '@/types';

type HomeTexts = {
    hero: {
        kicker: string;
        lead: string;
        cta_services: string;
        figure_label: string;
        caption: string;
        screen: { balance: string; cdf_amount: string; usd_amount: string; actions: string[]; last: string; last_label: string; last_status: string };
    };
    services: { title: string; lead: string; available: string; soon: string; more: string };
    currencies: { title: string; text: string };
    steps: { title: string; items: Step[] };
    control: { title: string; items: (Step & { icon: string })[]; advice: string };
    cta: { title: string; text: string };
};

type Props = SharedProps & { t: HomeTexts; services: Service[]; showBrandsNotice: boolean; stats: Stat[] };

/** Fond décoratif (vague) : AVIF puis WebP puis JPEG, trois largeurs, dimensions explicites. */
function HeroBackground() {
    const set = (ext: string) => [640, 1024, 1600].map((w) => `/images/fond/vague-${w}.${ext} ${w}w`).join(', ');
    return (
        <picture>
            <source type="image/avif" srcSet={set('avif')} sizes="100vw" />
            <source type="image/webp" srcSet={set('webp')} sizes="100vw" />
            <img
                src="/images/fond/vague-1024.jpg"
                srcSet={set('jpg')}
                sizes="100vw"
                width={1600}
                height={900}
                alt=""
                decoding="async"
                fetchPriority="low"
                className="pointer-events-none absolute inset-0 size-full object-cover object-right"
            />
        </picture>
    );
}

export default function Home() {
    const { site, t, services, showBrandsNotice, stats } = usePage<Props>().props;
    const { available, soon } = splitServices(services);

    return (
        <PublicLayout>
            {/* En-tête de page */}
            <section aria-labelledby="titre-accueil" className="relative overflow-hidden bg-surface">
                <HeroBackground />
                <div className="wrap relative grid items-center gap-10 py-12 md:grid-cols-[1.2fr_1fr] md:py-20">
                    <div>
                        <p className="font-semibold text-primary">{t.hero.kicker}</p>
                        <h1 id="titre-accueil" className="mt-2 text-4xl md:text-5xl lg:text-6xl">
                            {site.slogan}
                        </h1>
                        <p className="mt-5 max-w-xl text-lg text-muted">{t.hero.lead}</p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <AccountLinks site={site} />
                            {!site.links.login && !site.links.register && (
                                <Link href="/services" className="btn btn-primary">
                                    {t.hero.cta_services}
                                </Link>
                            )}
                        </div>
                        <div className="mt-6">
                            <StoreLinks site={site} />
                        </div>
                    </div>
                    <PhoneIllustration screen={t.hero.screen} label={t.hero.figure_label} caption={t.hero.caption} />
                </div>
            </section>

            {/* Services */}
            <section aria-labelledby="titre-services" className="py-16">
                <div className="wrap">
                    <h2 id="titre-services" className="text-3xl md:text-4xl">
                        {t.services.title}
                    </h2>
                    <p className="mt-3 max-w-2xl text-lg text-muted">{t.services.lead}</p>

                    {available.length > 0 && (
                        <>
                            <h3 className="mt-10 text-xl">{t.services.available}</h3>
                            <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                {available.map((s) => (
                                    <ServiceCard key={s.id} service={s} headingLevel="h4" />
                                ))}
                            </ul>
                        </>
                    )}

                    {soon.length > 0 && (
                        <>
                            <h3 className="mt-10 text-xl">{t.services.soon}</h3>
                            <ul className="mt-4 flex flex-wrap gap-2">
                                {soon.map((s) => (
                                    <li key={s.id} className="flex items-center gap-2 rounded-full border border-line bg-white py-1 pl-4 pr-1" data-service={s.id}>
                                        <span className="font-semibold">{s.name}</span>
                                        <StatusBadge service={s} />
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}

                    {showBrandsNotice && <BrandsNotice text={site.ui.brands_notice} />}

                    <Link href="/services" className="btn btn-secondary mt-8">
                        {t.services.more}
                        <ArrowRight size={18} aria-hidden="true" />
                    </Link>
                </div>
            </section>

            <StatsSection stats={stats} title={site.ui.stats_title} sourceTemplate={site.ui.stats_source} />

            {/* Devises et premiers pas */}
            <section aria-labelledby="titre-commencer" className="bg-surface py-16">
                <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.4fr]">
                    <div>
                        <h2 className="text-2xl md:text-3xl">{t.currencies.title}</h2>
                        <p className="mt-3 text-lg text-muted">{t.currencies.text}</p>
                    </div>
                    <div>
                        <h2 id="titre-commencer" className="text-2xl md:text-3xl">
                            {t.steps.title}
                        </h2>
                        <ol className="mt-6 space-y-5">
                            {t.steps.items.map((step, i) => (
                                <li key={step.title} className="flex gap-4">
                                    <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary font-display font-semibold text-white">
                                        {i + 1}
                                    </span>
                                    <div>
                                        <h3 className="text-lg">{step.title}</h3>
                                        <p className="mt-1 text-muted">{step.text}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </section>

            {/* Contrôle des opérations */}
            <section aria-labelledby="titre-controle" className="py-16">
                <div className="wrap">
                    <h2 id="titre-controle" className="text-3xl md:text-4xl">
                        {t.control.title}
                    </h2>
                    <ul className="mt-8 grid gap-4 md:grid-cols-3">
                        {t.control.items.map((item) => (
                            <li key={item.title} className="rounded-2xl border border-line p-5">
                                <span className="flex size-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                                    <Icon name={item.icon} />
                                </span>
                                <h3 className="mt-4 text-lg">{item.title}</h3>
                                <p className="mt-1 text-muted">{item.text}</p>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-6 flex max-w-3xl gap-3 rounded-2xl bg-soon-soft p-4 text-soon">
                        <ShieldCheck size={22} className="mt-0.5 shrink-0" aria-hidden="true" />
                        <span className="font-semibold">{t.control.advice}</span>
                    </p>
                </div>
            </section>

            {/* Appel final : seulement si l'inscription ou la connexion sont configurées */}
            {(site.links.register || site.links.login) && (
                <section aria-labelledby="titre-cta" className="pb-16">
                    <div className="wrap">
                        <div className="on-dark rounded-3xl bg-primary px-6 py-10 text-white md:px-12">
                            <h2 id="titre-cta" className="text-2xl md:text-3xl">
                                {t.cta.title}
                            </h2>
                            <p className="mt-2 text-white/90">{t.cta.text}</p>
                            <AccountLinks site={site} variant="dark" className="mt-6" />
                        </div>
                    </div>
                </section>
            )}
        </PublicLayout>
    );
}
