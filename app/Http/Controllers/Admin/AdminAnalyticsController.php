<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminAnalyticsController extends Controller
{
    public function index()
    {
        // Total Users (Role = user)
        $totalUsers = User::where('role', 'user')->count();

        // Active Courses (All courses for now)
        $activeCourses = Course::count();

        // Global Revenue (Hardcoded as per design/request)
        $globalRevenue = 4215000000;

        // Top Courses by Students
        $topCourses = Course::withCount('users')
            ->orderBy('users_count', 'desc')
            ->take(5)
            ->get()
            ->map(function ($course) {
                return [
                    'id' => $course->id,
                    'title' => $course->title,
                    'students_count' => $course->users_count,
                    'thumbnail_url' => $course->thumbnail_url,
                ];
            });

        // Recent Users
        $recentUsers = User::where('role', 'user')
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'joined_at' => $user->created_at->diffForHumans(),
                    'avatar_initial' => strtoupper(substr($user->name, 0, 1)),
                ];
            });

        return Inertia::render('Admin/Analytics', [
            'title' => 'Analitik Platform',
            'stats' => [
                'total_users' => $totalUsers,
                'active_courses' => $activeCourses,
                'global_revenue' => $globalRevenue,
            ],
            'topCourses' => $topCourses,
            'recentUsers' => $recentUsers,
        ]);
    }
}
