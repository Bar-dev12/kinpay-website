import { Link } from '@inertiajs/react';
import { COMPANY } from '@/config/company';
import { APP_LINKS } from '@/config/app-links';
import {
    FaGooglePlay,
    FaApple,
    FaLinkedin,
    FaInstagram,
    FaFacebook
} from 'react-icons/fa';
// import {
//     Facebook,
//     Instagram,
// } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#0646D8] text-white">
            <div className="mx-auto max-w-[1280px] px-4 pb-16 pt-12 md:px-6">

                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">

                    {/* Logo */}
                    <div className="lg:col-span-2">

                        <img
                            src={COMPANY.logo.light}
                            alt={COMPANY.name}
                            className="h-18"
                        />

                        <p className="mt-5 max-w-md text-sm leading-7 text-white/70">
                            {COMPANY.name} simplifie les paiements,
                            transferts d'argent, Mobile Money,
                            cartes virtuelles et E-SIM dans une
                            seule application.
                        </p>

                    </div>

                    {/* Produits */}
                    <div>

                        <h3 className="font-semibold">
                            Produits
                        </h3>

                        <ul className="mt-5 space-y-3 text-sm text-white/70">

                            <li>
                                <Link href="/services">
                                    Paiements
                                </Link>
                            </li>

                            <li>
                                <Link href="/services">
                                    Transferts
                                </Link>
                            </li>

                            <li>
                                <Link href="/services">
                                    Mobile Money
                                </Link>
                            </li>

                            <li>
                                <Link href="/services">
                                    E-SIM
                                </Link>
                            </li>

                        </ul>

                    </div>

                    {/* Entreprise */}
                    <div>

                        <h3 className="font-semibold">
                            Entreprise
                        </h3>

                        <ul className="mt-5 space-y-3 text-sm text-white/70">

                            <li>
                                <Link href="/about">
                                    À propos
                                </Link>
                            </li>

                            <li>
                                <Link href="/contact">
                                    Contact
                                </Link>
                            </li>

                            <li>
                                <Link href="/help">
                                    Centre d'aide
                                </Link>
                            </li>

                        </ul>

                    </div>

                    {/* Application */}
                    <div>

                        <h3 className="font-semibold">
                            Télécharger
                        </h3>

                        <div className="mt-5 space-y-3">

                            {/* Google Play */}
                            <a
                                href={APP_LINKS.googlePlay}
                                className="flex h-11 min-w-[140px] max-w-[160px] items-center justify-center gap-2 rounded-lg bg-black px-3 text-sm text-white transition hover:scale-[1.03]"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaGooglePlay size={16} />
                                Google Play
                            </a>

                            {/* App Store */}
                            <a
                                href={APP_LINKS.appStore}
                                className="flex h-11 min-w-[140px] max-w-[160px] items-center justify-center gap-2 rounded-lg bg-black px-3 text-sm text-white transition hover:scale-[1.03]"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaApple size={16} />
                                App Store
                            </a>

                        </div>

                    </div>

                </div>

                <div className="my-10 h-px bg-white/10" />

                <div className="flex flex-col gap-4 text-sm text-white/60 md:flex-row md:items-center md:justify-between">

                    <p>
                        © {new Date().getFullYear()} {COMPANY.name}.
                        Tous droits réservés.
                    </p>

                    <div className="flex gap-6">

                        <a
                            href={COMPANY.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 transition hover:text-white"
                        >
                            <FaFacebook size={18} />
                            <span>Facebook</span>
                        </a>

                        <a
                            href={COMPANY.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 transition hover:text-white"
                        >
                            <FaInstagram size={18} />
                            <span>Instagram</span>
                        </a>

                        <a
                            href={COMPANY.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 transition hover:text-white"
                        >
                            <FaLinkedin size={18} />
                            <span>LinkedIn</span>
                        </a>

                    </div>

                </div>

            </div>
        </footer>
    );
}
