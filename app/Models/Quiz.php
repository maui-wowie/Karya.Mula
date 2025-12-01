<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    use HasFactory;

    protected $fillable = [
        'course_id',
        'question',
        'correct_answer',
        'order'
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function options()
    {
        return $this->hasMany(QuizOption::class)->orderBy('option_key');
    }

    public function userAnswers()
    {
        return $this->hasMany(UserQuizAnswer::class);
    }
}