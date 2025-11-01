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

// route publik untuk laporan (tanpa auth)
Route::get('/laporan', function () {
    return Inertia::render('Laporan');
})->name('laporan');

// route publik untuk pemantauan (tanpa auth)
Route::get('/pemantauan', function () {
    return Inertia::render('Pemantauan');
})->name('pemantauan');

// route dashboard (sementara tanpa auth)
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');

// route publik untuk profile    (tanpa auth)
Route::get('/profile', function () {
    return Inertia::render('Profile');
})->name('profile');

// // route profile (hanya untuk user login)
// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

require __DIR__.'/auth.php';
