<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssetLibrary extends Model
{
    use HasFactory;

    protected $table = 'asset_library';

    protected $fillable = [
        'user_id',
        'name',
        'type',
        'asset_data',
        'asset_url',
        'thumbnail_url',
        'width',
        'height',
    ];

    protected $casts = [
        'asset_data' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
