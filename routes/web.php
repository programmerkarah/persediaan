<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AdminUserController;
use App\Http\Middleware\IsAdmin;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});
Route::middleware(['auth', 'verified', 'role.approved'])->group(function () {
    // Route::get('/menu-admin', [AdminController::class, 'index'])->name('admin.menu');
});

Route::middleware(['auth', \App\Http\Middleware\IsAdmin::class])->group(function () {
    Route::get('/api/admin/users', [AdminUserController::class, 'apiIndex']);
    Route::post('/api/admin/users/{user}/approve', [AdminUserController::class, 'approve']);
    Route::post('/api/admin/users/{user}/reject', [AdminUserController::class, 'reject']);
});

Route::middleware(['auth', \App\Http\Middleware\IsAdmin::class])->group(function () {
    Route::get('/admin/users', function () {
        return Inertia::render('roleMgmt/userVerification');
    });
});


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
