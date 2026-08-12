import {CreditCard, Repeat, Globe, Smartphone, Wallet} from 'lucide-react';
type Service = {
    title: string;
    description: string;
    icon: string;
    color: string;
};

type ServicesSectionProps = {
    services: Service[];
};

export default function ServicesSection({
    services,
}: ServicesSectionProps) {
    return (
        <section id="services" className="bg-white py-6 md:py-8">
            <div className="mx-auto max-w-[1280px] px-4 md:px-6">

                <div className="mb-6 flex items-center justify-center gap-4">
                    <div className="h-[2px] w-10 bg-[#0646D8]" />
                    <h2 className="text-lg font-bold text-[#071A4D] md:text-2xl">
                        Nos services
                    </h2>
                    <div className="h-[2px] w-10 bg-[#0646D8]" />
                </div>

                <div className="grid grid-cols-4 gap-2 md:gap-4 lg:grid-cols-8">

                    {services.map((service) => (

                        <div
                            key={service.title}
                            className="rounded-2xl border border-[#EEF2F6] bg-white p-3 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                        >
                            <div
                                className={`mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full ${service.color} text-white md:h-14 md:w-14`}
                            >
                                <img
                                    src={service.icon}
                                    alt={service.title}
                                    className="h-5 w-5 md:h-7 md:w-7"
                                />
                            </div>

                            <h3 className="text-[11px] font-semibold text-[#071A4D] md:text-sm">
                                {service.title}
                            </h3>

                            <p className="mt-1 hidden text-[10px] leading-4 text-[#667085] md:block">
                                {service.description}
                            </p>
                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
}
