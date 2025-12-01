<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Design extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'type',
        'canvas_data',
        'thumbnail_url',
    ];

    protected $casts = [
        'canvas_data' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
