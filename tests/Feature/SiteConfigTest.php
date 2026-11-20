<?php

namespace Tests\Feature;

use App\Support\ServiceCatalog;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

/**
 * Statuts des services (fichier unique), liens vers l'application (variables d'environnement), contacts masqués tant
 * qu'ils ne sont pas renseignés, noindex hors production, en-têtes de sécurité et version de PHP.
 */
class SiteConfigTest extends TestCase
{
    private array $savedEnv = [];

    protected function tearDown(): void
    {
        foreach ($this->savedEnv as $k => $v) {
            $this->setEnv($k, $v);
        }
        parent::tearDown();
    }

    private function setEnv(string $key, ?string $value): void
    {
        if (! array_key_exists($key, $this->savedEnv)) {
            $this->savedEnv[$key] = $_ENV[$key] ?? null;
        }
        if ($value === null) {
            unset($_ENV[$key], $_SERVER[$key]);
            putenv($key);
        } else {
            $_ENV[$key] = $_SERVER[$key] = $value;
            putenv("$key=$value");
        }
    }

    /** Recharge config/vitrine.php avec les variables d'environnement données (comme au démarrage du serveur). */
    private function loadVitrineConfig(array $env): void
    {
        foreach ($env as $k => $v) {
            $this->setEnv($k, $v);
        }
        config(['vitrine' => require config_path('vitrine.php')]);
    }

    // --- Services -----------------------------------------------------------------------------------------------

    public function test_services_file_holds_the_official_list_with_default_statuses(): void
    {
        $raw = collect(ServiceCatalog::raw());
        $this->assertSame([
            'Paiement', 'Transférer', 'Carte Visa virtuelle', 'Paiement Alibaba et AliExpress', 'E-SIM', 'Mobile Money',
            'Western Union', 'Ria', 'Paiement NFC par bague', 'Boutique en ligne', 'Paiement Netflix', 'Réabonnement TV',
            'PayPal', 'Intégration pour les écoles', 'Et bien plus encore',
        ], $raw->pluck('name')->all());

        $available = $raw->where('status', 'disponible')->pluck('id')->sort()->values()->all();
        $this->assertSame(['esim', 'mobile-money', 'paiement', 'transferer'], $available);
        $this->assertTrue($raw->whereNotIn('id', $available)->every(fn ($s) => $s['status'] === 'bientot'));
        $this->assertTrue($raw->every(fn ($s) => in_array($s['status'], ServiceCatalog::STATUSES, true)));
        $this->assertSame($raw->count(), $raw->pluck('id')->unique()->count());
    }

    public function test_school_integration_has_no_performance_claim(): void
    {
        $school = collect(ServiceCatalog::raw())->firstWhere('id', 'integration-ecoles');
        $this->assertSame('bientot', $school['status']);
        $this->assertDoesNotMatchRegularExpression('~\d|%|seconde|précis|fiab|rapide|instant~iu', $school['description']);
    }

    public function test_pages_show_statuses_from_the_file(): void
    {
        foreach (['/', '/services'] as $url) {
            $this->get($url)->assertInertia(function (Assert $page) {
                $page->has('services', 15);
                foreach (ServiceCatalog::raw() as $i => $s) {
                    $page->where("services.$i.id", $s['id'])
                        ->where("services.$i.status", $s['status'])
                        ->where("services.$i.statusLabel", $s['status'] === 'disponible' ? 'Disponible' : 'Bientôt disponible');
                }
            });
        }
    }

    public function test_changing_the_file_changes_the_pages_and_unknown_status_hides(): void
    {
        $tmp = tempnam(sys_get_temp_dir(), 'services');
        file_put_contents($tmp, json_encode(['services' => [
            ['id' => 'a', 'name' => 'Service A', 'description' => 'Texte.', 'icon' => 'wallet', 'status' => 'disponible', 'marque' => false],
            ['id' => 'b', 'name' => 'Service B', 'description' => 'Texte.', 'icon' => 'wallet', 'status' => 'masque', 'marque' => true],
            ['id' => 'c', 'name' => 'Service C', 'description' => 'Texte.', 'icon' => 'logo-tiers', 'status' => 'Disponible ', 'marque' => false],
        ]]));
        config(['vitrine.services_file' => $tmp]);

        $this->get('/services')->assertInertia(fn (Assert $page) => $page
            ->has('services', 1)
            ->where('services.0.id', 'a')
            ->where('showBrandsNotice', false));
        unlink($tmp);
    }

    // --- Liens vers l'application ------------------------------------------------------------------------------

    public function test_login_and_register_links_come_from_environment(): void
    {
        $this->loadVitrineConfig(['APP_LOGIN_URL' => 'https://app.kinpaycash.test/connexion', 'APP_REGISTER_URL' => 'https://app.kinpaycash.test/creer']);

        $this->get('/')->assertInertia(fn (Assert $page) => $page
            ->where('site.links.login', 'https://app.kinpaycash.test/connexion')
            ->where('site.links.register', 'https://app.kinpaycash.test/creer'));
    }

    public function test_production_defaults_point_to_the_application(): void
    {
        $this->loadVitrineConfig(['APP_ENV' => 'production', 'APP_LOGIN_URL' => null, 'APP_REGISTER_URL' => null, 'LEGAL_BASE_URL' => null, 'KINPAY_APP_BASE_URL' => null]);
        $this->app['env'] = 'production';

        $this->get('/')->assertInertia(fn (Assert $page) => $page
            ->where('site.links.login', 'https://cps.kinpaycash.com/login')
            ->where('site.links.register', 'https://cps.kinpaycash.com/inscription')
            ->where('site.legal.0.href', 'https://cps.kinpaycash.com/conditions')
            ->where('site.legal.1.href', 'https://cps.kinpaycash.com/confidentialite')
            ->where('site.legal.2.href', 'https://cps.kinpaycash.com/mentions-legales')
            ->where('site.legalProvisional', true));
    }

    public function test_without_configuration_links_and_contacts_are_hidden(): void
    {
        $this->loadVitrineConfig(['APP_LOGIN_URL' => null, 'APP_REGISTER_URL' => null, 'LEGAL_BASE_URL' => null, 'KINPAY_APP_BASE_URL' => null]);

        $this->get('/')->assertInertia(fn (Assert $page) => $page
            ->where('site.links', ['login' => null, 'register' => null, 'googlePlay' => null, 'appStore' => null])
            ->where('site.legal', [])
            ->where('site.contact', ['email' => null, 'phone' => null, 'whatsapp' => null, 'address' => null])
            ->where('site.social', []));
    }

    public function test_placeholder_and_old_values_are_hidden(): void
    {
        config([
            'vitrine.contact' => ['email' => 'support@kinpay.cd', 'phone' => '243XXXXXXXXX', 'whatsapp' => '243XXXXXXXXX', 'address' => 'À compléter'],
            'vitrine.social' => ['facebook' => '#', 'instagram' => 'http://instagram.exemple-test.cd', 'linkedin' => '', 'x' => null, 'tiktok' => 'javascript:alert(1)'],
            'vitrine.stores' => ['google_play' => 'https://play.google.com/store/apps/details?id=com.kinpay.app#', 'app_store' => 'https://apps.apple.com/app/kinpay/id000000000'],
        ]);

        $this->get('/')->assertInertia(fn (Assert $page) => $page
            ->where('site.contact', ['email' => null, 'phone' => null, 'whatsapp' => null, 'address' => null])
            ->where('site.social', [])
            ->where('site.links.appStore', null));
    }

    public function test_valid_contacts_are_shown(): void
    {
        config([
            'vitrine.contact' => ['email' => 'support@kinpaycash.test', 'phone' => '+243 81 234 5678', 'whatsapp' => '243812345678', 'address' => 'Kinshasa'],
            'vitrine.social' => ['facebook' => 'https://www.facebook.com/kinpaycash.test'],
        ]);

        $this->get('/help')->assertInertia(fn (Assert $page) => $page
            ->where('site.contact.email', 'support@kinpaycash.test')
            ->where('site.contact.phone', '+243812345678')
            ->where('site.contact.whatsapp', 'https://wa.me/243812345678')
            ->where('site.social.0.label', 'Facebook'));
    }

    // --- Référencement ----------------------------------------------------------------------------------------

    public function test_noindex_outside_production(): void
    {
        foreach (['/', '/services', '/transactions', '/help'] as $url) {
            $res = $this->get($url)->assertOk()->assertHeader('X-Robots-Tag', 'noindex, nofollow');
            $this->assertStringContainsString('<meta name="robots" content="noindex, nofollow">', $res->getContent());
            $this->assertStringNotContainsString('rel="canonical"', $res->getContent());
        }
        $this->get('/robots.txt')->assertOk()->assertSeeText("User-agent: *\nDisallow: /", false);
        $this->get('/sitemap.xml')->assertNotFound();
    }

    public function test_production_has_index_canonical_open_graph_and_sitemap(): void
    {
        $this->app['env'] = 'production';
        config(['vitrine.site_url' => 'https://kinpaycash.com']);

        $res = $this->get('/services')->assertOk()->assertHeaderMissing('X-Robots-Tag');
        $html = $res->getContent();
        $this->assertStringContainsString('<html lang="fr">', $html);
        $this->assertStringContainsString('<meta name="robots" content="index, follow">', $html);
        $this->assertStringContainsString('<link rel="canonical" href="https://kinpaycash.com/services">', $html);
        $this->assertStringContainsString('<meta property="og:title" content="Services – KinPay Cash">', $html);
        $this->assertStringContainsString('<title inertia>Services – KinPay Cash</title>', $html);
        $this->assertMatchesRegularExpression('~<meta name="description" content="[^"]{40,}">~', $html);

        $this->get('/robots.txt')->assertSeeText('Sitemap: https://kinpaycash.com/sitemap.xml', false);
        $this->get('/sitemap.xml')->assertOk()->assertHeader('Content-Type', 'application/xml; charset=UTF-8')
            ->assertSee('<loc>https://kinpaycash.com/help</loc>', false);
    }

    // --- Sécurité et plate-forme --------------------------------------------------------------------------------

    public function test_security_headers_and_strict_csp(): void
    {
        $res = $this->get('/');
        $csp = $res->headers->get('Content-Security-Policy');
        $this->assertNotNull($csp);
        $this->assertMatchesRegularExpression("~script-src 'self' 'nonce-[A-Za-z0-9]+'~", $csp);
        $this->assertStringContainsString("frame-ancestors 'none'", $csp);
        $this->assertStringContainsString("default-src 'none'", $csp);
        $this->assertStringNotContainsString('unsafe-inline', $csp);
        $this->assertStringNotContainsString('unsafe-eval', $csp);
        $this->assertDoesNotMatchRegularExpression('~https?://~', $csp, 'aucune origine externe autorisée');

        preg_match("~'nonce-([^']+)'~", $csp, $m);
        $this->assertStringContainsString('nonce="'.$m[1].'"', $res->getContent());

        $res->assertHeader('X-Content-Type-Options', 'nosniff')
            ->assertHeader('X-Frame-Options', 'DENY')
            ->assertHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
        $this->assertStringContainsString('camera=()', $res->headers->get('Permissions-Policy'));
    }

    public function test_no_external_resource_in_rendered_page(): void
    {
        $html = $this->get('/')->getContent();
        preg_match_all('~(?:src|href)="([^"]+)"~', $html, $m);
        foreach ($m[1] as $url) {
            $this->assertTrue(str_starts_with($url, '/') || str_starts_with($url, config('app.url')), "Ressource externe : $url");
        }
    }

    public function test_session_cookie_is_http_only_and_secure_in_production(): void
    {
        $this->assertTrue(config('session.http_only'));
        $this->setEnv('APP_ENV', 'production');
        $this->setEnv('SESSION_SECURE_COOKIE', null);
        $session = require config_path('session.php');
        $this->assertTrue($session['secure']);
    }

    public function test_php_84_is_required(): void
    {
        $composer = json_decode((string) file_get_contents(base_path('composer.json')), true);
        $this->assertSame('^8.4', $composer['require']['php']);
        $this->assertTrue(version_compare(PHP_VERSION, '8.4.0', '>='));
    }

    public function test_existing_routes_still_respond(): void
    {
        foreach (['/' => 'Home', '/services' => 'Services', '/transactions' => 'Transactions', '/help' => 'Help'] as $url => $component) {
            $this->get($url)->assertOk()->assertInertia(fn (Assert $page) => $page->component($component));
        }
        $this->get('/up')->assertOk();
    }
}
