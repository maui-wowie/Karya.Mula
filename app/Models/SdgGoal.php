<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SdgGoal extends Model
{
    use HasFactory;

    protected $fillable = [
        'goal_number',
        'title',
        'description',
        'color',
        'icon_url',
    ];

    /**
     * Get all impact reports for this SDG goal
     */
    public function impactReports()
    {
        return $this->hasMany(ImpactReport::class);
    }
}
