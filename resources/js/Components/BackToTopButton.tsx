import { ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function BackToTopButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 400);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    if (!visible) return null;

    return (
        <button
            onClick={scrollToTop}
            aria-label="Retour en haut"
            className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#0646D8] text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-[#0A54FF]"
        >
            <ChevronUp size={22} />
        </button>
    );
}
