<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Validator;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Validator::extend('gmail', function ($attribute, $value) {
            return preg_match('/^[A-Za-z0-9._%+-]+@gmail\.com$/i', $value);
        });
    }
}
