<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserRoleController extends Controller
{
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'role_ids' => ['array'],
            'role_ids.*' => ['exists:roles,id'],
        ]);

        $user->roles()->sync($validated['role_ids']);

        return back()->with('success', 'Role berhasil diperbarui.');
    }
}
