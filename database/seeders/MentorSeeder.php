<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Mentor;
use App\Models\MentorTestimonial;
use App\Models\User;

class MentorSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        $mentors = [
            [
                'name' => 'Leonardo Nugraha',
                'category' => 'Pengembangan Produk',
                'rating' => 4.9,
                'price_per_session' => 100000,
                'duration_minutes' => 60,
                'availability' => ['Senin', 'Jumat'],
                'profile_image' => null,
                'bio' => 'Leonardo adalah seorang mentor berpengalaman dalam pengembangan produk digital, membantu UMKM dan startup menemukan strategi inovasi.',
                'expertise' => 'Pengembangan Produk',
            ],
            [
                'name' => 'Bunga Anggareni',
                'category' => 'Pengembangan Produk',
                'rating' => 4.9,
                'price_per_session' => 100000,
                'duration_minutes' => 60,
                'availability' => ['Selasa', 'Kamis'],
                'profile_image' => null,
                'bio' => 'Bunga memiliki pengalaman luas dalam product management dan user experience design.',
                'expertise' => 'Pengembangan Produk',
            ],
            [
                'name' => 'Ngatiman Djojonegoro',
                'category' => 'Pengembangan Produk',
                'rating' => 4.9,
                'price_per_session' => 100000,
                'duration_minutes' => 60,
                'availability' => ['Senin'],
                'profile_image' => null,
                'bio' => 'Ngatiman adalah expert dalam product development dan business strategy.',
                'expertise' => 'Pengembangan Produk',
            ],
            [
                'name' => 'Sigit Nugrahadi',
                'category' => 'Pengembangan Produk',
                'rating' => 4.9,
                'price_per_session' => 100000,
                'duration_minutes' => 60,
                'availability' => ['Rabu'],
                'profile_image' => null,
                'bio' => 'Sigit membantu startup dan UMKM dalam mengembangkan produk yang market-fit.',
                'expertise' => 'Pengembangan Produk',
            ],
            [
                'name' => 'Padriani Putri',
                'category' => 'Pengembangan Produk',
                'rating' => 4.9,
                'price_per_session' => 100000,
                'duration_minutes' => 60,
                'availability' => ['Jumat', 'Minggu'],
                'profile_image' => null,
                'bio' => 'Padriani fokus pada product innovation dan digital transformation.',
                'expertise' => 'Pengembangan Produk',
            ],
            [
                'name' => 'Umi Salsabila',
                'category' => 'Pengembangan Produk',
                'rating' => 4.9,
                'price_per_session' => 100000,
                'duration_minutes' => 60,
                'availability' => ['Selasa', 'Kamis'],
                'profile_image' => null,
                'bio' => 'Umi adalah product designer dengan pengalaman di berbagai startup teknologi.',
                'expertise' => 'Pengembangan Produk',
            ],
            [
                'name' => 'Ahmad Rizki',
                'category' => 'Bisnis & Pemasaran',
                'rating' => 4.8,
                'price_per_session' => 150000,
                'duration_minutes' => 60,
                'availability' => ['Senin', 'Rabu', 'Jumat'],
                'profile_image' => null,
                'bio' => 'Ahmad adalah digital marketing expert yang membantu UMKM meningkatkan penjualan online.',
                'expertise' => 'Digital Marketing',
            ],
            [
                'name' => 'Siti Nurhaliza',
                'category' => 'Bisnis & Pemasaran',
                'rating' => 4.7,
                'price_per_session' => 120000,
                'duration_minutes' => 60,
                'availability' => ['Selasa', 'Kamis'],
                'profile_image' => null,
                'bio' => 'Siti spesialis dalam social media marketing dan content strategy.',
                'expertise' => 'Social Media Marketing',
            ],
        ];

        foreach ($mentors as $mentorData) {
            $mentor = Mentor::create($mentorData);

            // Add sample testimonials
            $users = User::take(2)->get();
            foreach ($users as $user) {
                MentorTestimonial::create([
                    'mentor_id' => $mentor->id,
                    'user_id' => $user->id,
                    'rating' => 5,
                    'comment' => 'Mentornya sangat jelas dan membantu saya menemukan solusi praktis.',
                ]);
            }
        }
    }
}
