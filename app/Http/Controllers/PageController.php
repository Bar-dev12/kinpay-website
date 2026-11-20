<?php

namespace App\Http\Controllers;

use App\Support\ServiceCatalog;
use App\Support\SupportDesk;
use App\Support\Vitrine;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Pages publiques du site vitrine. Tous les textes viennent de lang/fr (vitrine.php, aide.php), les services de
 * resources/data/services.json, les liens et contacts de config/vitrine.php : la page React ne contient aucun texte
 * éditorial ni aucune adresse.
 */
class PageController extends Controller
{
    public function home(): Response
    {
        $services = ServiceCatalog::visible();

        return $this->render('Home', 'home', [
            't' => trans('vitrine.home'),
            'services' => $services,
            'showBrandsNotice' => ServiceCatalog::showsBrands(),
            'stats' => Vitrine::stats(),
        ], '/');
    }

    public function services(): Response
    {
        return $this->render('Services', 'services', [
            't' => trans('vitrine.services'),
            'services' => ServiceCatalog::visible(),
            'showBrandsNotice' => ServiceCatalog::showsBrands(),
        ], '/services');
    }

    public function transactions(): Response
    {
        return $this->render('Transactions', 'transactions', [
            't' => trans('vitrine.transactions'),
        ], '/transactions');
    }

    public function help(): Response
    {
        return $this->render('Help', 'help', [
            't' => trans('vitrine.help'),
            'faq' => trans('aide'),
            'support' => [
                't' => trans('vitrine.support'),
                'formAvailable' => SupportDesk::available(),
            ],
        ], '/help');
    }

    /** @param array<string, mixed> $props */
    private function render(string $component, string $key, array $props, string $path): Response
    {
        $seo = self::seo(__('vitrine.'.$key.'.title'), __('vitrine.'.$key.'.description'), $path);

        return Inertia::render($component, $props + ['seo' => $seo])->withViewData(['seo' => $seo]);
    }

    /** Balises de référencement, rendues par le serveur dans resources/views/app.blade.php. */
    public static function seo(string $title, string $description, ?string $path): array
    {
        $production = app()->isProduction();
        $base = Vitrine::url(config('vitrine.site_url'));
        $canonical = ($production && $base && $path !== null) ? rtrim($base, '/').($path === '/' ? '/' : $path) : null;

        return [
            'title' => $title.' – '.__('vitrine.seo.site_name'),
            'description' => $description,
            'canonical' => $canonical,
            'index' => $production && $path !== null,
            'siteName' => __('vitrine.seo.site_name'),
        ];
    }
}
