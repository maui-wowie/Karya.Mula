<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Course;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Carbon\Carbon;

class AdminDashboardController extends Controller
{
    public function index()
    {
        // Total Users (exclude admin)
        $totalUsers = User::where('role', 'user')->count();

        // Total Courses
        $totalCourses = Course::count();

        // Total Enrollments
        $totalEnrollments = DB::table('course_user')->count();

        // Completed Enrollments
        $completedEnrollments = DB::table('course_user')
            ->where('is_completed', true)
            ->count();

        // In Progress Enrollments (progress > 0 but not completed)
        $inProgressEnrollments = DB::table('course_user')
            ->where('is_completed', false)
            ->where('progress', '>', 0)
            ->count();

        // Not Started Enrollments (progress = 0)
        $notStartedEnrollments = DB::table('course_user')
            ->where('progress', 0)
            ->orWhereNull('progress')
            ->count();

        // Completion Rate
        $completionRate = $totalEnrollments > 0
            ? round(($completedEnrollments / $totalEnrollments) * 100, 1)
            : 0;

        // Recent Activity (last 7 days)
        $recentActivity = [];
        $days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i);
            $dayName = $days[$date->dayOfWeek];

            $activeUsers = DB::table('course_user')
                ->whereDate('updated_at', $date->toDateString())
                ->distinct('user_id')
                ->count('user_id');

            $recentActivity[] = [
                'day' => $dayName,
                'users' => $activeUsers
            ];
        }

        // Top 5 Courses by enrollment
        $topCourses = Course::withCount('users')
            ->orderBy('users_count', 'desc')
            ->take(5)
            ->get()
            ->map(function ($course) {
                return [
                    'name' => $course->title ?? $course->name,
                    'enrollments' => $course->users_count
                ];
            });

        // Recent Users (last 5)
        $recentUsers = User::where('role', 'user')
            ->withCount([
                'courses as total_modules',
                'courses as completed_modules' => function ($query) {
                    $query->where('course_user.is_completed', true);
                }
            ])
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($user) {
                return [
                    'name' => $user->name,
                    'email' => $user->email,
                    'joined' => $user->created_at->format('d M Y'),
                    'completedModules' => $user->completed_modules ?? 0,
                    'totalModules' => $user->total_modules ?? 0
                ];
            });

        $stats = [
            'totalUsers' => $totalUsers,
            'totalCourses' => $totalCourses,
            'totalEnrollments' => $totalEnrollments,
            'completedEnrollments' => $completedEnrollments,
            'inProgressEnrollments' => $inProgressEnrollments,
            'notStartedEnrollments' => $notStartedEnrollments,
            'completionRate' => $completionRate,
            'recentActivity' => $recentActivity,
            'topCourses' => $topCourses,
            'recentUsers' => $recentUsers
        ];

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats
        ]);
    }
}