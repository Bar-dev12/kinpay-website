import { Link, usePage } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { BrandsNotice, ServiceCard, splitServices } from '@/Components/Services';
import PublicLayout from '@/Layouts/PublicLayout';
import type { Service, SharedProps } from '@/types';

type Props = SharedProps & {
    t: { heading: string; lead: string; available: string; soon: string; soon_lead: string; cta: string };
    services: Service[];
    showBrandsNotice: boolean;
};

/** Liste officielle des services (resources/data/services.json), avec le statut de chacun. */
export default function Services() {
    const { site, t, services, showBrandsNotice } = usePage<Props>().props;
    const { available, soon } = splitServices(services);

    return (
        <PublicLayout>
            <section aria-labelledby="titre-page" className="bg-surface py-12 md:py-16">
                <div className="wrap">
                    <h1 id="titre-page" className="text-4xl md:text-5xl">
                        {t.heading}
                    </h1>
                    <p className="mt-4 max-w-3xl text-lg text-muted">{t.lead}</p>
                </div>
            </section>

            <div className="wrap py-12 md:py-16">
                {available.length > 0 && (
                    <section aria-labelledby="titre-disponibles">
                        <h2 id="titre-disponibles" className="text-2xl md:text-3xl">
                            {t.available}
                        </h2>
                        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {available.map((s) => (
                                <ServiceCard key={s.id} service={s} />
                            ))}
                        </ul>
                    </section>
                )}

                {soon.length > 0 && (
                    <section aria-labelledby="titre-bientot" className="mt-14">
                        <h2 id="titre-bientot" className="text-2xl md:text-3xl">
                            {t.soon}
                        </h2>
                        <p className="mt-3 max-w-3xl text-muted">{t.soon_lead}</p>
                        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {soon.map((s) => (
                                <ServiceCard key={s.id} service={s} />
                            ))}
                        </ul>
                    </section>
                )}

                {showBrandsNotice && <BrandsNotice text={site.ui.brands_notice} />}

                <Link href="/transactions" className="btn btn-secondary mt-10">
                    {t.cta}
                    <ArrowRight size={18} aria-hidden="true" />
                </Link>
            </div>
        </PublicLayout>
    );
}
