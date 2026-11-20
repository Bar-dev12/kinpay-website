import { useForm, usePage } from '@inertiajs/react';
import { CircleAlert, CircleCheck, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import { type FormEvent, useEffect, useRef, useState } from 'react';
import type { SharedProps } from '@/types';

type SupportTexts = Record<string, string>;

type Props = SharedProps & { support: { t: SupportTexts; formAvailable: boolean } };

const FIELDS = ['name', 'email', 'subject', 'message'] as const;

/**
 * Contact du support : coordonnées configurées (chacune masquée si absente) et formulaire, proposé seulement si le
 * serveur peut réellement transmettre le message (SUPPORT_TO_ADDRESS et vrai transport de courriel). Le message de
 * succès n'apparaît que si le serveur renvoie une référence de ticket, c'est-à-dire si le courriel a été accepté.
 */
export default function SupportContact() {
    const { site, support } = usePage<Props>().props;
    const t = support.t;
    const ui = site.ui;
    const { contact } = site;
    const hasContact = Boolean(contact.email || contact.phone || contact.whatsapp || contact.address);
    const [sentRef, setSentRef] = useState<string | null>(null);
    const statusRef = useRef<HTMLDivElement>(null);

    const form = useForm({ name: '', email: '', subject: '', message: '', website: '' });

    useEffect(() => {
        if (sentRef) {
            statusRef.current?.focus();
        }
    }, [sentRef]);

    const submit = (e: FormEvent) => {
        e.preventDefault();
        form.post('/support/contact', {
            preserveScroll: true,
            onSuccess: (page) => {
                const ref = (page.props as unknown as SharedProps).flash?.supportTicket ?? null;
                if (ref) {
                    setSentRef(ref);
                    form.reset();
                }
            },
            onError: () => statusRef.current?.focus(),
        });
    };

    const fieldError = (name: string) => (form.errors as Record<string, string>)[name];
    const describedBy = (name: string, hint?: boolean) =>
        [hint ? `aide-${name}` : '', fieldError(name) ? `erreur-${name}` : ''].filter(Boolean).join(' ') || undefined;

    return (
        <section aria-labelledby="titre-support" className="bg-surface py-16" id="support">
            <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.3fr]">
                <div>
                    <h2 id="titre-support" className="text-3xl">
                        {t.title}
                    </h2>
                    <p className="mt-3 text-muted">{t.lead}</p>

                    {hasContact ? (
                        <>
                            <h3 className="mt-8 text-xl">{t.contacts_title}</h3>
                            <ul className="mt-4 space-y-3" data-contacts>
                                {contact.email && (
                                    <li>
                                        <a href={`mailto:${contact.email}`} className="flex min-h-11 items-center gap-3 rounded-xl bg-white p-3 hover:text-primary">
                                            <Mail size={20} className="shrink-0 text-primary" aria-hidden="true" />
                                            <span>
                                                <span className="block text-sm text-muted">{ui.contact_email}</span>
                                                <span className="break-all font-semibold">{contact.email}</span>
                                            </span>
                                        </a>
                                    </li>
                                )}
                                {contact.phone && (
                                    <li>
                                        <a href={`tel:${contact.phone}`} className="flex min-h-11 items-center gap-3 rounded-xl bg-white p-3 hover:text-primary">
                                            <Phone size={20} className="shrink-0 text-primary" aria-hidden="true" />
                                            <span>
                                                <span className="block text-sm text-muted">{ui.contact_phone}</span>
                                                <span className="font-semibold">{contact.phone}</span>
                                            </span>
                                        </a>
                                    </li>
                                )}
                                {contact.whatsapp && (
                                    <li>
                                        <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center gap-3 rounded-xl bg-white p-3 hover:text-primary">
                                            <MessageCircle size={20} className="shrink-0 text-primary" aria-hidden="true" />
                                            <span>
                                                <span className="block text-sm text-muted">{ui.contact_whatsapp}</span>
                                                <span className="font-semibold">{ui.contact_whatsapp_action}</span>
                                                <span className="sr-only"> {ui.new_tab}</span>
                                            </span>
                                        </a>
                                    </li>
                                )}
                                {contact.address && (
                                    <li className="flex items-center gap-3 rounded-xl bg-white p-3">
                                        <MapPin size={20} className="shrink-0 text-primary" aria-hidden="true" />
                                        <span>
                                            <span className="block text-sm text-muted">{ui.contact_address}</span>
                                            <span className="font-semibold">{contact.address}</span>
                                        </span>
                                    </li>
                                )}
                            </ul>
                        </>
                    ) : (
                        !support.formAvailable && <p className="mt-6 rounded-xl bg-white p-4">{t.no_contact}</p>
                    )}
                </div>

                {support.formAvailable && (
                    <div className="rounded-3xl bg-white p-6 md:p-8" data-support-form>
                        <div ref={statusRef} tabIndex={-1} aria-live="polite" className="focus:outline-none">
                            {sentRef && (
                                <div className="rounded-2xl bg-ok-soft p-5 text-ok" data-support-success>
                                    <p className="flex items-center gap-2 text-lg font-semibold">
                                        <CircleCheck size={22} aria-hidden="true" />
                                        {t.success_title}
                                    </p>
                                    <p className="mt-2">{t.success.replace(':ref', sentRef)}</p>
                                </div>
                            )}
                            {!sentRef && fieldError('form') && (
                                <div className="mb-6 rounded-2xl bg-danger-soft p-4 text-danger" role="alert" data-support-error>
                                    <p className="flex items-center gap-2 font-semibold">
                                        <CircleAlert size={20} aria-hidden="true" />
                                        {t.error_title}
                                    </p>
                                    <p className="mt-1">{fieldError('form')}</p>
                                </div>
                            )}
                        </div>

                        {sentRef ? (
                            <button type="button" className="btn btn-secondary mt-6" onClick={() => setSentRef(null)}>
                                {t.again}
                            </button>
                        ) : (
                            <form onSubmit={submit} noValidate>
                                <h3 className="text-xl">{t.form_title}</h3>
                                <div className="mt-5 grid gap-5">
                                    {FIELDS.map((name) => {
                                        const hint = name === 'email' ? t.email_hint : name === 'message' ? t.message_hint : null;
                                        const common = {
                                            id: `support-${name}`,
                                            name,
                                            value: form.data[name],
                                            required: true,
                                            'aria-required': true,
                                            'aria-invalid': fieldError(name) ? true : undefined,
                                            'aria-describedby': describedBy(name, Boolean(hint)),
                                            className: 'field',
                                        } as const;
                                        return (
                                            <div key={name}>
                                                <label htmlFor={`support-${name}`} className="font-semibold">
                                                    {t[name]} <span className="text-sm font-normal text-muted">({t.required})</span>
                                                </label>
                                                {hint && (
                                                    <p id={`aide-${name}`} className="text-sm text-muted">
                                                        {hint}
                                                    </p>
                                                )}
                                                {name === 'message' ? (
                                                    <textarea {...common} rows={6} maxLength={3000} onChange={(e) => form.setData(name, e.target.value)} className="field mt-2" />
                                                ) : (
                                                    <input
                                                        {...common}
                                                        type={name === 'email' ? 'email' : 'text'}
                                                        autoComplete={name === 'name' ? 'name' : name === 'email' ? 'email' : 'off'}
                                                        maxLength={name === 'email' ? 190 : name === 'name' ? 100 : 150}
                                                        onChange={(e) => form.setData(name, e.target.value)}
                                                        className="field mt-2"
                                                    />
                                                )}
                                                {fieldError(name) && (
                                                    <p id={`erreur-${name}`} className="mt-1 text-sm font-semibold text-danger">
                                                        {fieldError(name)}
                                                    </p>
                                                )}
                                            </div>
                                        );
                                    })}
                                    <div className="trap" aria-hidden="true">
                                        <label htmlFor="support-website">{t.trap}</label>
                                        <input id="support-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={form.data.website} onChange={(e) => form.setData('website', e.target.value)} />
                                    </div>
                                </div>
                                <p className="mt-5 text-sm text-muted">{t.privacy}</p>
                                <button type="submit" disabled={form.processing} className="btn btn-primary mt-5 w-full sm:w-auto">
                                    <Send size={18} aria-hidden="true" />
                                    {form.processing ? t.sending : t.submit}
                                </button>
                            </form>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
