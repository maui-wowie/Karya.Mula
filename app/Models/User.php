<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'username',
        'phone_number',
        'birth_date',
        'location',
        'bio',
    ];

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    /**
     * RelasiMany-to-Many dengan Course
     * Sesuaikan nama tabel pivot dengan database Anda
     * Contoh: course_user, user_courses, enrollments, dll
     */
    public function courses()
    {
        return $this->belongsToMany(Course::class, 'course_user') // Ganti 'course_user' dengan nama tabel pivot Anda
            ->withPivot('is_completed', 'completed_at', 'progress')
            ->withTimestamps();
    }

    /**
     * Get all impact reports for this user
     */
    public function impactReports()
    {
        return $this->hasMany(ImpactReport::class);
    }


    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'birth_date' => 'date',
    ];
}