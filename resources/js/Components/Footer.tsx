import { Link, usePage } from '@inertiajs/react';
import Logo from '@/Components/Logo';
import StoreLinks from '@/Components/StoreLinks';
import type { SharedProps } from '@/types';

/**
 * Pied de page. Chaque bloc (compte, contacts, réseaux sociaux, pages légales) n'apparaît que si au moins une valeur
 * est configurée. Les pages légales sont servies par l'application, avec la mention « provisoire » si elles le sont.
 */
export default function Footer() {
    const { site } = usePage<SharedProps>().props;
    const ui = site.ui;
    const { contact } = site;
    const hasContact = Boolean(contact.email || contact.phone || contact.whatsapp || contact.address);
    const hasAccount = Boolean(site.links.login || site.links.register);

    return (
        <footer className="on-dark bg-ink text-white">
            <div className="wrap grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
                <div className="lg:col-span-1">
                    <Logo light />
                    <p className="mt-3 font-semibold">{site.slogan}</p>
                    <p className="mt-3 text-sm text-white/85">{ui.footer_about}</p>
                </div>

                <div>
                    <h2 className="text-base">{ui.footer_pages}</h2>
                    <ul className="mt-3 space-y-1">
                        {ui.nav.map((item) => (
                            <li key={item.href}>
                                <Link href={item.href} className="inline-flex min-h-11 min-w-11 items-center text-white/90 underline-offset-4 hover:underline">
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {(hasAccount || site.links.googlePlay || site.links.appStore) && (
                    <div>
                        {hasAccount && (
                            <>
                                <h2 className="text-base">{ui.footer_account}</h2>
                                <ul className="mt-3 space-y-1">
                                    {site.links.register && (
                                        <li>
                                            <a href={site.links.register} className="inline-flex min-h-11 min-w-11 items-center text-white/90 underline-offset-4 hover:underline">
                                                {ui.register}
                                            </a>
                                        </li>
                                    )}
                                    {site.links.login && (
                                        <li>
                                            <a href={site.links.login} className="inline-flex min-h-11 min-w-11 items-center text-white/90 underline-offset-4 hover:underline">
                                                {ui.login}
                                            </a>
                                        </li>
                                    )}
                                </ul>
                            </>
                        )}
                        <div className="mt-4">
                            <StoreLinks site={site} light />
                        </div>
                    </div>
                )}

                {(hasContact || site.social.length > 0) && (
                    <div>
                        {hasContact && (
                            <>
                                <h2 className="text-base">{ui.footer_contact}</h2>
                                <ul className="mt-3 space-y-1 text-white/90">
                                    {contact.email && (
                                        <li>
                                            <a href={`mailto:${contact.email}`} className="inline-flex min-h-11 items-center break-all underline-offset-4 hover:underline">
                                                {contact.email}
                                            </a>
                                        </li>
                                    )}
                                    {contact.phone && (
                                        <li>
                                            <a href={`tel:${contact.phone}`} className="inline-flex min-h-11 items-center underline-offset-4 hover:underline">
                                                {contact.phone}
                                            </a>
                                        </li>
                                    )}
                                    {contact.whatsapp && (
                                        <li>
                                            <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline-offset-4 hover:underline">
                                                {ui.contact_whatsapp_action}
                                                <span className="sr-only"> {ui.new_tab}</span>
                                            </a>
                                        </li>
                                    )}
                                    {contact.address && <li className="py-2">{contact.address}</li>}
                                </ul>
                            </>
                        )}
                        {site.social.length > 0 && (
                            <>
                                <h2 className="mt-6 text-base">{ui.footer_social}</h2>
                                <ul className="mt-3 flex flex-wrap gap-x-4">
                                    {site.social.map((s) => (
                                        <li key={s.key}>
                                            <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 min-w-11 items-center text-white/90 underline-offset-4 hover:underline">
                                                {s.label}
                                                <span className="sr-only"> {ui.new_tab}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                )}
            </div>

            <div className="border-t border-white/20">
                <div className="wrap flex flex-col gap-4 py-6 text-sm text-white/85 md:flex-row md:items-start md:justify-between">
                    <p>
                        © {new Date().getFullYear()} {site.brand}. {ui.rights}
                    </p>
                    {site.legal.length > 0 && (
                        <div>
                            <h2 className="sr-only">{ui.footer_legal}</h2>
                            <ul className="flex flex-wrap gap-x-5">
                                {site.legal.map((l) => (
                                    <li key={l.key}>
                                        <a href={l.href} className="inline-flex min-h-11 items-center underline underline-offset-4" data-legal={l.key}>
                                            {l.label}
                                            {site.legalProvisional && <span>&nbsp;({ui.provisional})</span>}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            {site.legalProvisional && <p className="text-white/85">{ui.provisional_note}</p>}
                        </div>
                    )}
                </div>
            </div>
        </footer>
    );
}
