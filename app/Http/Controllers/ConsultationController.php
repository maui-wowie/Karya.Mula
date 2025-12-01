<?php

namespace App\Http\Controllers;

use App\Models\MentorConsultation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ConsultationController extends Controller
{
    /**
     * Display user's consultation schedule
     */
    public function index()
    {
        $consultations = MentorConsultation::where('user_id', Auth::id())
            ->with('mentor')
            ->orderBy('scheduled_at', 'desc')
            ->get();

        return Inertia::render('Mentor/ConsultationSchedule', [
            'consultations' => $consultations,
        ]);
    }

    /**
     * Cancel a consultation
     */
    public function cancel($id)
    {
        $consultation = MentorConsultation::where('user_id', Auth::id())
            ->findOrFail($id);

        $consultation->update(['status' => 'cancelled']);

        return redirect()->back()->with('success', 'Konsultasi berhasil dibatalkan!');
    }

    /**
     * Add or update notes for a consultation
     */
    public function addNotes(Request $request, $id)
    {
        $validated = $request->validate([
            'notes' => 'required|string',
        ]);

        $consultation = MentorConsultation::where('user_id', Auth::id())
            ->findOrFail($id);

        $consultation->update(['notes' => $validated['notes']]);

        return redirect()->back()->with('success', 'Catatan berhasil disimpan!');
    }
}
