<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserVerificationController extends Controller
{

    public function index(Request $request)
    {
        $query = User::with('roles');

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%')
                ->orWhere('email', 'like', '%' . $request->search . '%');
        }

        if ($request->filled('role')) {
            $query->whereHas('roles', fn($q) => $q->where('name', $request->role));
        }

<<<<<<< HEAD
        return Inertia::render('admin/UserList', [
=======
        return Inertia::render('admin/userList', [
>>>>>>> 484ed83805a18a9c79f12a717410d741d7d2f238
            'users' => $query->paginate(10)->withQueryString(),
            'roles' => Role::all(),
            'filters' => $request->only(['search', 'role']),
        ]);
    }
}
