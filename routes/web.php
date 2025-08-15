<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\UserRoleController;
use App\Http\Controllers\Admin\UserVerificationController;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    return Auth::check()
        ? redirect()->route('dashboard')
        : Inertia::render('welcome');
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
    Route::patch('/admin/users/{user}/role', [UserRoleController::class, 'update'])->name('admin.users.role.update');
    Route::get('/admin/users', [UserVerificationController::class, 'index'])->name('admin.users.index');
    Route::post('/admin/users/search', [UserVerificationController::class, 'index'])->name('admin.users.index');
});





require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
