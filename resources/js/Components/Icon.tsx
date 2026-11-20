import {
    ArrowDownToLine,
    CircleHelp,
    CreditCard,
    List,
    Lock,
    type LucideIcon,
    Nfc,
    Package,
    Phone,
    Play,
    Plus,
    Receipt,
    Repeat,
    School,
    Send,
    Smartphone,
    Store,
    Tv,
    User,
    Wallet,
} from 'lucide-react';

/** Icônes génériques (dessins de la bibliothèque Lucide, licence ISC) : aucun logo de marque. */
const ICONS: Record<string, LucideIcon> = {
    wallet: Wallet,
    send: Send,
    'credit-card': CreditCard,
    package: Package,
    smartphone: Smartphone,
    phone: Phone,
    'arrow-down': ArrowDownToLine,
    nfc: Nfc,
    store: Store,
    play: Play,
    tv: Tv,
    repeat: Repeat,
    school: School,
    plus: Plus,
    lock: Lock,
    receipt: Receipt,
    list: List,
    user: User,
    help: CircleHelp,
};

export default function Icon({ name, size = 22, className }: { name: string; size?: number; className?: string }) {
    const Component = ICONS[name] ?? Plus;
    return <Component size={size} className={className} aria-hidden="true" focusable="false" />;
}
