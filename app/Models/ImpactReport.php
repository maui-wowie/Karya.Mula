<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImpactReport extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'sdg_goal_id',
        'target_number',
        'short_description',
        'step_description',
        'additional_notes',
        'proof_link',
        'status',
        'submitted_at',
    ];

    protected $casts = [
        'submitted_at' => 'datetime',
    ];

    /**
     * Get the user who created this report
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the SDG goal for this report
     */
    public function sdgGoal()
    {
        return $this->belongsTo(SdgGoal::class);
    }
}
