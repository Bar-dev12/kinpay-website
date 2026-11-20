/**
 * Logo texte de KinPay Cash. Aucun fichier de logo n'a été fourni (dossier assets-marque absent) : ce logo
 * texte le remplace jusqu'à réception du fichier de logo de la marque (voir docs/NETTOYAGE.md).
 */
export default function Logo({ light = false }: { light?: boolean }) {
    return (
        <span className="inline-flex items-center gap-2 font-display text-xl font-semibold tracking-tight">
            <span
                aria-hidden="true"
                className={`flex size-9 items-center justify-center rounded-xl text-lg ${
                    light ? 'bg-white text-primary' : 'bg-primary text-white'
                }`}
            >
                K
            </span>
            <span className={light ? 'text-white' : 'text-ink'}>
                KinPay <span className={light ? 'text-white' : 'text-primary'}>Cash</span>
            </span>
        </span>
    );
}
