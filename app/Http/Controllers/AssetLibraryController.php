<?php

namespace App\Http\Controllers;

use App\Models\AssetLibrary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AssetLibraryController extends Controller
{
    public function index()
    {
        $assets = AssetLibrary::where('user_id', Auth::id())
            ->latest()
            ->get();

        return Inertia::render('AssetLibrary/Index', [
            'assets' => $assets,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'nullable|string',
            'asset_data' => 'required|array',
            'asset_url' => 'nullable|string',
            'thumbnail_url' => 'nullable|string',
            'width' => 'nullable|integer',
            'height' => 'nullable|integer',
        ]);

        $asset = AssetLibrary::create([
            'user_id' => Auth::id(),
            'name' => $validated['name'],
            'type' => $validated['type'] ?? 'design',
            'asset_data' => $validated['asset_data'],
            'asset_url' => $validated['asset_url'] ?? null,
            'thumbnail_url' => $validated['thumbnail_url'] ?? null,
            'width' => $validated['width'] ?? null,
            'height' => $validated['height'] ?? null,
        ]);

        return redirect()->back()->with('success', 'Asset berhasil disimpan ke perpustakaan!');
    }

    public function show(AssetLibrary $asset)
    {
        if ($asset->user_id !== Auth::id()) {
            abort(403);
        }

        return response()->json($asset);
    }

    public function destroy(AssetLibrary $asset)
    {
        if ($asset->user_id !== Auth::id()) {
            abort(403);
        }

        // Delete thumbnail if exists
        if ($asset->thumbnail_url && Storage::exists($asset->thumbnail_url)) {
            Storage::delete($asset->thumbnail_url);
        }

        $asset->delete();

        return redirect()->back()->with('success', 'Asset berhasil dihapus!');
    }
}
