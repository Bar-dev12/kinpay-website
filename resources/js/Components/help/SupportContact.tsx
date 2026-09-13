import { FormEvent, useState } from 'react';
import { Mail, MessageCircle, Send, User, CheckCircle, AlertCircle } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { COMPANY } from '@/config/company';
import { useForm } from '@inertiajs/react';

const SUPPORT_EMAIL = COMPANY.supportEmail;
const WHATSAPP_NUMBER = COMPANY.whatsapp;

export default function SupportContact() {
    // const [form, setForm] = useState({
    //     name: '',
    //     email: '',
    //     subject: '',
    //     message: '',
    // });
    const {data, setData, post, processing, errors, reset, } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [userName, setUserName] = useState('');

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        `Bonjour ${COMPANY.name}, j’ai besoin d’assistance.`
    )}`;

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        setError('');

        post('/support/contact', {
            preserveScroll: true,

            onSuccess: () => {
                setUserName(data.name);
                reset();
                setSubmitted(true);
            },

            onError: () => {
                setError(
                    "Une erreur est survenue lors de l'envoi du message."
                );
            },
        });
    };

    // const handleChange = (
    //     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    // ) => {
    //     setData(
    //         e.target.name as 'name' | 'email' | 'subject' | 'message',
    //         e.target.value
    //     );
    // };

    return (
        <section className="py-14 md:py-20">
            <div className="mx-auto max-w-[1100px] px-4 md:px-6">
                <div className="overflow-hidden rounded-3xl bg-[#0646D8]">
                    <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
                        {/* Informations support */}
                        <div className="p-7 text-white md:p-10 lg:p-12">
                            <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white">
                                Support {COMPANY.name}
                            </span>

                            <h2 className="mt-6 text-3xl font-bold leading-tight md:text-4xl">
                                Besoin d'une assistance ?
                            </h2>

                            <p className="mt-4 leading-7 text-white/80">
                                Notre équipe est disponible pour vous accompagner et
                                répondre à vos questions concernant les services {COMPANY.name}.
                            </p>

                            <div className="mt-8 space-y-4">
                                <a
                                    href={`mailto:${SUPPORT_EMAIL}`}
                                    className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 transition hover:bg-white/15"
                                >
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#0646D8]">
                                        <Mail size={21} />
                                    </div>

                                    <div>
                                        <span className="block text-xs text-white/60">
                                            Email
                                        </span>

                                        <span className="mt-1 block font-medium">
                                            {SUPPORT_EMAIL}
                                        </span>
                                    </div>
                                </a>

                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 transition hover:bg-white/15"
                                >
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#0646D8]">
                                        <MessageCircle size={21} />
                                    </div>

                                    <div>
                                        <span className="block text-xs text-white/60">
                                            Assistance directe
                                        </span>

                                        <span className="mt-1 block font-medium">
                                            WhatsApp Support
                                        </span>
                                    </div>
                                </a>

                                <a
                                    href={COMPANY.mapUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 transition hover:bg-white/15"
                                >
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#0646D8]">
                                        <MapPin size={21} />
                                    </div>

                                    <div>
                                        <span className="block text-xs text-white/60">
                                            Adresse physique
                                        </span>

                                        <span className="mt-1 block font-medium">
                                            {COMPANY.address}
                                        </span>
                                    </div>
                                </a>
                            </div>

                            {/* <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-[#0646D8] transition hover:bg-[#F7F9FC]"
                            >
                                <MessageCircle size={18} />
                                Contacter sur WhatsApp
                            </a> */}
                        </div>

                        {/* Formulaire */}
                        <div className="bg-[#F7F9FC] p-7 md:p-10 lg:p-12">
                            {submitted ? (
                                <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0646D8]/10 text-[#0646D8]">
                                        <CheckCircle size={32} />
                                    </div>

                                    <h3 className="mt-6 text-2xl font-bold text-[#071A4D]">
                                        Message envoyé
                                    </h3>

                                    <p className="mt-3 max-w-md leading-7 text-[#667085]">
                                        Merci <span className="font-semibold text-[#071A4D]">{userName}</span> !
                                        Votre demande a bien été prise en compte.
                                        Notre équipe vous répondra dans les meilleurs délais.
                                    </p>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSubmitted(false);
                                            reset();
                                        }}
                                        className="mt-6 font-semibold text-[#0646D8] hover:underline"
                                    >
                                        Envoyer un autre message
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-7">
                                        <h3 className="text-2xl font-bold text-[#071A4D]">
                                            Envoyez-nous un message
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-[#667085]">
                                            Remplissez le formulaire et notre équipe
                                            pourra vous assister.
                                        </p>
                                    </div>

                                    {error && (
                                        <div className="mb-5 flex items-center gap-3 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                                            <AlertCircle size={18} />
                                            {error}
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="space-y-5">

                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-[#071A4D]">
                                                Nom complet
                                            </label>

                                            <input
                                                type="text"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className="h-12 w-full rounded-xl border border-[#E4E7EC] px-4"
                                            />

                                            {errors.name && (
                                                <p className="mt-1 text-sm text-red-500">
                                                    {errors.name}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-[#071A4D]">
                                                Email
                                            </label>

                                            <input
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                className="h-12 w-full rounded-xl border border-[#E4E7EC] px-4"
                                            />

                                            {errors.email && (
                                                <p className="mt-1 text-sm text-red-500">
                                                    {errors.email}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-[#071A4D]">
                                                Sujet
                                            </label>

                                            <input
                                                type="text"
                                                value={data.subject}
                                                onChange={(e) => setData('subject', e.target.value)}
                                                className="h-12 w-full rounded-xl border border-[#E4E7EC] px-4"
                                            />

                                            {errors.subject && (
                                                <p className="mt-1 text-sm text-red-500">
                                                    {errors.subject}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-[#071A4D]">
                                                Message
                                            </label>

                                            <textarea
                                                rows={6}
                                                value={data.message}
                                                onChange={(e) => setData('message', e.target.value)}
                                                className="w-full rounded-xl border border-[#E4E7EC] px-4 py-3"
                                            />

                                            {errors.message && (
                                                <p className="mt-1 text-sm text-red-500">
                                                    {errors.message}
                                                </p>
                                            )}
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0646D8] text-white"
                                        >
                                            <Send size={18} />

                                            {processing
                                                ? 'Envoi en cours...'
                                                : 'Envoyer le message'}
                                        </button>

                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
