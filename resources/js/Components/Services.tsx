import Icon from '@/Components/Icon';
import type { Service } from '@/types';

/** Badge de statut, avec un texte (jamais la couleur seule). */
export function StatusBadge({ service }: { service: Service }) {
    return (
        <span className={`badge ${service.status === 'disponible' ? 'badge-ok' : 'badge-soon'}`} data-status={service.status}>
            <span aria-hidden="true" className={`size-2 rounded-full ${service.status === 'disponible' ? 'bg-ok' : 'bg-soon'}`} />
            {service.statusLabel}
        </span>
    );
}

/** Carte d'un service : icône générique, nom en texte simple (aucun logo), description et statut. */
export function ServiceCard({ service, headingLevel = 'h3' }: { service: Service; headingLevel?: 'h3' | 'h4' }) {
    const Heading = headingLevel;
    return (
        <li className="flex h-full flex-col rounded-2xl border border-line bg-white p-5" data-service={service.id}>
            <div className="flex items-start justify-between gap-3">
                <span
                    className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${
                        service.status === 'disponible' ? 'bg-primary text-white' : 'bg-surface text-muted'
                    }`}
                >
                    <Icon name={service.icon} />
                </span>
                <StatusBadge service={service} />
            </div>
            <Heading className="mt-4 text-lg">{service.name}</Heading>
            <p className="mt-1 text-muted">{service.description}</p>
        </li>
    );
}

/** Mention obligatoire dès qu'une marque tierce est citée. */
export function BrandsNotice({ text }: { text: string }) {
    return (
        <p className="mt-6 max-w-3xl text-sm text-muted" data-brands-notice>
            {text}
        </p>
    );
}

export function splitServices(services: Service[]) {
    return {
        available: services.filter((s) => s.status === 'disponible'),
        soon: services.filter((s) => s.status === 'bientot'),
    };
}
