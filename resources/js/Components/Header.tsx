import { Link, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Logo from '@/Components/Logo';
import type { SharedProps } from '@/types';

export default function Header() {
    const { site } = usePage<SharedProps>().props;
    const { url } = usePage();
    const [open, setOpen] = useState(false);
    const ui = site.ui;
    const path = url.split(/[?#]/)[0];

    const isActive = (href: string) => (href === '/' ? path === '/' : path.startsWith(href));

    // Échap ferme le menu mobile.
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open]);

    const accountLinks = (
        <>
            {site.links.login && (
                <a href={site.links.login} className="btn btn-secondary" data-link="login">
                    {ui.login}
                </a>
            )}
            {site.links.register && (
                <a href={site.links.register} className="btn btn-primary" data-link="register">
                    {ui.register}
                </a>
            )}
        </>
    );

    return (
        <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
            <div className="wrap flex min-h-16 items-center justify-between gap-4">
                <Link href="/" className="inline-flex min-h-11 items-center rounded-xl">
                    <Logo />
                    <span className="sr-only">{ui.home_suffix}</span>
                </Link>

                <nav aria-label={ui.nav_label} className="hidden md:block">
                    <ul className="flex items-center gap-1">
                        {ui.nav.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    aria-current={isActive(item.href) ? 'page' : undefined}
                                    className={`inline-flex min-h-11 items-center rounded-lg px-3 font-semibold transition-colors ${
                                        isActive(item.href) ? 'text-primary underline decoration-2 underline-offset-8' : 'text-ink hover:text-primary'
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="hidden items-center gap-2 lg:flex">{accountLinks}</div>

                <button
                    type="button"
                    className="inline-flex size-11 items-center justify-center rounded-lg text-ink md:hidden"
                    aria-expanded={open}
                    aria-controls="menu-mobile"
                    aria-label={open ? ui.menu_close : ui.menu_open}
                    onClick={() => setOpen(!open)}
                >
                    {open ? <X size={26} aria-hidden="true" /> : <Menu size={26} aria-hidden="true" />}
                </button>
            </div>

            <div id="menu-mobile" hidden={!open} className="border-t border-line bg-white md:hidden">
                <nav aria-label={ui.nav_label} className="wrap py-3">
                    <ul className="flex flex-col">
                        {ui.nav.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    aria-current={isActive(item.href) ? 'page' : undefined}
                                    className={`flex min-h-12 items-center border-b border-line font-semibold ${
                                        isActive(item.href) ? 'text-primary' : 'text-ink'
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    {(site.links.login || site.links.register) && <div className="mt-4 flex flex-wrap gap-3">{accountLinks}</div>}
                </nav>
            </div>
        </header>
    );
}
