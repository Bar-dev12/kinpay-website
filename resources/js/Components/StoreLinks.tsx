import { Download } from 'lucide-react';
import type { Site } from '@/types';

/**
 * Liens vers les boutiques d'applications, en texte seulement (aucun logo de marque). Chaque lien n'apparaît que si son
 * adresse est configurée (GOOGLE_PLAY_URL, APP_STORE_URL) ; sans aucun des deux, rien n'est rendu.
 */
export default function StoreLinks({ site, light = false }: { site: Site; light?: boolean }) {
    const stores = [
        { href: site.links.googlePlay, label: site.ui.google_play },
        { href: site.links.appStore, label: site.ui.app_store },
    ].filter((s): s is { href: string; label: string } => Boolean(s.href));

    if (stores.length === 0) {
        return null;
    }

    return (
        <div>
            <p className={`text-sm font-semibold ${light ? 'text-white' : 'text-ink'}`}>{site.ui.stores_title}</p>
            <ul className="mt-2 flex flex-wrap gap-3">
                {stores.map((s) => (
                    <li key={s.href}>
                        <a
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={light ? 'btn btn-outline-light' : 'btn btn-secondary'}
                        >
                            <Download size={18} aria-hidden="true" />
                            {s.label}
                            <span className="sr-only"> {site.ui.new_tab}</span>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
