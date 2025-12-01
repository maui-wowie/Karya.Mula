<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\TaskSubmissionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Course;

// ROOT - REDIRECT KE DASHBOARD (TANPA AUTH)
Route::get('/', function () {
    return redirect('/dashboard');
});

// DASHBOARD ROUTE - BISA DIAKSES TANPA LOGIN
Route::get('/dashboard', function () {
    // Jika user sudah login dan admin, redirect ke admin dashboard
    if (Auth::check() && Auth::user()->isAdmin()) {
        return redirect()->route('admin.dashboard');
    }

    // Jika user login
    if (Auth::check()) {
        $user = Auth::user();

        // Ambil kursus yang sedang diikuti user
        $enrolledCourses = $user->courses()
            ->withPivot(['progress', 'is_completed', 'completed_at'])
            ->get()
            ->map(function ($course) {
                return [
                    'id' => $course->id,
                    'title' => $course->title,
                    'description' => $course->description,
                    'thumbnail_url' => $course->thumbnail_url,
                    'mentor_comment' => $course->mentor_comment,
                    'progress' => $course->pivot->progress ?? 0,
                    'is_completed' => $course->pivot->is_completed ?? false,
                    'completed_at' => $course->pivot->completed_at,
                ];
            });

        // Ambil kursus yang direkomendasikan (belum diikuti)
        $enrolledIds = $user->courses()->pluck('courses.id')->toArray();
        $recommendedCourses = Course::whereNotIn('id', $enrolledIds)
            ->take(3)
            ->get();

        return Inertia::render('Dashboard', [
            'enrolledCourses' => $enrolledCourses,
            'recommendedCourses' => $recommendedCourses,
        ]);
    }

    // Jika user belum login, tampilkan dashboard guest
    $recommendedCourses = Course::take(3)->get();

    return Inertia::render('Dashboard', [
        'enrolledCourses' => [],
        'recommendedCourses' => $recommendedCourses,
    ]);
})->name('dashboard');

// KATALOG BELAJAR - BISA DIAKSES TANPA LOGIN
Route::get('/katalog-belajar', function () {
    $courses = Course::all();
    return Inertia::render('Course/KatalogIndex', [
        'auth' => ['user' => Auth::user()],
        'courses' => $courses,
    ]);
})->name('courses.index');

Route::middleware('auth')->group(function () {

    // ROUTE DETAIL VIDEO (VIDEO TAB) - DINAMIS DARI DATABASE
    Route::get('/course/{id}/video', function ($id) {
        $course = Course::findOrFail($id);
        $nextCourse = Course::where('id', '>', $id)->orderBy('id', 'asc')->first();

        return Inertia::render('Course/VideoDetail', [
            'course' => $course,
            'nextCourse' => $nextCourse,
            'activeTab' => 'video'
        ]);
    })->name('course.video');

    Route::get('/course/{id}/quiz', function ($id) {
        $course = Course::findOrFail($id);
        $nextCourse = Course::where('id', '>', $id)->orderBy('id', 'asc')->first();

        return Inertia::render('Course/VideoDetail', [
            'course' => $course,
            'nextCourse' => $nextCourse,
            'activeTab' => 'quiz'
        ]);
    })->name('course.quiz');

    // QUIZ API ROUTES - Ubah {courseId} jadi {course}
    Route::prefix('api/course/{courseId}/quiz')->group(function () {
        Route::get('/', [QuizController::class, 'getQuiz'])->name('api.quiz.get');
        Route::post('/submit', [QuizController::class, 'submitQuiz'])->name('api.quiz.submit');
        Route::post('/reset', [QuizController::class, 'resetQuiz'])->name('api.quiz.reset');
    });
    // ROUTE TASK TAB
    Route::get('/course/{id}/task', function ($id) {
        $course = Course::findOrFail($id);
        $nextCourse = Course::where('id', '>', $id)->orderBy('id', 'asc')->first();

        return Inertia::render('Course/VideoDetail', [
            'course' => $course,
            'nextCourse' => $nextCourse,
            'activeTab' => 'task'
        ]);
    })->name('course.task');

    // TASK SUBMISSION API ROUTES - Tambahkan ini
    Route::prefix('api/course/{courseId}/task')->group(function () {
        Route::get('/', [TaskSubmissionController::class, 'getSubmission'])->name('api.task.get');
        Route::post('/submit', [TaskSubmissionController::class, 'submitTask'])->name('api.task.submit');
        Route::post('/delete', [TaskSubmissionController::class, 'deleteSubmission'])->name('api.task.delete');
        Route::get('/download', [TaskSubmissionController::class, 'downloadSubmission'])->name('api.task.download');
    });

    // ROUTE PLACEHOLDER
    Route::get('/penilaian-sertifikasi', function () {
        return Inertia::render('Placeholder', ['title' => 'Penilaian & Sertifikasi']);
    })->name('assessment.index');

    Route::get('/konsultasi-mentor', function () {
        return Inertia::render('Placeholder', ['title' => 'Konsultasi Mentor']);
    })->name('consult.index');

    // Studio Kreasi Routes
    Route::get('/studio-kreasi', [App\Http\Controllers\StudioController::class, 'index'])->name('studio.index');
    Route::get('/studio-kreasi/create', [App\Http\Controllers\StudioController::class, 'create'])->name('studio.create');
    Route::get('/studio-kreasi/{design}/edit', [App\Http\Controllers\StudioController::class, 'edit'])->name('studio.edit');
    Route::post('/studio-kreasi', [App\Http\Controllers\StudioController::class, 'store'])->name('studio.store');
    Route::put('/studio-kreasi/{design}', [App\Http\Controllers\StudioController::class, 'update'])->name('studio.update');
    Route::delete('/studio-kreasi/{design}', [App\Http\Controllers\StudioController::class, 'destroy'])->name('studio.destroy');

    Route::get('/toko-saya', function () {
        return Inertia::render('Placeholder', ['title' => 'Toko Saya']);
    })->name('shop.index');

    Route::get('/pendanaan-mikro', function () {
        return Inertia::render('Placeholder', ['title' => 'Pendanaan Mikro']);
    })->name('finance.index');

    Route::get('/analitik-pasar', function () {
        return Inertia::render('Placeholder', ['title' => 'Analitik Pasar']);
    })->name('analytics.index');

    // IMPACT REPORTING ROUTES
    Route::get('/pelaporan-dampak', [App\Http\Controllers\ImpactReportController::class, 'index'])->name('impact-reports.index');
    Route::get('/pelaporan-dampak/create/{sdgGoalId}', [App\Http\Controllers\ImpactReportController::class, 'create'])->name('impact-reports.create');
    Route::post('/pelaporan-dampak', [App\Http\Controllers\ImpactReportController::class, 'store'])->name('impact-reports.store');
    Route::get('/pelaporan-dampak/koleksi-lencana', [App\Http\Controllers\ImpactReportController::class, 'myReports'])->name('impact-reports.badges');

    // ROUTE PROFILE
    Route::get('/profile-me', [ProfileController::class, 'edit'])->name('profile.me');
    Route::patch('/profile-update', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile-delete', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// ADMIN ROUTES
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {

    // Dashboard dengan Controller
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');

    // Manage Courses - Resource Route
    Route::resource('courses', \App\Http\Controllers\Admin\AdminCourseController::class);
    Route::post('/courses/{course}/quizzes', [\App\Http\Controllers\Admin\AdminQuizController::class, 'store'])->name('courses.quizzes.store');

    // CRUD Users - Resource Route
    Route::resource('users', AdminUserController::class);


    // Analitik Platform
    Route::get('/analytics', [\App\Http\Controllers\Admin\AdminAnalyticsController::class, 'index'])->name('analytics');

});

// MENTOR CONSULTATION ROUTES
Route::middleware('auth')->group(function () {
    // Mentor routes
    Route::get('/konsultasi-mentor', [App\Http\Controllers\MentorController::class, 'index'])->name('mentors.index');
    Route::get('/konsultasi-mentor/{id}', [App\Http\Controllers\MentorController::class, 'show'])->name('mentors.show');
    Route::post('/konsultasi-mentor/{id}/book', [App\Http\Controllers\MentorController::class, 'book'])->name('mentors.book');
    
    // Consultation schedule routes
    Route::get('/jadwal-konsultasi', [App\Http\Controllers\ConsultationController::class, 'index'])->name('consultations.index');
    Route::post('/jadwal-konsultasi/{id}/cancel', [App\Http\Controllers\ConsultationController::class, 'cancel'])->name('consultations.cancel');
    Route::post('/jadwal-konsultasi/{id}/notes', [App\Http\Controllers\ConsultationController::class, 'addNotes'])->name('consultations.notes');
});

require __DIR__ . '/auth.php';