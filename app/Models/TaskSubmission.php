<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskSubmission extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'course_id',
        'file_name',
        'file_path',
        'file_type',
        'file_size',
        'notes',
        'status',
        'mentor_feedback',
        'score',
        'submitted_at',
        'reviewed_at'
    ];

    protected $casts = [
        'submitted_at' => 'datetime',
        'reviewed_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function getFileSizeInMBAttribute()
    {
        return round($this->file_size / 1024 / 1024, 2);
    }
}