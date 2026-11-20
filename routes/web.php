<?php

use App\Http\Controllers\PageController;
use App\Http\Controllers\SeoController;
use App\Http\Controllers\SupportController;
use Illuminate\Support\Facades\Route;

// Pages publiques (adresses inchangées depuis la première version du site).
Route::get('/', [PageController::class, 'home'])->name('home');
Route::get('/services', [PageController::class, 'services'])->name('services');
Route::get('/transactions', [PageController::class, 'transactions'])->name('transactions');
Route::get('/help', [PageController::class, 'help'])->name('help');

// Formulaire de support (protégé par le jeton CSRF du groupe « web »).
Route::post('/support/contact', [SupportController::class, 'store'])->name('support.contact');

// Référencement : robots.txt et sitemap.xml dépendent de l'environnement (noindex hors production).
Route::get('/robots.txt', [SeoController::class, 'robots'])->name('robots');
Route::get('/sitemap.xml', [SeoController::class, 'sitemap'])->name('sitemap');
