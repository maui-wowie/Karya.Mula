<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\TaskSubmission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class TaskSubmissionController extends Controller
{
    /**
     * Get submission status for a course
     */
    public function getSubmission($courseId)
    {
        try {
            $course = Course::findOrFail($courseId);

            $submission = TaskSubmission::where('user_id', Auth::id())
                ->where('course_id', $courseId)
                ->first();

            return response()->json([
                'success' => true,
                'submission' => $submission,
                'course' => [
                    'id' => $course->id,
                    'title' => $course->title,
                    'task_description' => $course->task_description
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching submission: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Submit task file
     */
    public function submitTask(Request $request, $courseId)
    {
        $request->validate([
            'file' => 'required|file|max:10240', // max 10MB
            'notes' => 'nullable|string|max:1000'
        ]);

        DB::beginTransaction();

        try {
            $course = Course::findOrFail($courseId);
            $file = $request->file('file');

            // Generate unique filename
            $fileName = time() . '_' . Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) . '.' . $file->getClientOriginalExtension();

            // Store file
            $filePath = $file->storeAs('task-submissions/' . Auth::id(), $fileName, 'public');

            // Create or update submission
            $submission = TaskSubmission::updateOrCreate(
                [
                    'user_id' => Auth::id(),
                    'course_id' => $courseId
                ],
                [
                    'file_name' => $file->getClientOriginalName(),
                    'file_path' => $filePath,
                    'file_type' => $file->getClientMimeType(),
                    'file_size' => $file->getSize(),
                    'notes' => $request->notes,
                    'status' => 'pending',
                    'submitted_at' => now()
                ]
            );

            // Update course progress
            $user = Auth::user();
            $userCourse = $user->courses()->find($courseId);
            if ($userCourse) {
                $currentProgress = $userCourse->pivot->progress ?? 0;
                $user->courses()->updateExistingPivot($courseId, [
                    'progress' => max($currentProgress, 66) // Task = 66% progress
                ]);
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Task submitted successfully!',
                'submission' => $submission
            ]);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Failed to submit task: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete submission
     */
    public function deleteSubmission($courseId)
    {
        DB::beginTransaction();

        try {
            $submission = TaskSubmission::where('user_id', Auth::id())
                ->where('course_id', $courseId)
                ->first();

            if (!$submission) {
                return response()->json([
                    'success' => false,
                    'message' => 'Submission not found'
                ], 404);
            }

            // Delete file from storage
            if (Storage::disk('public')->exists($submission->file_path)) {
                Storage::disk('public')->delete($submission->file_path);
            }

            // Delete submission record
            $submission->delete();

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Submission deleted successfully'
            ]);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Failed to delete submission: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Download submission file
     */
    public function downloadSubmission($courseId)
    {
        try {
            $submission = TaskSubmission::where('user_id', Auth::id())
                ->where('course_id', $courseId)
                ->firstOrFail();

            $filePath = storage_path('app/public/' . $submission->file_path);

            if (!file_exists($filePath)) {
                return response()->json([
                    'success' => false,
                    'message' => 'File not found'
                ], 404);
            }

            return response()->download($filePath, $submission->file_name);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to download file: ' . $e->getMessage()
            ], 500);
        }
    }
}