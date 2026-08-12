import { ShieldCheck, Lock } from 'lucide-react';
import { FaGooglePlay, FaApple } from 'react-icons/fa';
import { FaGooglePlay as GooglePlayIcon, FaApple as AppleIcon } from 'react-icons/fa';

export default function TrustBar() {
    return (
        <section className="pb-8 md:pb-12">
            <div className="mx-auto max-w-[1280px] px-4 md:px-6">

                <div className="flex flex-col gap-6 rounded-2xl bg-[#0646D8] px-5 py-5 text-white lg:flex-row lg:items-center lg:justify-between">

                    {/* Bloc 1 */}
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10">
                            <ShieldCheck size={24} />
                        </div>

                        <div>
                            <h3 className="font-semibold">
                                Sécurisée. Fiable. Rapide.
                            </h3>

                            <p className="text-sm text-white/80">
                                KinPay, votre solution financière de confiance.
                            </p>
                        </div>
                    </div>

                    <div className="hidden h-12 w-px bg-white/20 lg:block" />

                    {/* Bloc 2 */}
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10">
                            <Lock size={24} />
                        </div>

                        <div>
                            <h3 className="font-semibold">
                                Vos données sont protégées
                            </h3>

                            <p className="text-sm text-white/80">
                                Chiffrement avancé et sécurité renforcée.
                            </p>
                        </div>
                    </div>

                    <div className="hidden h-12 w-px bg-white/20 lg:block" />

                    {/* Bloc 3 */}
                    <div>
                        <p className="mb-3 text-sm font-semibold">
                            Téléchargez l'application
                        </p>

                        <div className="flex gap-2">

                            <a
                                href="#"
                                className="flex items-center gap-2 rounded-lg bg-black px-3 py-2 text-sm transition hover:scale-[1.03]"
                            >
                                <GooglePlayIcon size={16} />
                                Google Play
                            </a>

                            <a
                                href="#"
                                className="flex items-center gap-2 rounded-lg bg-black px-3 py-2 text-sm transition hover:scale-[1.03]"
                            >
                                <AppleIcon size={16} />
                                App Store
                            </a>

                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}
