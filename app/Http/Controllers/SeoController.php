<?php

namespace App\Http\Controllers;

use App\Support\Vitrine;
use Illuminate\Http\Response;

/**
 * robots.txt et sitemap.xml. Hors production (APP_ENV différent de « production »), tout le site est fermé aux moteurs
 * de recherche et le plan du site n'existe pas. En production, le plan liste les pages publiques à partir d'APP_URL.
 */
class SeoController extends Controller
{
    public const PAGES = ['/', '/services', '/transactions', '/help'];

    public function robots(): Response
    {
        $base = Vitrine::url(config('vitrine.site_url'));
        if (! app()->isProduction() || ! $base) {
            $body = "User-agent: *\nDisallow: /\n";
        } else {
            $body = "User-agent: *\nDisallow: /support/\n\nSitemap: ".rtrim($base, '/')."/sitemap.xml\n";
        }

        return response($body, 200, ['Content-Type' => 'text/plain; charset=UTF-8']);
    }

    public function sitemap(): Response
    {
        $base = Vitrine::url(config('vitrine.site_url'));
        abort_unless(app()->isProduction() && $base, 404);

        $urls = '';
        foreach (self::PAGES as $path) {
            $urls .= '  <url><loc>'.e(rtrim($base, '/').$path).'</loc></url>'."\n";
        }
        $xml = '<?xml version="1.0" encoding="UTF-8"?>'."\n"
            .'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'."\n".$urls.'</urlset>'."\n";

        return response($xml, 200, ['Content-Type' => 'application/xml; charset=UTF-8']);
    }
}
