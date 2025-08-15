<?php

namespace App\Providers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;    

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        Validator::extend('gmail', function ($attribute, $value) {
            return preg_match('/^[A-Za-z0-9._%+-]+@gmail\.com$/i', $value);
        });

        Inertia::share([
            'auth' => [
                'user' => fn() => Auth::check()
                    ? \App\Models\User::with('roles')->find(Auth::id())
                    : null,
            ],
        ]);
    }
}
