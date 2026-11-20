import { usePage } from '@inertiajs/react';
import AccountLinks from '@/Components/AccountLinks';
import Icon from '@/Components/Icon';
import PublicLayout from '@/Layouts/PublicLayout';
import type { SharedProps, Step } from '@/types';

type Operation = { id: string; icon: string; title: string; steps: Step[] };

type Props = SharedProps & {
    t: {
        heading: string;
        lead: string;
        nav_label: string;
        step: string;
        items: Operation[];
        statuses: { title: string; items: { label: string; text: string }[] };
        other: string;
    };
};

/** Déroulé des opérations disponibles aujourd'hui, repris des parcours réels de l'application. */
export default function Transactions() {
    const { site, t } = usePage<Props>().props;

    return (
        <PublicLayout>
            <section aria-labelledby="titre-page" className="bg-surface py-12 md:py-16">
                <div className="wrap">
                    <h1 id="titre-page" className="text-4xl md:text-5xl">
                        {t.heading}
                    </h1>
                    <p className="mt-4 max-w-3xl text-lg text-muted">{t.lead}</p>
                    <nav aria-label={t.nav_label} className="mt-6">
                        <ul className="flex flex-wrap gap-2">
                            {t.items.map((op) => (
                                <li key={op.id}>
                                    <a href={`#${op.id}`} className="btn btn-secondary">
                                        {op.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </section>

            <div className="wrap space-y-6 py-12 md:py-16">
                {t.items.map((op) => (
                    <section key={op.id} id={op.id} aria-labelledby={`titre-${op.id}`} className="rounded-3xl border border-line p-6 md:p-8">
                        <div className="flex items-center gap-3">
                            <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-white">
                                <Icon name={op.icon} />
                            </span>
                            <h2 id={`titre-${op.id}`} className="text-2xl">
                                {op.title}
                            </h2>
                        </div>
                        <ol className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {op.steps.map((step, i) => (
                                <li key={step.title} className="rounded-2xl bg-surface p-4">
                                    <p className="text-sm font-semibold text-primary">{t.step.replace(':n', String(i + 1))}</p>
                                    <h3 className="mt-1 text-lg">{step.title}</h3>
                                    <p className="mt-1 text-muted">{step.text}</p>
                                </li>
                            ))}
                        </ol>
                    </section>
                ))}

                <section aria-labelledby="titre-statuts" className="rounded-3xl bg-surface p-6 md:p-8">
                    <h2 id="titre-statuts" className="text-2xl">
                        {t.statuses.title}
                    </h2>
                    <dl className="mt-4 grid gap-4 md:grid-cols-3">
                        {t.statuses.items.map((s) => (
                            <div key={s.label}>
                                <dt className="font-semibold">{s.label}</dt>
                                <dd className="mt-1 text-muted">{s.text}</dd>
                            </div>
                        ))}
                    </dl>
                </section>

                <p className="text-muted">{t.other}</p>
                <AccountLinks site={site} />
            </div>
        </PublicLayout>
    );
}
