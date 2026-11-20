<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\File;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

/**
 * Règle d'or : aucune fausse preuve, aucune fausse promesse.
 *  - aucune marque de tiers en image (fichier, référence, icône de marque) ;
 *  - aucun texte de la liste interdite dans les fichiers de langue, les données, les vues et les pages React ;
 *  - les noms de marques n'apparaissent qu'en texte, et seulement dans la liste des services ;
 *  - le bloc « Chiffres clés » n'existe pas sans valeurs configurées, sourcées et datées.
 */
class NoFakeProofTest extends TestCase
{
    /** Marques de tiers et opérateurs (noms ou fragments de noms de fichiers). */
    private const BRANDS = ['western', 'ria', 'visa', 'mastercard', 'alibaba', 'aliexpress', 'apple', 'playstore', 'playsrore', 'google', 'netflix', 'paypal', 'mpesa', 'm-pesa', 'orange', 'airtel', 'afri', 'vodacom', 'africell', 'wu'];

    /** Textes interdits (expressions rationnelles, insensibles à la casse). */
    private const FORBIDDEN = [
        '25\s*K\+?' => 'chiffre d’utilisateurs non prouvé',
        '1\s*M\+' => 'chiffre de transactions non prouvé',
        '99[,.]9' => 'taux de disponibilité non prouvé',
        '24\s*/\s*7' => 'engagement 24/7',
        '24\s*h\s*/\s*24' => 'engagement 24 h/24',
        '7\s*j\s*/\s*7' => 'engagement 7 j/7',
        'L-?KinPay' => 'ancien nom',
        'X{3,}' => 'valeur provisoire',
        '0{6,}' => 'identifiant provisoire',
        '\bkinpay\.(com|cd)\b' => 'ancien domaine',
        'Immeuble KinPay|Limete' => 'adresse non confirmée',
        'tout en dollars|devise unique' => 'promesse sur les devises',
        '\b(deux|trois|\d+)\s+devises\b' => 'nombre de devises',
        '200 pays|partout dans le monde|couverture mondiale' => 'couverture non prouvée',
        'partenaire|agréé|(distributeur|revendeur|représentant|agent)\s+officiel' => 'formule de partenariat',
        'révolution|innovant|expérience unique|meilleur|n°\s*1|leader' => 'superlatif',
        'instantané|en quelques secondes|temps réel' => 'promesse de rapidité',
        'chiffrement avancé|sécurité renforcée|100\s*%' => 'promesse de sécurité invérifiable',
        'href=["\']#["\']' => 'lien vide',
    ];

    /** @return array<string, string> chemin => contenu des fichiers à contrôler */
    private function texts(bool $withCode = true): array
    {
        $files = array_merge(
            glob(base_path('lang/fr/*.php')),
            glob(resource_path('data/*.json')),
            File::allFiles(resource_path('views')),
        );
        if ($withCode) {
            $files = array_merge($files, File::allFiles(resource_path('js')));
        }
        $out = [];
        foreach ($files as $f) {
            $path = (string) $f;
            $out[str_replace(base_path().'/', '', $path)] = (string) file_get_contents($path);
        }

        return $out;
    }

    public function test_no_forbidden_text_in_language_data_views_and_pages(): void
    {
        foreach ($this->texts() as $path => $content) {
            foreach (self::FORBIDDEN as $pattern => $why) {
                $this->assertDoesNotMatchRegularExpression('~'.$pattern.'~iu', $content, "$path : $why");
            }
        }
    }

    public function test_brand_is_kinpay_cash_everywhere_in_texts(): void
    {
        foreach ($this->texts(false) as $path => $content) {
            $this->assertDoesNotMatchRegularExpression('~KinPay(?!\s+Cash)~u', $content, "$path : « KinPay » sans « Cash »");
        }
        $this->assertSame('Votre argent vous accompagne partout.', __('vitrine.slogan'));
    }

    public function test_no_third_party_brand_image_file_remains(): void
    {
        $images = collect(File::allFiles(public_path()))
            ->map(fn ($f) => str_replace(public_path().'/', '', (string) $f))
            ->filter(fn ($p) => preg_match('/\.(png|jpe?g|gif|svg|webp|avif|ico)$/i', $p) && ! str_starts_with($p, 'build/'));

        foreach ($images as $path) {
            foreach (self::BRANDS as $brand) {
                $this->assertDoesNotMatchRegularExpression('~(^|[^a-z])'.preg_quote($brand, '~').'([^a-z]|$)~i', $path, "Image de marque : $path");
            }
        }
        // Liste blanche : le fond décoratif converti et les icônes du site, rien d'autre.
        foreach ($images as $path) {
            $this->assertMatchesRegularExpression('~^(images/fond/vague-(640|1024|1600)\.(avif|webp|jpg)|favicon\.(svg|ico))$~', $path, "Image non prévue : $path");
        }
    }

    public function test_pages_reference_no_brand_logo_or_brand_icon(): void
    {
        foreach (File::allFiles(resource_path('js')) as $f) {
            $content = (string) file_get_contents((string) $f);
            $this->assertStringNotContainsString('react-icons', $content, "$f : icônes de marques (react-icons)");
            $content = preg_replace('~/images/fond/vague-\d+\.jpg~', '', $content);
            $this->assertDoesNotMatchRegularExpression('~\.(png|jpe?g|gif|svg)["\']~i', $content, "$f : image référencée hors du fond autorisé");
            $this->assertDoesNotMatchRegularExpression('~https?://~i', $content, "$f : adresse écrite en dur");
        }
        $this->assertArrayNotHasKey('react-icons', json_decode((string) file_get_contents(base_path('package.json')), true)['dependencies']);
    }

    public function test_brand_names_appear_only_in_the_services_file(): void
    {
        $names = ['Western Union', 'Ria', 'Visa', 'Alibaba', 'AliExpress', 'Netflix', 'PayPal', 'Apple', 'M-Pesa', 'Orange Money', 'Airtel', 'Afrimoney', 'Mastercard'];
        $texts = $this->texts();
        unset($texts['resources/data/services.json']);
        foreach ($texts as $path => $content) {
            // Seule exception : l'intitulé des liens de boutiques (« Télécharger dans l’App Store »), affiché uniquement si le lien est configuré.
            $content = str_replace(['App Store', 'Google Play'], '', $content);
            foreach ($names as $name) {
                $this->assertDoesNotMatchRegularExpression('~\b'.preg_quote($name, '~').'\b~u', $content, "$path cite la marque $name hors de la liste des services");
            }
        }
    }

    public function test_brands_notice_is_shown_with_the_services(): void
    {
        $notice = 'Les marques citées appartiennent à leurs propriétaires. Leur mention ne signifie pas un partenariat avant que le service soit indiqué comme disponible.';
        $this->assertSame($notice, __('vitrine.common.brands_notice'));

        foreach (['/', '/services'] as $url) {
            $this->get($url)->assertOk()->assertInertia(fn (Assert $page) => $page
                ->where('showBrandsNotice', true)
                ->where('site.ui.brands_notice', $notice));
        }
    }

    public function test_stats_are_not_rendered_without_configuration(): void
    {
        config(['vitrine.stats' => []]);
        $this->get('/')->assertOk()->assertInertia(fn (Assert $page) => $page->component('Home')->where('stats', []));

        $component = (string) file_get_contents(resource_path('js/Components/StatsSection.tsx'));
        $this->assertStringContainsString('if (!stats || stats.length === 0)', $component);
        $this->assertStringContainsString('return null;', $component);
    }

    public function test_stats_require_value_label_source_and_past_date(): void
    {
        config(['vitrine.stats' => [
            ['value' => '10', 'label' => 'Comptes ouverts', 'source' => 'Rapport interne', 'date' => '2026-01-31'],
            ['value' => '20', 'label' => 'Sans source', 'date' => '2026-01-31'],
            ['value' => '30', 'label' => 'Sans date', 'source' => 'Rapport interne'],
            ['value' => '40', 'label' => 'Date future', 'source' => 'Rapport interne', 'date' => now()->addYear()->format('Y-m-d')],
            ['value' => '50', 'label' => 'Date invalide', 'source' => 'Rapport interne', 'date' => '2026-02-31'],
        ]]);

        $this->get('/')->assertInertia(fn (Assert $page) => $page
            ->has('stats', 1)
            ->where('stats.0.label', 'Comptes ouverts')
            ->where('stats.0.source', 'Rapport interne')
            ->where('stats.0.date', '31/01/2026'));
    }

    public function test_no_json_ld_with_figures(): void
    {
        $html = $this->get('/')->getContent();
        $this->assertStringNotContainsString('application/ld+json', $html);
    }
}
