<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureRoleApproved
{
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();
        if ($user && $user->hasVerifiedEmail() && $user->role === 'Guest') {
            // email verified tapi role belum di-approve → batasi ke dashboard depan saja
            if ($request->route()?->getName() !== 'dashboard') {
                return redirect()->route('dashboard')->with('status', 'Menunggu persetujuan role oleh admin.');
            }
        }
        return $next($request);
    }
}
