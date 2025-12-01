<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class AdminUserController extends Controller
{
    public function index()
    {
        $users = User::where('role', 'user')
            ->withCount([
                'courses as total_modules',
                'courses as completed_modules' => function ($query) {
                    $query->where('course_user.is_completed', true);
                }
            ])
            ->latest()
            ->get();

        return Inertia::render('Admin/Users/Index', [
            'users' => $users
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Users/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'phone_number' => 'nullable|string|max:20',
            'birth_date' => 'nullable|date',
            'location' => 'nullable|string|max:255',
            'bio' => 'nullable|string|max:500',
        ]);

        User::create([
            'name' => $validated['name'],
            'username' => $validated['username'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'phone_number' => $validated['phone_number'] ?? null,
            'birth_date' => $validated['birth_date'] ?? null,
            'location' => $validated['location'] ?? null,
            'bio' => $validated['bio'] ?? null,
            'role' => 'user',
        ]);

        return redirect()->route('admin.users.index')
            ->with('success', 'User berhasil ditambahkan!');
    }

    public function show(User $user)
    {
        // Prevent viewing admin users detail
        if ($user->isAdmin()) {
            return redirect()->route('admin.users.index')
                ->with('error', 'Tidak dapat melihat detail user admin!');
        }

        // Get user's course/module progress
        // Sesuaikan dengan nama relasi yang ada di User model
        $userModules = $user->courses()
            ->withPivot('is_completed', 'completed_at', 'progress')
            ->orderBy('created_at', 'asc')
            ->get()
            ->map(function ($course) {
                return [
                    'id' => $course->id,
                    'title' => $course->title ?? $course->name,
                    'is_completed' => $course->pivot->is_completed ?? false,
                    'completed_at' => $course->pivot->completed_at ?? null,
                    'progress' => $course->pivot->progress ?? 0,
                ];
            });

        // Count completed modules
        $completedModules = $userModules->where('is_completed', true)->count();
        $totalModules = $userModules->count();

        // Add progress data to user
        $user->completed_modules = $completedModules;
        $user->total_modules = $totalModules;

        return Inertia::render('Admin/Users/Detail', [
            'user' => $user,
            'userModules' => $userModules
        ]);
    }

    public function edit(User $user)
    {
        // Prevent editing admin users
        if ($user->isAdmin()) {
            return redirect()->route('admin.users.index')
                ->with('error', 'Tidak dapat mengedit user admin!');
        }

        return Inertia::render('Admin/Users/Edit', [
            'user' => $user
        ]);
    }

    public function update(Request $request, User $user)
    {
        // Prevent editing admin users
        if ($user->isAdmin()) {
            return redirect()->route('admin.users.index')
                ->with('error', 'Tidak dapat mengedit user admin!');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'username' => ['required', 'string', 'max:255', Rule::unique('users')->ignore($user->id)],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'password' => 'nullable|string|min:8|confirmed',
            'phone_number' => 'nullable|string|max:20',
            'birth_date' => 'nullable|date',
            'location' => 'nullable|string|max:255',
            'bio' => 'nullable|string|max:500',
        ]);

        $updateData = [
            'name' => $validated['name'],
            'username' => $validated['username'],
            'email' => $validated['email'],
            'phone_number' => $validated['phone_number'] ?? null,
            'birth_date' => $validated['birth_date'] ?? null,
            'location' => $validated['location'] ?? null,
            'bio' => $validated['bio'] ?? null,
        ];

        // Only update password if provided
        if (!empty($validated['password'])) {
            $updateData['password'] = Hash::make($validated['password']);
        }

        $user->update($updateData);

        return redirect()->route('admin.users.index')
            ->with('success', 'User berhasil diupdate!');
    }

    public function destroy(User $user)
    {
        // Prevent deleting admin users
        if ($user->isAdmin()) {
            return redirect()->route('admin.users.index')
                ->with('error', 'Tidak dapat menghapus user admin!');
        }

        $user->delete();

        return redirect()->route('admin.users.index')
            ->with('success', 'User berhasil dihapus!');
    }
}