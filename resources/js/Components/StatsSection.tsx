import type { Stat } from '@/types';

/**
 * Chiffres clés. Rien n'est rendu sans valeurs fournies par la configuration (config/vitrine.php, clé « stats »), et
 * chaque chiffre affiche sa source et sa date. Le serveur écarte toute entrée incomplète.
 */
export default function StatsSection({ stats, title, sourceTemplate }: { stats: Stat[]; title: string; sourceTemplate: string }) {
    if (!stats || stats.length === 0) {
        return null;
    }

    return (
        <section aria-labelledby="titre-chiffres" className="py-16" data-stats>
            <div className="wrap">
                <h2 id="titre-chiffres" className="text-2xl md:text-3xl">
                    {title}
                </h2>
                <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((s) => (
                        <li key={s.label} className="rounded-2xl border border-line bg-white p-5">
                            <p className="font-display text-3xl font-semibold text-primary">{s.value}</p>
                            <p className="mt-1 font-semibold">{s.label}</p>
                            <p className="mt-2 text-sm text-muted">
                                {sourceTemplate.replace(':source', s.source).replace(':date', s.date)}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
