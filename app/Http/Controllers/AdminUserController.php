<?php

// app/Http/Controllers/AdminUserController.php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Middleware\IsAdmin;


class AdminUserController extends Controller
{
    public function index()
    {
        $users = User::whereNotNull('requested_role')->where('role', 'Guest')->get();
        return view('admin.users.index', compact('users'));
    }

    public function apiIndex()
    {
        return response()->json(
            User::whereNotNull('requested_role')
                ->where('role', 'Guest')
                ->get()
        );
    }

    public function approve(User $user)
    {
        $user->update([
            'role' => $user->requested_role,
            'requested_role' => null,
        ]);

        return response()->json(['message' => 'Role disetujui']);
    }

    public function reject(User $user)
    {
        $user->update([
            'requested_role' => null,
        ]);

        return response()->json(['message' => 'Role ditolak']);
    }
}
