import type { Site } from '@/types';

/**
 * Boutons « Créer un compte » et « Se connecter » vers l'application (adresses APP_REGISTER_URL et APP_LOGIN_URL).
 * Un bouton dont l'adresse n'est pas configurée n'est pas affiché.
 */
export default function AccountLinks({ site, variant = 'default', className = '' }: { site: Site; variant?: 'default' | 'dark'; className?: string }) {
    const { login, register } = site.links;
    if (!login && !register) {
        return null;
    }
    const primary = variant === 'dark' ? 'btn btn-light' : 'btn btn-primary';
    const secondary = variant === 'dark' ? 'btn btn-outline-light' : 'btn btn-secondary';

    return (
        <div className={`flex flex-wrap gap-3 ${className}`}>
            {register && (
                <a href={register} className={primary} data-link="register">
                    {site.ui.register}
                </a>
            )}
            {login && (
                <a href={login} className={secondary} data-link="login">
                    {site.ui.login}
                </a>
            )}
        </div>
    );
}
