import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import {
    ArrowRightLeft,
    CreditCard,
    Smartphone,
    Globe,
    Wallet,
    ShieldCheck,
    Download,
} from 'lucide-react';
import { FaGooglePlay, FaApple } from 'react-icons/fa';
import { COMPANY } from '@/config/company';
import Footer from '@/Components/Footer';

const transactions = [
    {
        id: 'paiement',
        title: 'Paiement',
        icon: CreditCard,
        image: '/images/transactions/paiement-kinpay.png',
        description:
            `Réglez vos factures, achats et services directement depuis votre portefeuille ${COMPANY.name}.`,
        benefits: [
            'Paiement instantané',
            'Historique complet',
            'Sécurité renforcée',
            'Disponible 24h/24',
        ],
    },
    {
        id: 'transfert',
        title: "Transfert d'argent",
        icon: ArrowRightLeft,
        image: '/images/transactions/transfert-kinpay.png',
        description:
            `Envoyez et recevez de l'argent entre utilisateurs ${COMPANY.name} en quelques secondes.`,
        benefits: [
            'Transfert instantané',
            'Notifications en temps réel',
            'Faibles frais',
            'Historique détaillé',
        ],
    },
    {
        id: 'mobile-money',
        title: 'Mobile Money',
        icon: Smartphone,
        image: '/images/transactions/services-kinpay.png',
        description:
            'Déposez, retirez et rechargez votre compte grâce aux opérateurs partenaires.',
        benefits: [
            'Dépôt',
            'Retrait',
            'Recharge',
            'Disponibilité permanente',
        ],
    },
    {
        id: 'visa',
        title: 'Carte Visa virtuelle',
        icon: CreditCard,
        image: '/images/transactions/carte-visa-virtuelle.png',
        description:
            'Effectuez vos achats en ligne et payez vos abonnements internationaux.',
        benefits: [
            'Netflix',
            'ChatGPT',
            'Hébergement Web',
            'Achats internationaux',
        ],
    },
    {
        id: 'alibaba',
        title: 'Alibaba & AliExpress',
        icon: Globe,
        image: '/images/transactions/Alibaba&AliExpress2.png',
        description:
            `Payez vos commandes Alibaba et AliExpress directement depuis ${COMPANY.name}.`,
        benefits: [
            'Paiement sécurisé',
            'Commandes internationales',
            'Suivi simplifié',
            'Transactions rapides',
        ],
    },
    {
        id: 'western-union',
        title: 'Western Union',
        icon: Wallet,
        image: '/images/transactions/Western-Union2.png',
        description:
            "Recevez et envoyez de l'argent à travers le réseau Western Union.",
        benefits: [
            'Portée internationale',
            'Rapide',
            'Sécurisé',
            'Fiable',
        ],
    },
    {
        id: 'ria',
        title: 'Ria Money Transfer',
        icon: Wallet,
        image: '/images/transactions/ria2.png',
        description:
            "Accédez aux services de transfert d'argent internationaux via Ria.",
        benefits: [
            'Transferts mondiaux',
            'Rapidité',
            'Sécurité',
            'Accessibilité',
        ],
    },
    {
        id: 'esim',
        title: 'E-SIM Internationale',
        icon: Smartphone,
        image: '/images/transactions/e-sim.png',
        description:
            'Restez connecté partout dans le monde sans carte SIM physique.',
        benefits: [
            'Activation rapide',
            'Voyage',
            'Internet mobile',
            'Couverture mondiale',
        ],
    },
];

export default function Transactions() {
    return (
        <PublicLayout>
            <Head title="Transactions" />

            {/* HERO */}
            <section className="bg-[#F7F9FC] py-14 md:py-20 relative overflow-hidden"
                    style={{backgroundImage: "url('/images/transactions/transaction-bg.png')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}>
                <div className="mx-auto max-w-[1280px] px-4 md:px-6 text-center">

                    {/* <span className="inline-flex rounded-full bg-[#0646D8]/10 px-4 py-2 text-sm font-medium text-[#0646D8]">
                        Transactions {COMPANY.name}
                    </span> */}

                    <h1 className="mt-6 text-4xl font-bold text-[#071A4D] md:text-6xl">
                        Toutes vos transactions
                        <span className="block text-[#0646D8]">
                            dans une seule application
                        </span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-3xl text-lg text-[#667085]">
                        Transférez, payez, recevez, achetez en ligne et
                        accédez à des services financiers internationaux
                        depuis {COMPANY.name}.
                    </p>

                </div>
            </section>

            {/* NAVIGATION */}
            <section className="sticky top-0 z-20 border-b bg-white/95 backdrop-blur">
                <div className="mx-auto max-w-[1280px] overflow-x-auto px-4 md:px-6">
                    <div className="flex min-w-max gap-6 py-4">
                        {transactions.map((item) => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                className="whitespace-nowrap text-sm font-medium text-[#071A4D] hover:text-[#0646D8]"
                            >
                                {item.title}
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTIONS */}
            <section className="py-10 md:py-16">
                <div className="mx-auto max-w-[1280px] px-4 md:px-6">

                    <div className="space-y-8">

                        {transactions.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    id={item.id}
                                    key={item.id}
                                    className="scroll-mt-28 rounded-3xl border border-[#E4E7EC] bg-white p-6 md:p-8"
                                >
                                    <div className="grid gap-8 md:grid-cols-2 md:items-center">

                                        <div className={index % 2 ? 'md:order-2' : ''}>

                                            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0646D8] text-white">
                                                <Icon size={26} />
                                            </div>

                                            <h2 className="text-3xl font-bold text-[#071A4D]">
                                                {item.title}
                                            </h2>

                                            <p className="mt-4 text-[#667085] leading-7">
                                                {item.description}
                                            </p>

                                            <div className="mt-6 grid gap-3 sm:grid-cols-2">
                                                {item.benefits.map((benefit) => (
                                                    <div
                                                        key={benefit}
                                                        className="flex items-center gap-3 rounded-xl bg-[#F8FAFC] p-3"
                                                    >
                                                        <ShieldCheck
                                                            size={18}
                                                            className="text-[#0646D8]"
                                                        />
                                                        <span className="text-sm font-medium text-[#071A4D]">
                                                            {benefit}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>

                                        </div>

                                        <div className={index % 2 ? 'md:order-1' : ''}>
                                            <div className="overflow-hidden rounded-3xl border border-[#E4E7EC] bg-[#F8FAFC]">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="h-[280px] w-full object-cover"
                                                />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            );
                        })}

                    </div>

                </div>
            </section>

            {/* CTA FINAL */}
            <section className="pb-16">
                <div className="mx-auto max-w-[1280px] px-4 md:px-6">

                    <div className="rounded-3xl bg-[#0646D8] px-6 py-10 text-center text-white md:px-12 md:py-16">

                        <Download size={48} className="mx-auto" />

                        <h2 className="mt-6 text-3xl font-bold md:text-5xl">
                            Prêt à commencer ?
                        </h2>

                        <p className="mx-auto mt-4 max-w-2xl text-white/80">
                            Téléchargez {COMPANY.name} aujourd'hui et gérez votre argent partout.
                        </p>

                        <div className="mt-8 flex flex-wrap justify-center gap-4">

                            <a
                                href="#"
                                className="flex items-center gap-3 rounded-xl bg-black px-5 py-3"
                            >
                                <FaGooglePlay />
                                Google Play
                            </a>

                            <a
                                href="#"
                                className="flex items-center gap-3 rounded-xl bg-black px-5 py-3"
                            >
                                <FaApple />
                                App Store
                            </a>

                        </div>

                    </div>

                </div>
            </section>

            {/* Footer */}
            <Footer />

        </PublicLayout>
    );
}
