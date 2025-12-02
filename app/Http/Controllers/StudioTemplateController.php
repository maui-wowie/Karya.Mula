<?php

namespace App\Http\Controllers;

use App\Models\StudioTemplate;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudioTemplateController extends Controller
{
    public function index()
    {
        $templates = StudioTemplate::where('is_active', true)
            ->orderBy('order')
            ->get();

        return response()->json($templates);
    }

    public function show(StudioTemplate $template)
    {
        return response()->json($template);
    }
}
