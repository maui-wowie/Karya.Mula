<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Quiz;
use App\Models\QuizOption;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminQuizController extends Controller
{
    public function store(Request $request, Course $course)
    {
        $validated = $request->validate([
            'question' => 'required|string',
            'correct_answer' => 'required|string|in:A,B,C,D',
            'options' => 'required|array|min:4|max:4',
            'options.A' => 'required|string',
            'options.B' => 'required|string',
            'options.C' => 'required|string',
            'options.D' => 'required|string',
        ]);

        DB::transaction(function () use ($course, $validated) {
            // Create Quiz
            $quiz = $course->quizzes()->create([
                'question' => $validated['question'],
                'correct_answer' => $validated['correct_answer'],
                'order' => $course->quizzes()->count() + 1,
            ]);

            // Create Options
            foreach ($validated['options'] as $key => $text) {
                $quiz->options()->create([
                    'option_key' => $key,
                    'option_text' => $text,
                ]);
            }
        });

        return redirect()->back()->with('success', 'Kuis berhasil ditambahkan!');
    }
}
