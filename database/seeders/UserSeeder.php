<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('users')->where('role', 'user')->delete(); // Hapus hanya user biasa



        // Regular Users
        $users = [
            [
                'name' => 'Budi Santoso',
                'username' => 'budisantoso',
                'email' => 'budi@example.com',
                'phone_number' => '081234567891',
                'birth_date' => '1995-03-20',
                'location' => 'Bandung, Jawa Barat',
                'bio' => 'Mahasiswa teknologi informasi yang tertarik dengan web development dan design.',
            ],
            [
                'name' => 'Siti Nurhaliza',
                'username' => 'sitinur',
                'email' => 'siti.nur@example.com',
                'phone_number' => '081234567892',
                'birth_date' => '1998-07-10',
                'location' => 'Surabaya, Jawa Timur',
                'bio' => 'Enthusiast dalam dunia digital marketing dan content creation.',
            ],
            [
                'name' => 'Andi Wijaya',
                'username' => 'andiwijaya',
                'email' => 'andi.wijaya@example.com',
                'phone_number' => '081234567893',
                'birth_date' => '1997-11-25',
                'location' => 'Yogyakarta, DIY',
                'bio' => 'Software engineer yang passionate dalam mobile app development.',
            ],
            [
                'name' => 'Rina Kusuma',
                'username' => 'rinakusuma',
                'email' => 'rina.kusuma@example.com',
                'phone_number' => '081234567894',
                'birth_date' => '1996-05-08',
                'location' => 'Semarang, Jawa Tengah',
                'bio' => 'UI/UX Designer dengan fokus pada user experience dan interface design.',
            ],
            [
                'name' => 'Dimas Prakoso',
                'username' => 'dimasprakoso',
                'email' => 'dimas.prakoso@example.com',
                'phone_number' => '081234567895',
                'birth_date' => '1999-09-15',
                'location' => 'Malang, Jawa Timur',
                'bio' => 'Fresh graduate yang sedang belajar full-stack web development.',
            ],
            [
                'name' => 'Maya Sari',
                'username' => 'mayasari',
                'email' => 'maya.sari@example.com',
                'phone_number' => '081234567896',
                'birth_date' => '1994-12-30',
                'location' => 'Denpasar, Bali',
                'bio' => 'Graphic designer dan illustrator freelance.',
            ],
            [
                'name' => 'Rizki Ramadhan',
                'username' => 'rizkirama',
                'email' => 'rizki.rama@example.com',
                'phone_number' => '081234567897',
                'birth_date' => '1998-04-18',
                'location' => 'Medan, Sumatera Utara',
                'bio' => 'Backend developer dengan expertise di Laravel dan Node.js.',
            ],
            [
                'name' => 'Fitri Handayani',
                'username' => 'fitrihandayani',
                'email' => 'fitri.handayani@example.com',
                'phone_number' => '081234567898',
                'birth_date' => '1997-08-22',
                'location' => 'Makassar, Sulawesi Selatan',
                'bio' => 'Data analyst yang tertarik dengan machine learning dan AI.',
            ],
            [
                'name' => 'Agus Setiawan',
                'username' => 'agussetiawan',
                'email' => 'agus.setiawan@example.com',
                'phone_number' => '081234567899',
                'birth_date' => '1996-02-14',
                'location' => 'Palembang, Sumatera Selatan',
                'bio' => 'DevOps engineer dengan pengalaman di cloud infrastructure.',
            ],
            [
                'name' => 'Dewi Lestari',
                'username' => 'dewilestari',
                'email' => 'dewi.lestari@example.com',
                'phone_number' => '081234567800',
                'birth_date' => '1995-06-28',
                'location' => 'Tangerang, Banten',
                'bio' => 'Product manager yang passionate dalam technology dan innovation.',
            ],
        ];

        foreach ($users as $userData) {
            User::create([
                'name' => $userData['name'],
                'username' => $userData['username'],
                'email' => $userData['email'],
                'password' => Hash::make('password'),
                'role' => 'user',
                'phone_number' => $userData['phone_number'],
                'birth_date' => $userData['birth_date'],
                'location' => $userData['location'],
                'bio' => $userData['bio'],
            ]);
        }

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}