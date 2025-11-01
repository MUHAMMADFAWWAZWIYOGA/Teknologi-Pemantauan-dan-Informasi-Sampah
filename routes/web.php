<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProfileController;

Route::get('/', function () {
    return redirect('/dashboard');
})->middleware('auth');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/laporan', function () {
        return Inertia::render('laporan');
    })->name('laporan');

    Route::get('/pemantauan', function () {
        return Inertia::render('Pemantauan');
    })->name('pemantauan');

    Route::get('/profile', function () {
        return Inertia::render('Profile');
    })->name('profile');
});

require __DIR__.'/auth.php';