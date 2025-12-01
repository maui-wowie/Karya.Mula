<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MentorConsultation extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'mentor_id',
        'scheduled_at',
        'duration_minutes',
        'status',
        'notes',
        'meeting_link',
    ];

    protected $casts = [
        'scheduled_at' => 'datetime',
    ];

    /**
     * Get the user who booked this consultation
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the mentor for this consultation
     */
    public function mentor()
    {
        return $this->belongsTo(Mentor::class);
    }
}
