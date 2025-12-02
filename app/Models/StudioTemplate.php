<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudioTemplate extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'icon',
        'color',
        'canvas_data',
        'thumbnail_url',
        'order',
        'is_active',
    ];

    protected $casts = [
        'canvas_data' => 'array',
        'is_active' => 'boolean',
    ];
}
