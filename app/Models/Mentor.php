<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mentor extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'category',
        'rating',
        'price_per_session',
        'duration_minutes',
        'availability',
        'profile_image',
        'bio',
        'expertise',
    ];

    protected $casts = [
        'availability' => 'array',
        'rating' => 'decimal:1',
    ];

    /**
     * Get consultations for this mentor
     */
    public function consultations()
    {
        return $this->hasMany(MentorConsultation::class);
    }

    /**
     * Get testimonials for this mentor
     */
    public function testimonials()
    {
        return $this->hasMany(MentorTestimonial::class);
    }
}
