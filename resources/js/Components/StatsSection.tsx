type Stat = {
    id: number | string;
    value: string;
    label: string;
    description?: string;
};

type StatsSectionProps = {
    stats: Stat[];
};

export default function StatsSection({ stats }: StatsSectionProps) {
    return (
        <section className="bg-[#F7F9FC] py-6 md:py-8">
            <div className="mx-auto max-w-[1280px] px-4 md:px-6">

                <div className="mb-6 flex items-center justify-center gap-3">
                    <div className="h-[2px] w-10 bg-[#0646D8]" />
                    <h2 className="text-lg font-bold text-[#071A4D] md:text-2xl">
                        Chiffres clés
                    </h2>
                    <div className="h-[2px] w-10 bg-[#0646D8]" />
                </div>

                <div className="grid grid-cols-4 gap-2 md:gap-4">
                    {stats.map((stat) => (
                        <div key={stat.id} className="rounded-2xl bg-white p-3 text-center shadow-sm md:p-5 transition-all hover:-translate-y-1 hover:shadow-md">
                            <div className="text-xl font-bold text-[#0646D8] md:text-3xl">
                                {stat.value}
                            </div>

                            <h3 className="mt-1 text-[11px] font-semibold text-[#071A4D] md:text-sm">
                                {stat.label}
                            </h3>

                            {stat.description && (
                                <p className="mt-1 hidden text-[10px] leading-4 text-[#667085] md:block">
                                    {stat.description}
                                </p>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
