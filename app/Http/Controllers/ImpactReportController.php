<?php

namespace App\Http\Controllers;

use App\Models\SdgGoal;
use App\Models\ImpactReport;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ImpactReportController extends Controller
{
    /**
     * Display a listing of all SDG goals
     */
    public function index()
    {
        $user = Auth::user();
        $sdgGoals = SdgGoal::orderBy('goal_number')->get();
        
        // Get user's submitted reports
        $userReports = ImpactReport::where('user_id', $user->id)
            ->where('status', 'submitted')
            ->get();
        
        // Calculate progress for each SDG goal
        $sdgGoals = $sdgGoals->map(function ($goal) use ($userReports) {
            $reportsForGoal = $userReports->where('sdg_goal_id', $goal->id);
            
            // Count unique targets reported for this goal
            $uniqueTargets = $reportsForGoal->pluck('target_number')->unique()->count();
            
            // Count total badges (reports) for this goal
            $badgeCount = $reportsForGoal->count();
            
            $goal->targets_completed = $uniqueTargets;
            $goal->badge_count = $badgeCount;
            
            return $goal;
        });
        
        return Inertia::render('ImpactReporting/SdgList', [
            'sdgGoals' => $sdgGoals,
        ]);
    }

    /**
     * Show the form for creating a new impact report
     */
    public function create($sdgGoalId)
    {
        $sdgGoal = SdgGoal::findOrFail($sdgGoalId);
        
        return Inertia::render('ImpactReporting/ReportForm', [
            'sdgGoal' => $sdgGoal,
        ]);
    }

    /**
     * Store a newly created impact report
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'sdg_goal_id' => 'required|exists:sdg_goals,id',
            'target_number' => 'required|integer|min:1|max:8',
            'short_description' => 'required|string|max:500',
            'step_description' => 'required|string',
            'additional_notes' => 'nullable|string',
            'proof_link' => 'nullable|url',
            'action' => 'required|in:save,submit',
        ]);

        $status = $validated['action'] === 'submit' ? 'submitted' : 'draft';
        $submittedAt = $validated['action'] === 'submit' ? now() : null;

        $report = ImpactReport::create([
            'user_id' => Auth::id(),
            'sdg_goal_id' => $validated['sdg_goal_id'],
            'target_number' => $validated['target_number'],
            'short_description' => $validated['short_description'],
            'step_description' => $validated['step_description'],
            'additional_notes' => $validated['additional_notes'],
            'proof_link' => $validated['proof_link'],
            'status' => $status,
            'submitted_at' => $submittedAt,
        ]);

        if ($validated['action'] === 'submit') {
            return redirect()->route('impact-reports.badges')->with('success', 'Laporan dampak berhasil diajukan!');
        }

        return redirect()->route('impact-reports.index')->with('success', 'Laporan dampak berhasil disimpan sebagai draft!');
    }

    /**
     * Display user's badge collection
     */
    public function myReports()
    {
        $user = Auth::user();
        
        // Get all submitted reports with SDG goal information
        $reports = ImpactReport::where('user_id', $user->id)
            ->where('status', 'submitted')
            ->with('sdgGoal')
            ->orderBy('submitted_at', 'desc')
            ->get();

        // Calculate unique targets reported (goal_id + target_number combination)
        $uniqueTargets = $reports->map(function ($report) {
            return $report->sdg_goal_id . '-' . $report->target_number;
        })->unique()->count();

        // Get summary of which SDG goals have been reported
        $reportedGoals = $reports->pluck('sdg_goal_id')->unique()->values();
        $allGoals = SdgGoal::orderBy('goal_number')->get();

        // Calculate progress for each SDG (how many unique targets reported per SDG)
        $sdgProgress = [];
        foreach ($allGoals as $goal) {
            $targetsReported = $reports
                ->where('sdg_goal_id', $goal->id)
                ->pluck('target_number')
                ->unique()
                ->count();
            
            if ($targetsReported > 0) {
                $sdgProgress[] = [
                    'goalNumber' => $goal->goal_number,
                    'current' => $targetsReported,
                    'total' => 8, // Assuming 8 targets per SDG
                    'color' => $goal->color,
                ];
            }
        }

        // Sort by most progress and take top 3
        usort($sdgProgress, function($a, $b) {
            return $b['current'] <=> $a['current'];
        });
        $sdgProgress = array_slice($sdgProgress, 0, 3);

        return Inertia::render('ImpactReporting/BadgeCollection', [
            'reports' => $reports,
            'uniqueTargets' => $uniqueTargets,
            'maxTargets' => 136, // 17 SDGs × 8 targets
            'reportedGoals' => $reportedGoals,
            'allGoals' => $allGoals,
            'sdgProgress' => $sdgProgress,
        ]);
    }
}
