import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import {
    ShieldCheck,
    Zap,
    Headphones,
} from 'lucide-react';
import {
    FaGooglePlay,
    FaApple,
} from 'react-icons/fa';
import ServicesSection from '@/Components/home/ServicesSection';
import StatsSection from '@/Components/StatsSection';
import WhyChooseSection from '@/Components/home/WhyChooseSection';
import TrustBar from '@/Components/home/TrustBar';


export default function Home() {
    const services = [
        {
            title: ' Paiement',
            description: 'Payez vos factures, sachats et services en toute sécurité',
            icon: '/images/services/carte-de-credit.png',
            color: 'bg-[#0646D8]',
        },
        {
            title: 'Transfert',
            description: "Envoyez et recevez de l'argent en toute sécurité",
            icon: '/images/services/transaction.png',
            color: 'bg-[#0646D8]',
        },
        {
            title: 'Carte Visa',
            description: 'Payer en ligne en toute sécurité avec votre carte virtuelle',
            icon: '/images/services/visa.png',
            color: 'bg-[#0646D8]',
        },
        {
            title: 'Alibaba & AliExpress',
            description: 'Payer facilement vos commandes Alibaba et AliExpress.',
            icon: '/images/services/alibaba.svg',
            color: 'bg-[#F97316]',
        },
        {
            title: 'E-SIM',
            description: 'Rester connecté partout dans le monde avec nos E-SIM',
            icon: '/images/services/carte-sim.png',
            color: 'bg-[#10B981]',
        },
        {
            title: 'Mobile Money',
            description: 'Recharger et utiliser votre Mobile Money facilement',
            icon: '/images/services/mobile-money.png',
            color: 'bg-[#EAB308]',
        },
        {
            title: 'Western Union',
            description: 'Envoyer et recevoir de l\'argent avec Western Union',
            icon: '/images/services/western-union.png',
            color: 'bg-black',
        },
        {
            title: 'Ria',
            description: 'Transfert d\'argent rapide et fiable avec Ria',
            icon: '/images/services/ria-logo.png',
            color: 'bg-[#fff]',
        },
    ];

    const stats = [
        { id: 1, value: '25K+', label: 'Utilisateurs', description: 'Utilisateurs actifs' },
        { id: 2, value: '1M+', label: 'Transactions', description: 'Transactions réalisées' },
        { id: 3, value: '99,9%', label: 'Disponibilité', description: 'Service disponible' },
        { id: 4, value: '24/7', label: 'Assistance', description: 'Support disponible' },
    ];

    const benefits = [
        {
            title: 'Sécurité avancée',
            description: 'Protection renforcée de vos transactions et de vos données.',
            icon: 'security',
        },
        {
            title: 'Rapidité',
            description: 'Envoyez, recevez et payez en quelques secondes.',
            icon: 'speed',
        },
        {
            title: 'Services internationaux',
            description: 'Visa virtuelle, E-SIM et services financiers internationaux.',
            icon: 'global',
        },
        {
            title: 'Particuliers et entreprises',
            description: 'Une solution adaptée aux particuliers comme aux professionnels.',
            icon: 'business',
        },
    ];

    const steps = [
        {
            title: 'Téléchargez KinPay',
            description: "Installez l'application depuis Google Play ou l'App Store.",
            icon: 'download',
        },
        {
            title: 'Créez votre compte',
            description: 'Inscrivez-vous rapidement et sécurisez votre accès.',
            icon: 'register',
        },
        {
            title: 'Alimentez votre portefeuille',
            description: 'Ajoutez des fonds via les méthodes disponibles.',
            icon: 'fund',
        },
        {
            title: 'Effectuez vos transactions',
            description: 'Transférez, payez et utilisez les services KinPay.',
            icon: 'transact',
        },
    ];

    return (
        <>
            <Head title="Accueil" />

            <PublicLayout>
                {/* HERO */}
                <section className="relative overflow-hidden bg-[#F5F6F8] rounded-b-[32px]"
                    style={{backgroundImage: "url('/images/hero/hero-bg-01.png')", backgroundPosition: 'right center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}
                >
                    <div className="mx-auto max-w-[1280px] px-2 py-2 md:px-6 md:py-4">

                        <div className="flex items-start space-between">

                            {/* Bloc gauche */}
                            <div className="w-[55%] pr-2 md:w-1/2 md:pr-6">

                                <h1
                                    className="text-[20px] font-bold leading-[20px] text-[#071A4D] sm:text-[34px] sm:leading-[38px] md:text-[52px] md:leading-[58px] lg:text-[62px] lg:leading-[56px]"
                                >
                                    Votre argent,

                                    <span className="block text-[#0646D8]">
                                        partout
                                    </span>

                                    avec vous
                                </h1>

                                <p
                                    className="mt-2 max-w-[480px] text-[11px] leading-4 text-[#667085] sm:text-[14px] md:mt-3 md:text-[15px] md:leading-6"
                                >
                                    KinPay est l'application simple,
                                    sécurisée et fiable pour gérer votre argent
                                    au quotidien.
                                </p>

                                {/* Avantages */}
                                <div className="mt-2 flex justify-between md:mt-4 md:justify-start md:gap-8">

                                    <div className="text-center md:border-r-3 border-[#dce3f0] pr-0 md:pr-4">
                                        <div
                                            className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-[#0646D8] text-white md:h-14 md:w-14 "
                                        >
                                            <ShieldCheck size={16} />
                                        </div>

                                        <div
                                            className="
                                                mt-2
                                                text-[10px]
                                                font-semibold
                                                text-[#071A4D]
                                                md:text-sm
                                            "
                                        >
                                            Sécurisé
                                            <p className="text-[7px] md:text-[10px] text-[#667085]">
                                                Protection avancée des vos données
                                            </p>
                                        </div>
                                    </div>

                                    <div className="text-center md:border-r-3 border-[#dce3f0] pr-0 md:pr-4">
                                        <div
                                            className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-[#0646D8] text-white md:h-14 md:w-14 "
                                        >
                                            <Zap size={16} />
                                        </div>

                                        <div
                                            className="mt-2 text-[10px] font-semibold text-[#071A4D]  md:text-sm "
                                        >
                                            Rapide
                                            <p className="text-[7px] md:text-[10px] text-[#667085]">
                                                Transactions instantanées
                                            </p>
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <div
                                            className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-[#0646D8] text-white md:h-14 md:w-14 "
                                        >
                                            <Headphones size={16} />
                                        </div>

                                        <div
                                            className="mt-2 text-[10px] font-semibold text-[#071A4D] md:text-sm  "
                                        >
                                            Assistance
                                            <p className="text-[7px] md:text-[10px] text-[#667085]">
                                                Disponible 24h/24 et 7j/7
                                            </p>
                                        </div>
                                    </div>

                                </div>

                                {/* Téléchargement de l'application */}
                                <div className="mt-3 md:mt-5">

                                    {/* Téléchargement de l'application */}
                                    <div className="">

                                        <p
                                            className="mb-2 text-[11px] font-semibold text-[#071A4D] sm:text-xs md:text-sm "
                                        >
                                            Téléchargez{' '}
                                            <span className="text-[#0646D8]">
                                                KinPay
                                            </span>{' '}
                                            dès maintenant
                                        </p>

                                        <div className="flex items-center gap-2 md:gap-10">

                                            {/* Google Play */}
                                            <a
                                                href="#"
                                                aria-label="Télécharger KinPay sur Google Play"
                                                className="flex h-[25px] w-[115px] items-center gap-2 rounded-[6px] bg-black px-1 text-white transition-transform hover:scale-[1.03] md:h-[46px] md:w-auto md:px-2 "
                                            >
                                                <FaGooglePlay
                                                    className="shrink-0 text-[19px] md:text-[23px]"
                                                />

                                                <div className="flex flex-col leading-none">
                                                    <span className="text-[7px]  md:text-[7px]">
                                                        Disponible sur
                                                    </span>

                                                    <span className="mt-0.5 text-[9px] font-medium md:text-[15px]">
                                                        Google Play
                                                    </span>
                                                </div>
                                            </a>

                                            {/* App Store */}
                                            <a
                                                href="#"
                                                aria-label="Télécharger KinPay dans l'App Store"
                                                className="flex h-[25px] w-[115px] items-center gap-2 rounded-[6px] bg-black px-1 text-white transition-transform hover:scale-[1.03] md:h-[46px] md:w-[150px] md:px-3 "
                                            >
                                                <FaApple
                                                    className="shrink-0 text-[20px] md:text-[24px]"
                                                />

                                                <div className="flex flex-col leading-none">
                                                    <span className="text-[7px] md:text-[7px]">
                                                        Disponible sur
                                                    </span>

                                                    <span className="mt-0.5 text-[9px] font-medium md:text-[15px]">
                                                        App Store
                                                    </span>
                                                </div>
                                            </a>

                                        </div>
                                    </div>

                                </div>

                            </div>

                            {/* Bloc droite */}
                            <div className="w-[60%] flex justify-center md:w-1/2 mt-4 md:mt-0">

                                <img
                                    src="/images/hero/phone-mockup.png"
                                    alt="Application KinPay"
                                    className="hidden md:block w-112.5 h-auto md:h-auto"
                                />
                                <img
                                    src="/images/hero/phone-hero-2.png"
                                    alt="Application KinPay"
                                    className="md:hidden block w-auto h-60 md:h-auto"
                                />

                            </div>

                        </div>

                    </div>
                </section>

                {/* Services Section */}
                <ServicesSection services={services} />

                {/* Stats Section */}
                <StatsSection stats={stats} />

                {/* Transactions Section */}
                <WhyChooseSection
                    benefits={benefits}
                    steps={steps}
                />

                {/* Trust Bar */}
                <TrustBar />

            </PublicLayout>

        </>
    );
}
