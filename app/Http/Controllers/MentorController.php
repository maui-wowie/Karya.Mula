<?php

namespace App\Http\Controllers;

use App\Models\Mentor;
use App\Models\MentorConsultation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class MentorController extends Controller
{
    /**
     * Display a listing of mentors with filters
     */
    public function index(Request $request)
    {
        $query = Mentor::query();

        // Filter by category
        if ($request->has('category') && $request->category != '') {
            $query->where('category', $request->category);
        }

        // Filter by price range
        if ($request->has('price_min')) {
            $query->where('price_per_session', '>=', $request->price_min);
        }
        if ($request->has('price_max')) {
            $query->where('price_per_session', '<=', $request->price_max);
        }

        $mentors = $query->orderBy('rating', 'desc')->get();

        // Get unique categories for filter
        $categories = Mentor::select('category')->distinct()->pluck('category');

        return Inertia::render('Mentor/MentorList', [
            'mentors' => $mentors,
            'categories' => $categories,
            'filters' => $request->only(['category', 'price_min', 'price_max']),
        ]);
    }

    /**
     * Show mentor detail with profile and testimonials
     */
    public function show($id)
    {
        $mentor = Mentor::with(['testimonials.user'])->findOrFail($id);

        return Inertia::render('Mentor/MentorDetail', [
            'mentor' => $mentor,
        ]);
    }

    /**
     * Book a consultation session
     */
    public function book(Request $request, $id)
    {
        $validated = $request->validate([
            'scheduled_at' => 'required|date|after:now',
            'notes' => 'nullable|string',
        ]);

        $mentor = Mentor::findOrFail($id);

        $consultation = MentorConsultation::create([
            'user_id' => Auth::id(),
            'mentor_id' => $mentor->id,
            'scheduled_at' => $validated['scheduled_at'],
            'duration_minutes' => $mentor->duration_minutes,
            'status' => 'confirmed',
            'notes' => $validated['notes'] ?? null,
            'meeting_link' => 'https://meet.google.com/' . uniqid(), // Generate meeting link
        ]);

        return redirect()->route('consultations.index')->with('success', 'Konsultasi berhasil dijadwalkan!');
    }
}
