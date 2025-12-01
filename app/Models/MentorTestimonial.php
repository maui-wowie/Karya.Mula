<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MentorTestimonial extends Model
{
    use HasFactory;

    protected $fillable = [
        'mentor_id',
        'user_id',
        'rating',
        'comment',
    ];

    /**
     * Get the mentor for this testimonial
     */
    public function mentor()
    {
        return $this->belongsTo(Mentor::class);
    }

    /**
     * Get the user who wrote this testimonial
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
