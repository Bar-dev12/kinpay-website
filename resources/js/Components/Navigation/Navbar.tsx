import { Bell, Menu, UserCircle, X } from 'lucide-react';
import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Globe, ChevronDown } from 'lucide-react';
import { FaGooglePlay, FaApple } from 'react-icons/fa';
import { COMPANY } from '@/config/company';

const navigation = [
    { label: 'Accueil', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Transactions', href: '/transactions' },
    { label: 'Aide', href: '/help' },
    { label: 'À propos', href: '/a-propos' },
];

export default function Navbar() {
    const { url } = usePage();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const isActive = (href: string) => {
        if (href === '/') {
            return url === '/';
        }

        return url.startsWith(href);
    };

    const [downloadOpen, setDownloadOpen] = useState(false);
    const [languageOpen, setLanguageOpen] = useState(false);
    const languages = [
        { code: 'FR', name: 'Français' },
        { code: 'EN', name: 'EnglishF' },
        { code: 'LN', name: 'Lingala' },
    ];

    return (
        <header className="relative z-50 bg-[#0646D8] text-white">
            <div className="mx-auto flex h-[60px] max-w-[1280px] items-center justify-between px-4 sm:px-6">

                {/* Logo */}
                <Link
                    href="/"
                    className="shrink-0"
                    aria-label="KinPay - Accueil"
                >
                    <img
                        src={COMPANY.logo.light}
                        alt={COMPANY.name}
                        className="h-14 w-auto sm:h-14"
                    />
                </Link>

                {/* Desktop / tablette / mobile large navigation */}
                <nav className="hidden items-center gap-5 sm:flex lg:gap-8">
                    {navigation.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`relative whitespace-nowrap py-1 text-sm font-semibold transition ${
                                isActive(item.href)
                                    ? 'text-white'
                                    : 'text-white/90 hover:text-white'
                            }`}
                        >
                            {item.label}

                            {isActive(item.href) && (
                                <span className="absolute inset-x-0 -bottom-2 h-0.5 rounded-full bg-white" />
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Desktop / tablette / mobile large actions */}
                {/* <div className="hidden items-center gap-4 sm:flex lg:gap-5">
                    <button
                        type="button"
                        aria-label="Notifications"
                        className="transition hover:opacity-80"
                    >
                        <Bell
                            size={24}
                            strokeWidth={2}
                        />
                    </button>

                    <button
                        type="button"
                        aria-label="Profil"
                        className="transition hover:opacity-80"
                    >
                        <UserCircle
                            size={29}
                            strokeWidth={1.8}
                        />
                    </button>
                </div> */}
                <div className="hidden items-center gap-4 sm:flex lg:gap-5">
                    <div className="relative">
                        <button
                            onClick={() => {
                                setDownloadOpen(!downloadOpen);
                                setLanguageOpen(false);
                            }}
                            className="flex items-center gap-2 rounded-xl bg-[#0646D8] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0538AD]"
                        >
                            Télécharger l'app
                            <ChevronDown size={16} />
                        </button>

                        {downloadOpen && (
                            <div className="absolute right-0 top-full mt-2 w-max-56 overflow-hidden rounded-xl border border-gray-100 bg-white text-[#0646D8] shadow-lg">

                                <a
                                    href="#"
                                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50"
                                >
                                    <FaGooglePlay className="text-[#0646D8]" />
                                    <span>Google Play</span>
                                </a>

                                <a
                                    href="#"
                                    className="flex items-center gap-3 px-4 pb-3 hover:bg-gray-50"
                                >
                                    <FaApple className="text-[#0646D8]" />
                                    <span>App Store</span>
                                </a>

                            </div>
                        )}
                    </div>

                    <div className="relative">
                        <button
                            onClick={() => {
                                setLanguageOpen(!languageOpen);
                                setDownloadOpen(false);
                            }}
                            className="flex h-9 w-30 items-center justify-center gap-1 text-sm font-semibold text-[white]"
                        >
                            <Globe size={16} />
                            <span>Compte</span>
                            <ChevronDown size={14} />
                        </button>

                        {languageOpen && (
                            <div className="absolute right-0 top-full mt-2 w-40 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg text-[#0646D8]">

                                <button className="block w-full px-4 py-2 text-left hover:bg-gray-50">
                                    Se connecter
                                </button>

                                <button className="block w-full px-4 pb-2 text-left hover:bg-gray-50">
                                    Créer un compte
                                </button>

                                {/* <button className="block w-full px-4 pb-2 text-left hover:bg-gray-50">
                                    Lingala
                                </button> */}

                            </div>
                        )}
                    </div>
                </div>


                {/* Très petit écran : bouton hamburger */}
                <button
                    type="button"
                    aria-label={
                        mobileMenuOpen
                            ? 'Fermer le menu'
                            : 'Ouvrir le menu'
                    }
                    aria-expanded={mobileMenuOpen}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="rounded-md p-1 transition hover:bg-white/10 sm:hidden"
                >
                    {mobileMenuOpen ? (
                        <X size={28} strokeWidth={2} />
                    ) : (
                        <Menu size={28} strokeWidth={2} />
                    )}
                </button>
            </div>

            {/* Menu très petit écran */}
            {mobileMenuOpen && (
                <div className="border-t border-white/15 bg-[#06318F] sm:hidden">
                    <nav className="mx-auto max-w-[1280px] px-4">
                        <div className="flex flex-col">
                            {navigation.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() =>
                                        setMobileMenuOpen(false)
                                    }
                                    className={`border-b border-white/10 py-4 text-sm font-semibold transition ${
                                        isActive(item.href)
                                            ? 'text-white'
                                            : 'text-white/80 hover:text-white'
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            ))}

                            <div className="mt-3 items-center gap-4 flex justify-between lg:gap-5">
                                <div className="relative">
                                    <button
                                        onClick={() => {
                                            setDownloadOpen(!downloadOpen);
                                            setLanguageOpen(false);
                                        }}
                                        className="flex items-center gap-2 rounded-xl py-3 text-sm font-semibold text-white transition"
                                    >
                                        Télécharger l'app
                                        <ChevronDown size={16} />
                                    </button>

                                    {downloadOpen && (
                                        <div className="absolute left-0 top-full mt-2 w-40 w-max-66 overflow-hidden rounded-xl border border-gray-100 bg-white text-[#0646D8] shadow-lg">

                                            <a
                                                href="#"
                                                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50"
                                            >
                                                <FaGooglePlay className="text-[#0646D8]" />
                                                <span>Google Play</span>
                                            </a>

                                            <a
                                                href="#"
                                                className="flex items-center gap-3 px-4 pb-2 hover:bg-gray-50"
                                            >
                                                <FaApple className="text-[#0646D8]" />
                                                <span>App Store</span>
                                            </a>

                                        </div>
                                    )}
                                </div>

                                <div className="relative">
                                    <button
                                        onClick={() => {
                                            setLanguageOpen(!languageOpen);
                                            setDownloadOpen(false);
                                        }}
                                        className="flex h-9 w-16 items-center justify-center gap-1 text-sm font-semibold text-[white]"
                                    >
                                        <Globe size={16} />
                                        <span>FR</span>
                                        <ChevronDown size={14} />
                                    </button>

                                    {languageOpen && (
                                        <div className="absolute right-0 top-full mt-2 w-max-40 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg text-[#0646D8]">

                                            <button className="block w-full px-4 py-2 text-left hover:bg-gray-50">
                                                Français
                                            </button>

                                            <button className="block w-full px-4 pb-2 text-left hover:bg-gray-50">
                                                English
                                            </button>

                                            <button className="block w-full px-4 pb-2 text-left hover:bg-gray-50">
                                                Lingala
                                            </button>

                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
