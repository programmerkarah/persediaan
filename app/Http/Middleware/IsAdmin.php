<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsAdmin
{
    public function handle(Request $request, Closure $next)
    {
        if ($request->user()?->role !== 'Admin') {
            abort(403, 'Unauthorized');
        }

        return $next($request);
    }
}

