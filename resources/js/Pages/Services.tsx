import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';
// import services from '@/data/services.json';
import { ArrowRight } from 'lucide-react';
import servicesData from '@/data/services.json';
import type { ServiceCategory, ServiceItem } from '@/types/service';
import TrustBar from '@/Components/TrustBar';
import { COMPANY } from '@/config/company';
import Footer from '@/Components/Footer';

const services: ServiceCategory[] = servicesData.map((category) => ({
    ...category,

    desc : category.description.replace('{appName}', COMPANY.name),
    services: category.services.map((service) => ({
        ...service,

        name: service.name.replace('{appName}', COMPANY.name),

        description: service.description.replace(
            '{appName}',
            COMPANY.name
        ),
    })),
}));

export default function Services() {
    return (
        <PublicLayout>
            <Head title="Services" />

            {/* Hero */}
            <section className="relative overflow-hidden bg-[url('/images/services/services-hero2.png')] bg-cover bg-center bg-no-repeat py-16 md:py-24">
                <div className="absolute inset-0 bg-white/70" />

                <div className="relative mx-auto max-w-[1280px] px-4 text-center md:px-6">

                    <span className="inline-flex rounded-full bg-[#0646D8]/10 px-4 py-2 text-sm font-medium text-[#0646D8]">
                        Services {COMPANY.name}
                    </span>

                    <h1 className="mt-6 text-4xl font-bold text-[#071A4D] md:text-6xl">
                        Une plateforme unique
                        <span className="block text-[#0646D8]">
                            Pour tous vos besoins financiers
                        </span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-3xl text-lg text-[#667085]">
                        Paiement, transfert d'argent, Mobile Money et E-SIM
                        internationale dans une seule application.
                    </p>

                </div>
            </section>

            {/* Navigation rapide */}
            <section className="sticky top-0 z-20 border-b bg-white/95 backdrop-blur">
                <div className="mx-auto max-w-[1280px] overflow-x-auto px-4 md:px-6">
                    <div className="flex min-w-max gap-8 py-4">

                        {services.map((category) => (
                            <a
                                key={category.id}
                                href={`#${category.id}`}
                                className="whitespace-nowrap text-sm font-medium text-[#071A4D] hover:text-[#0646D8]"
                            >
                                {category.title}
                            </a>
                        ))}

                    </div>
                </div>
            </section>

            {/* Catégories */}
            <section className="py-10 md:py-16">
                <div className="mx-auto max-w-[1280px] px-4 md:px-6">

                    <div className="space-y-16">

                        {services.map((category) => (
                            <section
                                key={category.id}
                                id={category.id}
                                className="scroll-mt-28"
                            >

                                {/* Entête catégorie */}
                                <div className="mb-8">

                                    <h2 className="text-3xl font-bold text-[#071A4D] md:text-4xl">
                                        {category.title}
                                    </h2>

                                    <p className="mt-3 max-w-3xl text-[#667085]">
                                        {category.desc}
                                    </p>

                                </div>

                                {/* Bannière catégorie */}
                                <div className="mb-8 overflow-hidden rounded-3xl">
                                    <img
                                        src={category.image}
                                        alt={category.title}
                                        className="h-[220px] w-full object-cover md:h-[350px]"
                                    />
                                </div>

                                {/* Services */}
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

                                    {category.services.map((service: ServiceItem) => (
                                        <div
                                            key={service.name}
                                            className="group overflow-hidden rounded-3xl border border-[#E4E7EC] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                        >

                                            <div
                                                className="flex h-[200px] items-center justify-center overflow-hidden border-b border-[#E4E7EC] bg-[#F8FAFC]"
                                            >
                                                <img
                                                    src={service.image}
                                                    alt={service.name}
                                                    className="max-h-[160px] max-w-[90%] object-contain rounded-2xl"
                                                />
                                            </div>

                                            <div className="p-5">

                                                <h3 className="font-semibold text-[#071A4D]">
                                                    {service.name}
                                                </h3>

                                                <p className="mt-2 text-sm leading-6 text-[#667085]">
                                                    {service.description}
                                                </p>

                                                <button className="mt-4 flex items-center gap-2 text-sm font-medium text-[#0646D8]">
                                                    En savoir plus
                                                    <ArrowRight size={16} />
                                                </button>

                                            </div>

                                        </div>
                                    ))}

                                </div>

                            </section>
                        ))}

                    </div>

                </div>
            </section>

            {/* Pourquoi {COMPANY.name} */}
            <section className="bg-[#F7F9FC] py-16">
                <div className="mx-auto max-w-[1280px] px-4 md:px-6">

                    <div className="text-center">

                        <h2 className="text-3xl font-bold text-[#071A4D] md:text-4xl">
                            Pourquoi choisir {COMPANY.name} ?
                        </h2>

                        <p className="mx-auto mt-4 max-w-3xl text-[#667085]">
                            Une plateforme moderne conçue pour simplifier vos
                            transactions locales et internationales.
                        </p>

                    </div>

                    <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

                        <div className="rounded-3xl bg-white p-6 text-center">
                            <h3 className="font-semibold text-[#071A4D]">
                                Sécurisé
                            </h3>
                            <p className="mt-2 text-sm text-[#667085]">
                                Protection avancée de vos données.
                            </p>
                        </div>

                        <div className="rounded-3xl bg-white p-6 text-center">
                            <h3 className="font-semibold text-[#071A4D]">
                                Rapide
                            </h3>
                            <p className="mt-2 text-sm text-[#667085]">
                                Transactions quasi instantanées.
                            </p>
                        </div>

                        <div className="rounded-3xl bg-white p-6 text-center">
                            <h3 className="font-semibold text-[#071A4D]">
                                International
                            </h3>
                            <p className="mt-2 text-sm text-[#667085]">
                                Services disponibles partout.
                            </p>
                        </div>

                        <div className="rounded-3xl bg-white p-6 text-center">
                            <h3 className="font-semibold text-[#071A4D]">
                                Accessible
                            </h3>
                            <p className="mt-2 text-sm text-[#667085]">
                                Une seule application pour tout faire.
                            </p>
                        </div>

                    </div>

                </div>
            </section>

            {/* Trust Bar */}
            <TrustBar />

            {/* Footer */}
            <Footer />

        </PublicLayout>
    );
}
