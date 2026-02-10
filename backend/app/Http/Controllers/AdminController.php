<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function dashboard()
    {
        return response()->json([
            'message' => 'Admin Dashboard',
            'user' => auth()->user(),
        ]);
    }

    public function users()
    {
        $users = User::where('role', '!=', 'super-admin')->paginate(15);
        return response()->json($users);
    }

    public function updateUser(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'string|max:255',
            'email' => 'string|email|max:255|unique:users,email,' . $user->id,
            'role' => 'string|in:user,admin,super-admin',
        ]);

        $user->update($validated);

        return response()->json([
            'message' => 'User updated successfully',
            'user' => $user,
        ]);
    }

    public function deleteUser(User $user)
    {
        if (auth()->user()->id === $user->id) {
            return response()->json([
                'message' => 'Cannot delete your own account',
            ], 403);
        }

        $user->delete();

        return response()->json([
            'message' => 'User deleted successfully',
        ]);
    }
}
