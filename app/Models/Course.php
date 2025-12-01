<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'thumbnail_url',
        'mentor_comment',
        'youtube_url',
        'quiz_description',
        'task_description'
    ];

    /**
     * Relasi many-to-many dengan User (enrolled courses)
     */
    public function users()
    {
        return $this->belongsToMany(User::class, 'course_user')
            ->withPivot(['is_completed', 'completed_at', 'progress'])
            ->withTimestamps();
    }

    /**
     * Relasi one-to-many dengan Quiz
     */
    public function quizzes()
    {
        return $this->hasMany(Quiz::class)->orderBy('order');
    }

    /**
     * Relasi one-to-many dengan UserQuizScore
     */
    public function quizScores()
    {
        return $this->hasMany(UserQuizScore::class);
    }
}