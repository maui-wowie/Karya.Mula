<?php

namespace App\Http\Controllers;

use App\Models\Design;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class StudioController extends Controller
{
    public function index()
    {
        $designs = Design::where('user_id', Auth::id())
            ->latest()
            ->get();

        return Inertia::render('Studio/Index', [
            'designs' => $designs,
        ]);
    }

    public function create()
    {
        return Inertia::render('Studio/Editor');
    }

    public function edit(Design $design)
    {
        if ($design->user_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('Studio/Editor', [
            'design' => $design,
        ]);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'type' => 'required|string',
                'canvas_data' => 'nullable|json',
                'thumbnail_url' => 'nullable|string',
            ]);

            $design = Design::create([
                'user_id' => Auth::id(),
                'title' => $validated['title'],
                'type' => $validated['type'],
                'canvas_data' => json_decode($validated['canvas_data'], true),
                'thumbnail_url' => $validated['thumbnail_url'],
            ]);

            return redirect()->route('studio.edit', $design->id)->with('success', 'Desain berhasil dibuat!');
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Studio Store Error: ' . $e->getMessage());
            return back()->withErrors(['error' => 'Gagal menyimpan desain. Silakan coba lagi.']);
        }
    }

    public function update(Request $request, Design $design)
    {
        if ($design->user_id !== Auth::id()) {
            abort(403);
        }

        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'canvas_data' => 'nullable|json',
                'thumbnail_url' => 'nullable|string',
            ]);

            $design->update([
                'title' => $validated['title'],
                'canvas_data' => json_decode($validated['canvas_data'], true),
                'thumbnail_url' => $validated['thumbnail_url'],
            ]);

            return back()->with('success', 'Desain berhasil disimpan!');
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Studio Update Error: ' . $e->getMessage());
            return back()->withErrors(['error' => 'Gagal menyimpan perubahan. Silakan coba lagi.']);
        }
    }

    public function destroy(Design $design)
    {
        if ($design->user_id !== Auth::id()) {
            abort(403);
        }

        $design->delete();

        return redirect()->route('studio.index')->with('success', 'Desain berhasil dihapus!');
    }
}
