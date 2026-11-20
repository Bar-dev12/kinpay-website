import Icon from '@/Components/Icon';

type ScreenTexts = {
    balance: string;
    cdf_amount: string;
    usd_amount: string;
    actions: string[];
    last: string;
    last_label: string;
    last_status: string;
};

const ACTION_ICONS = ['phone', 'send', 'wallet', 'smartphone'];

/**
 * Illustration originale (HTML et CSS, aucune image, aucune capture) d'un téléphone affichant un solde KinPay Cash.
 * Montants fictifs, indiqués dans la légende. Les textes viennent de lang/fr/vitrine.php (home.hero.screen).
 */
export default function PhoneIllustration({ screen, label, caption }: { screen: ScreenTexts; label: string; caption: string }) {
    return (
        <figure className="mx-auto w-full max-w-[18rem]">
            <div role="img" aria-label={label} className="rounded-[2.5rem] border-[10px] border-ink bg-ink shadow-2xl">
                <div aria-hidden="true" className="overflow-hidden rounded-[1.9rem] bg-surface">
                    <div className="flex justify-center bg-primary pt-2">
                        <span className="h-5 w-24 rounded-full bg-ink" />
                    </div>
                    <div className="bg-primary px-4 pb-6 pt-3 text-white">
                        <p className="text-sm text-white/90">{screen.balance}</p>
                        <div className="mt-2 grid gap-2">
                            <p className="flex items-baseline justify-between rounded-xl bg-white/15 px-3 py-2">
                                <span className="text-sm font-semibold">CDF</span>
                                <span className="font-display text-lg font-semibold tabular-nums">{screen.cdf_amount}</span>
                            </p>
                            <p className="flex items-baseline justify-between rounded-xl bg-white/15 px-3 py-2">
                                <span className="text-sm font-semibold">USD</span>
                                <span className="font-display text-lg font-semibold tabular-nums">{screen.usd_amount}</span>
                            </p>
                        </div>
                    </div>
                    <div className="-mt-3 rounded-t-2xl bg-surface px-3 pb-4 pt-4">
                        <div className="grid grid-cols-4 gap-2">
                            {screen.actions.map((a, i) => (
                                <span key={a} className="flex flex-col items-center gap-1 text-center text-[0.6875rem] font-semibold text-ink">
                                    <span className="flex size-10 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
                                        <Icon name={ACTION_ICONS[i] ?? 'plus'} size={18} />
                                    </span>
                                    {a}
                                </span>
                            ))}
                        </div>
                        <p className="mt-4 text-xs font-semibold text-muted">{screen.last}</p>
                        <p className="mt-1 flex items-center justify-between rounded-xl bg-white px-3 py-2 text-sm shadow-sm">
                            <span className="font-semibold">{screen.last_label}</span>
                            <span className="badge badge-ok">{screen.last_status}</span>
                        </p>
                        <div className="mt-3 grid gap-2">
                            <span className="h-9 rounded-xl bg-white shadow-sm" />
                            <span className="h-9 rounded-xl bg-white shadow-sm" />
                        </div>
                    </div>
                </div>
            </div>
            <figcaption className="mt-3 text-center text-sm text-muted">{caption}</figcaption>
        </figure>
    );
}
