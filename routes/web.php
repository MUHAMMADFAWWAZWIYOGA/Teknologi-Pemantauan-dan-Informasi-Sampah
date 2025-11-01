<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProfileController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/laporan', function () {
    return Inertia::render('Laporan');
})->name('laporan');

Route::get('/pemantauan', function () {
    return Inertia::render('Pemantauan');
})->name('pemantauan');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');

Route::get('/profile', function () {
    return Inertia::render('Profile');
})->name('profile');


require __DIR__.'/auth.php';