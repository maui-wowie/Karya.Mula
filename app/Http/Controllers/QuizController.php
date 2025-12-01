<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Quiz;
use App\Models\UserQuizAnswer;
use App\Models\UserQuizScore;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class QuizController extends Controller
{
    /**
     * Get quiz questions for a course
     */
    public function getQuiz($courseId)
    {
        $course = Course::findOrFail($courseId);

        $quizzes = Quiz::where('course_id', $course->id)
            ->with('options')
            ->orderBy('order')
            ->get()
            ->map(function ($quiz) {
                return [
                    'id' => $quiz->id,
                    'question' => $quiz->question,
                    'options' => $quiz->options->map(function ($option) {
                        return [
                            'key' => $option->option_key,
                            'text' => $option->option_text
                        ];
                    })
                ];
            });

        // Get user's previous answers if exists
        $userAnswers = UserQuizAnswer::where('user_id', Auth::id())
            ->where('course_id', $course->id)
            ->get()
            ->keyBy('quiz_id');

        // Get user's score if exists
        $userScore = UserQuizScore::where('user_id', Auth::id())
            ->where('course_id', $course->id)
            ->first();

        return response()->json([
            'quizzes' => $quizzes,
            'userAnswers' => $userAnswers,
            'userScore' => $userScore,
            'course' => [
                'id' => $course->id,
                'title' => $course->title
            ]
        ]);
    }

    /**
     * Submit all answers and calculate score
     */
    public function submitQuiz(Request $request, $courseId)
    {
        $course = Course::findOrFail($courseId);

        $request->validate([
            'answers' => 'required|array',
            'answers.*.quiz_id' => 'required|exists:quizzes,id',
            'answers.*.selected_answer' => 'required|in:A,B,C,D,E'
        ]);

        DB::beginTransaction();

        try {
            $totalQuestions = count($request->answers);
            $correctAnswers = 0;

            // Process each answer
            foreach ($request->answers as $answer) {
                $quiz = Quiz::findOrFail($answer['quiz_id']);
                $isCorrect = $quiz->correct_answer === $answer['selected_answer'];

                if ($isCorrect) {
                    $correctAnswers++;
                }

                // Save user's answer
                UserQuizAnswer::updateOrCreate(
                    [
                        'user_id' => Auth::id(),
                        'quiz_id' => $answer['quiz_id']
                    ],
                    [
                        'course_id' => $course->id,
                        'selected_answer' => $answer['selected_answer'],
                        'is_correct' => $isCorrect
                    ]
                );
            }

            // Calculate score
            $score = ($correctAnswers / $totalQuestions) * 100;
            $isPassed = $score >= 60; // Passing score 60%

            // Save quiz score
            UserQuizScore::updateOrCreate(
                [
                    'user_id' => Auth::id(),
                    'course_id' => $course->id
                ],
                [
                    'score' => $score,
                    'correct_answers' => $correctAnswers,
                    'total_questions' => $totalQuestions,
                    'is_passed' => $isPassed,
                    'completed_at' => now()
                ]
            );

            // Update course progress if passed
            if ($isPassed) {
                $user = Auth::user();
                $userCourse = $user->courses()->find($course->id);
                if ($userCourse) {
                    $currentProgress = $userCourse->pivot->progress ?? 0;
                    $user->courses()->updateExistingPivot($course->id, [
                        'progress' => max($currentProgress, 33)
                    ]);
                }
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'score' => $score,
                'correct_answers' => $correctAnswers,
                'total_questions' => $totalQuestions,
                'is_passed' => $isPassed,
                'message' => $isPassed ? 'Selamat! Anda lulus quiz!' : 'Anda belum lulus. Silakan coba lagi.'
            ]);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan saat menyimpan jawaban: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Reset quiz (allow retake)
     */
    public function resetQuiz($courseId)
    {
        $course = Course::findOrFail($courseId);

        DB::beginTransaction();

        try {
            // Delete user's answers
            UserQuizAnswer::where('user_id', Auth::id())
                ->where('course_id', $course->id)
                ->delete();

            // Delete user's score
            UserQuizScore::where('user_id', Auth::id())
                ->where('course_id', $course->id)
                ->delete();

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Quiz berhasil direset. Anda bisa mengulang quiz.'
            ]);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan saat mereset quiz: ' . $e->getMessage()
            ], 500);
        }
    }
}