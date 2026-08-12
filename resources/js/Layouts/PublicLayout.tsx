import { PropsWithChildren } from 'react';
import Navbar from '@/Components/Navigation/Navbar';
import BackToTopButton from '@/Components/BackToTopButton';

export default function PublicLayout({
    children,
}: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-white text-[#101A3A]">
            <Navbar />

            <main>{children}</main>

            <BackToTopButton />
        </div>
    );
}
