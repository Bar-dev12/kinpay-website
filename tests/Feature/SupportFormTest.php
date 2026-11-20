<?php

namespace Tests\Feature;

use App\Models\SupportTicket;
use Illuminate\Contracts\Http\Kernel;
use Illuminate\Foundation\Http\Middleware\PreventRequestForgery;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;
use Inertia\Testing\AssertableInertia as Assert;
use Symfony\Component\Mailer\Exception\TransportException;
use Symfony\Component\Mailer\SentMessage;
use Symfony\Component\Mailer\Transport\AbstractTransport;
use Symfony\Component\Mime\Email;
use Tests\TestCase;

/**
 * Formulaire de support : succès affiché SEULEMENT si le courriel est accepté par le transport, masqué sans
 * destinataire, validation stricte, champ piège, limite de débit, journal sans corps de message.
 */
class SupportFormTest extends TestCase
{
    use RefreshDatabase;

    private const VALID = [
        'name' => 'Awa Test',
        'email' => 'awa@exemple-client.cd',
        'subject' => 'Question sur un dépôt',
        'message' => 'Bonjour, mon dépôt de test reste en cours de confirmation.',
    ];

    protected function setUp(): void
    {
        parent::setUp();
        config(['vitrine.support.to' => 'support@kinpaycash.test', 'mail.default' => 'array', 'mail.from.address' => 'ne-pas-repondre@kinpaycash.test']);
        RateLimiter::clear('support:'.hash('sha256', '127.0.0.1'));
    }

    /** @return array<int, Email> courriels acceptés par le transport « array » */
    private function sentMails(): array
    {
        return app('mail.manager')->mailer('array')->getSymfonyTransport()->messages()->map(fn (SentMessage $m) => $m->getOriginalMessage())->all();
    }

    private function useFailingTransport(): void
    {
        Mail::extend('panne', fn () => new class extends AbstractTransport
        {
            protected function doSend(SentMessage $message): void
            {
                throw new TransportException('Connexion SMTP refusée');
            }

            public function __toString(): string
            {
                return 'panne://';
            }
        });
        config(['mail.mailers.panne' => ['transport' => 'panne'], 'mail.default' => 'panne']);
    }

    public function test_success_only_after_mail_is_accepted(): void
    {
        $this->from('/help')->post('/support/contact', self::VALID)
            ->assertRedirect('/help')
            ->assertSessionHasNoErrors()
            ->assertSessionHas('supportTicket', 'KPC-000001');

        $mails = $this->sentMails();
        $this->assertCount(1, $mails);
        $this->assertSame('support@kinpaycash.test', $mails[0]->getTo()[0]->getAddress());
        $this->assertSame('awa@exemple-client.cd', $mails[0]->getReplyTo()[0]->getAddress());
        $this->assertStringContainsString('KPC-000001', $mails[0]->getSubject());
        $this->assertStringContainsString(self::VALID['message'], $mails[0]->getTextBody());
        $this->assertDatabaseHas('support_tickets', ['email' => 'awa@exemple-client.cd', 'status' => 'new']);
    }

    public function test_no_success_and_no_ticket_when_mail_fails(): void
    {
        $this->useFailingTransport();

        $this->from('/help')->post('/support/contact', self::VALID)
            ->assertRedirect('/help')
            ->assertSessionMissing('supportTicket')
            ->assertSessionHasErrors(['form' => __('vitrine.support.failed')]);

        $this->assertDatabaseCount('support_tickets', 0);
    }

    public function test_success_flash_reaches_the_page_props(): void
    {
        $this->from('/help')->post('/support/contact', self::VALID);
        $this->get('/help')->assertInertia(fn (Assert $page) => $page->where('flash.supportTicket', 'KPC-000001'));
    }

    public function test_fields_are_validated_with_maximum_lengths(): void
    {
        $this->from('/help')->post('/support/contact', [])
            ->assertSessionHasErrors(['name', 'email', 'subject', 'message']);

        $this->from('/help')->post('/support/contact', [
            'name' => str_repeat('a', 101),
            'email' => 'pas-une-adresse',
            'subject' => "Sujet\nBcc: autre@domaine.cd",
            'message' => str_repeat('m', 3001),
        ])->assertSessionHasErrors(['name', 'email', 'subject', 'message']);

        $this->from('/help')->post('/support/contact', array_merge(self::VALID, ['message' => 'court']))
            ->assertSessionHasErrors(['message']);

        $this->assertCount(0, $this->sentMails());
        $this->assertDatabaseCount('support_tickets', 0);
    }

    public function test_validation_messages_are_in_french(): void
    {
        $this->from('/help')->post('/support/contact', ['email' => 'x'])
            ->assertSessionHasErrors(['name' => 'Indiquez votre nom.']);
    }

    public function test_honeypot_rejects_without_success(): void
    {
        $this->from('/help')->post('/support/contact', array_merge(self::VALID, ['website' => 'https://spam.test']))
            ->assertSessionMissing('supportTicket')
            ->assertSessionHasErrors('form');

        $this->assertCount(0, $this->sentMails());
        $this->assertDatabaseCount('support_tickets', 0);
    }

    public function test_rate_limited_to_five_per_hour_per_ip(): void
    {
        for ($i = 1; $i <= 5; $i++) {
            $this->from('/help')->post('/support/contact', self::VALID)->assertSessionHas('supportTicket');
        }

        $this->from('/help')->post('/support/contact', self::VALID)
            ->assertSessionHasErrors('form')
            ->assertSessionMissing('supportTicket');

        $this->assertCount(5, $this->sentMails());
        $this->assertDatabaseCount('support_tickets', 5);
    }

    public function test_form_hidden_and_closed_without_support_address(): void
    {
        config(['vitrine.support.to' => null]);

        $this->get('/help')->assertOk()->assertInertia(fn (Assert $page) => $page->where('support.formAvailable', false));
        $this->post('/support/contact', self::VALID)->assertNotFound();
        $this->assertDatabaseCount('support_tickets', 0);
    }

    public function test_form_hidden_in_production_with_log_mailer(): void
    {
        $this->app['env'] = 'production';
        config(['mail.default' => 'log']);
        $this->withoutMiddleware(PreventRequestForgery::class);

        $this->get('/help')->assertInertia(fn (Assert $page) => $page->where('support.formAvailable', false));
        $this->post('/support/contact', self::VALID)->assertNotFound();
    }

    public function test_form_hidden_without_sender_address(): void
    {
        config(['mail.from.address' => null]);
        $this->get('/help')->assertInertia(fn (Assert $page) => $page->where('support.formAvailable', false));

        $this->app['env'] = 'production';
        config(['mail.from.address' => 'hello@example.com', 'mail.default' => 'smtp']);
        $this->get('/help')->assertInertia(fn (Assert $page) => $page->where('support.formAvailable', false));
    }

    public function test_form_shown_when_address_configured(): void
    {
        $this->get('/help')->assertInertia(fn (Assert $page) => $page->where('support.formAvailable', true));
    }

    public function test_csrf_protection_applies_to_the_form_route(): void
    {
        $route = Route::getRoutes()->getByName('support.contact');
        $this->assertContains('web', $route->gatherMiddleware());
        $this->assertContains(PreventRequestForgery::class, $this->app->make(Kernel::class)->getMiddlewareGroups()['web']);

        // Laravel désactive la vérification du jeton en environnement « testing » : on la réactive en simulant « local ».
        $this->app['env'] = 'local';
        $this->post('/support/contact', self::VALID)->assertStatus(419);
        $this->assertDatabaseCount('support_tickets', 0);
    }

    public function test_log_contains_no_message_body_nor_email(): void
    {
        Log::spy();

        $this->from('/help')->post('/support/contact', self::VALID);

        Log::shouldHaveReceived('info')->withArgs(function (string $msg, array $context = []) {
            $dump = $msg.json_encode($context);

            return $msg === 'support.ticket'
                && ! str_contains($dump, 'dépôt de test')
                && ! str_contains($dump, 'awa@exemple-client.cd');
        })->once();
    }

    public function test_ticket_keeps_only_form_fields(): void
    {
        $this->from('/help')->post('/support/contact', self::VALID + ['status' => 'resolved', 'ip' => '1.2.3.4']);

        $ticket = SupportTicket::firstOrFail();
        $this->assertSame('new', $ticket->status);
        $this->assertSame(['id', 'name', 'email', 'subject', 'message', 'status', 'created_at', 'updated_at'], array_keys($ticket->getAttributes()));
    }

    public function test_artisan_commands_list_and_update_tickets(): void
    {
        $this->from('/help')->post('/support/contact', self::VALID);

        $this->artisan('support:tickets')->expectsOutputToContain('KPC-000001')->assertSuccessful();
        $this->artisan('support:tickets --status=closed')->expectsOutput('Aucun ticket.')->assertSuccessful();
        $this->artisan('support:ticket KPC-000001')->expectsOutputToContain('Question sur un dépôt')->assertSuccessful();
        $this->artisan('support:ticket 1 --status=resolved')->assertSuccessful();
        $this->assertSame('resolved', SupportTicket::find(1)->status);
        $this->artisan('support:ticket 1 --status=inconnu')->assertFailed();
        $this->artisan('support:ticket 99')->assertFailed();
    }
}
