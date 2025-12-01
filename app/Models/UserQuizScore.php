<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserQuizScore extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'course_id',
        'score',
        'correct_answers',
        'total_questions',
        'is_passed',
        'completed_at'
    ];

    protected $casts = [
        'is_passed' => 'boolean',
        'score' => 'decimal:2',
        'completed_at' => 'datetime'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}