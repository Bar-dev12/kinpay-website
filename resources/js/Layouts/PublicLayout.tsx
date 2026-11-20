import { Head, usePage } from '@inertiajs/react';
import { ChevronUp } from 'lucide-react';
import { type PropsWithChildren, useEffect, useState } from 'react';
import Footer from '@/Components/Footer';
import Header from '@/Components/Header';
import type { SharedProps } from '@/types';

function BackToTop({ label }: { label: string }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 600);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    if (!visible) return null;

    return (
        <a
            href="#contenu"
            aria-label={label}
            className="fixed bottom-4 right-4 z-30 flex size-12 items-center justify-center rounded-full bg-primary text-white shadow-lg hover:bg-primary-dark"
        >
            <ChevronUp size={22} aria-hidden="true" />
        </a>
    );
}

export default function PublicLayout({ children }: PropsWithChildren) {
    const { site, seo } = usePage<SharedProps>().props;

    return (
        <>
            <Head title={seo.title} />
            <a
                href="#contenu"
                className="sr-only z-50 rounded-lg bg-primary px-4 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
            >
                {site.ui.skip}
            </a>
            <Header />
            <main id="contenu" tabIndex={-1} className="focus:outline-none">
                {children}
            </main>
            <Footer />
            <BackToTop label={site.ui.back_to_top} />
        </>
    );
}
