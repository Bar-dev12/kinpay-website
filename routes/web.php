<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\SupportController;

Route::get('/', function () {
    return Inertia::render('Home');
});

// Transactions route
Route::inertia('/transactions', 'Transactions')->name('transactions');

// Services route
Route::inertia('/services', 'Services')->name('services');

// Help route
Route::inertia('/help', 'Help')->name('help');

// Support route
Route::post('/support/contact', [SupportController::class, 'store'])->name('support.contact');
