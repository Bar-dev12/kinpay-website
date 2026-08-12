import {
    ShieldCheck,
    Zap,
    Globe,
    Building2,
    Download,
    UserPlus,
    Wallet,
    ArrowRightLeft,
} from 'lucide-react';

type Benefit = {
    title: string;
    description: string;
    icon: string;
};

type Step = {
    title: string;
    description: string;
    icon: string;
};

type WhyChooseSectionProps = {
    benefits: Benefit[];
    steps: Step[];
};

const benefitIcons = {
    security: ShieldCheck,
    speed: Zap,
    global: Globe,
    business: Building2,
};

const stepIcons = {
    download: Download,
    register: UserPlus,
    fund: Wallet,
    transact: ArrowRightLeft,
};

export default function WhyChooseSection({
    benefits,
    steps,
}: WhyChooseSectionProps) {
    return (
        <section className="bg-[#F7F9FC] py-10 md:py-16">
            <div className="mx-auto max-w-[1280px] px-4 md:px-6">

                <div className="mb-10 text-center">
                    <div className="mb-3 flex items-center justify-center gap-3">
                        <div className="h-[2px] w-10 bg-[#0646D8]" />
                        <span className="text-lg font-bold text-[#071A4D] md:text-2xl">
                            Pourquoi KinPay
                        </span>
                        <div className="h-[2px] w-10 bg-[#0646D8]" />
                    </div>

                    <h2 className="text-2xl font-bold text-[#071A4D] md:text-4xl">
                        Une plateforme simple, rapide et sécurisée
                    </h2>

                    <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-[#667085] md:text-lg">
                        Gérez votre argent, effectuez vos paiements et accédez
                        à des services financiers modernes depuis une seule
                        application.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">

                    {/* Pourquoi choisir KinPay */}
                    <div className="rounded-3xl bg-white p-6 shadow-sm md:p-8">

                        <h3 className="mb-6 text-xl font-bold text-[#071A4D]">
                            Pourquoi choisir KinPay ?
                        </h3>

                        <div className="space-y-5">

                            {benefits.map((benefit) => {
                                const Icon =
                                    benefitIcons[
                                        benefit.icon as keyof typeof benefitIcons
                                    ] || ShieldCheck;

                                return (
                                    <div
                                        key={benefit.title}
                                        className="flex gap-4"
                                    >
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0646D8]/10 text-[#0646D8]">
                                            <Icon size={22} />
                                        </div>

                                        <div>
                                            <h4 className="font-semibold text-[#071A4D]">
                                                {benefit.title}
                                            </h4>

                                            <p className="mt-1 text-sm leading-6 text-[#667085]">
                                                {benefit.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}

                        </div>

                    </div>

                    {/* Comment ça marche */}
                    <div className="rounded-3xl bg-white p-6 shadow-sm md:p-8">

                        <h3 className="mb-6 text-xl font-bold text-[#071A4D]">
                            Comment ça marche ?
                        </h3>

                        <div className="space-y-5">

                            {steps.map((step, index) => {
                                const Icon =
                                    stepIcons[
                                        step.icon as keyof typeof stepIcons
                                    ] || Download;

                                return (
                                    <div
                                        key={step.title}
                                        className="flex gap-4"
                                    >
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0646D8] text-white font-bold">
                                            {index + 1}
                                        </div>

                                        <div className="flex-1">

                                            <div className="flex items-center gap-3">
                                                <Icon
                                                    size={18}
                                                    className="text-[#0646D8]"
                                                />

                                                <h4 className="font-semibold text-[#071A4D]">
                                                    {step.title}
                                                </h4>
                                            </div>

                                            <p className="mt-1 text-sm leading-6 text-[#667085]">
                                                {step.description}
                                            </p>

                                        </div>
                                    </div>
                                );
                            })}

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}
