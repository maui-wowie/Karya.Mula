<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Quiz;
use App\Models\QuizOption;
use App\Models\Course;

class QuizSeeder extends Seeder
{
    public function run(): void
    {
        // Ambil course pertama (atau sesuaikan dengan course_id yang ada)
        $course = Course::first();

        if (!$course) {
            $this->command->warn('No courses found. Please create courses first.');
            return;
        }

        // Quiz 1
        $quiz1 = Quiz::create([
            'course_id' => $course->id,
            'question' => 'Fokus utama dari "Analisis Pasar" dalam konteks pengembangan produk adalah untuk mengidentifikasi kebutuhan pelanggan yang belum terpenuhi, menilai persaingan, dan memahami tren pasar secara keseluruhan sebelum meluncurkan produk baru.',
            'correct_answer' => 'B',
            'order' => 1
        ]);

        QuizOption::create([
            'quiz_id' => $quiz1->id,
            'option_key' => 'A',
            'option_text' => 'Menentukan biaya produksi terendah'
        ]);

        QuizOption::create([
            'quiz_id' => $quiz1->id,
            'option_key' => 'B',
            'option_text' => 'Mengidentifikasi kebutuhan pelanggan yang belum terpenuhi'
        ]);

        QuizOption::create([
            'quiz_id' => $quiz1->id,
            'option_key' => 'C',
            'option_text' => 'Membuat branding yang menarik secara visual'
        ]);

        QuizOption::create([
            'quiz_id' => $quiz1->id,
            'option_key' => 'D',
            'option_text' => 'Menganalisis performa tim internal'
        ]);

        QuizOption::create([
            'quiz_id' => $quiz1->id,
            'option_key' => 'E',
            'option_text' => 'Mempercepat proses legalitas bisnis'
        ]);

        // Quiz 2
        $quiz2 = Quiz::create([
            'course_id' => $course->id,
            'question' => 'Apa yang dimaksud dengan "Business Model Canvas"?',
            'correct_answer' => 'C',
            'order' => 2
        ]);

        QuizOption::create([
            'quiz_id' => $quiz2->id,
            'option_key' => 'A',
            'option_text' => 'Dokumen legal untuk mendirikan perusahaan'
        ]);

        QuizOption::create([
            'quiz_id' => $quiz2->id,
            'option_key' => 'B',
            'option_text' => 'Strategi pemasaran digital'
        ]);

        QuizOption::create([
            'quiz_id' => $quiz2->id,
            'option_key' => 'C',
            'option_text' => 'Alat visual untuk merancang model bisnis secara menyeluruh'
        ]);

        QuizOption::create([
            'quiz_id' => $quiz2->id,
            'option_key' => 'D',
            'option_text' => 'Laporan keuangan bulanan'
        ]);

        QuizOption::create([
            'quiz_id' => $quiz2->id,
            'option_key' => 'E',
            'option_text' => 'Sistem manajemen inventori'
        ]);

        // Quiz 3
        $quiz3 = Quiz::create([
            'course_id' => $course->id,
            'question' => 'Dalam konteks kewirausahaan, apa yang dimaksud dengan "MVP" (Minimum Viable Product)?',
            'correct_answer' => 'A',
            'order' => 3
        ]);

        QuizOption::create([
            'quiz_id' => $quiz3->id,
            'option_key' => 'A',
            'option_text' => 'Versi produk dengan fitur minimal untuk diuji di pasar'
        ]);

        QuizOption::create([
            'quiz_id' => $quiz3->id,
            'option_key' => 'B',
            'option_text' => 'Produk dengan harga termurah di pasaran'
        ]);

        QuizOption::create([
            'quiz_id' => $quiz3->id,
            'option_key' => 'C',
            'option_text' => 'Produk yang paling banyak diminati konsumen'
        ]);

        QuizOption::create([
            'quiz_id' => $quiz3->id,
            'option_key' => 'D',
            'option_text' => 'Produk dengan kualitas paling tinggi'
        ]);

        QuizOption::create([
            'quiz_id' => $quiz3->id,
            'option_key' => 'E',
            'option_text' => 'Produk yang menggunakan teknologi terbaru'
        ]);

        // Quiz 4
        $quiz4 = Quiz::create([
            'course_id' => $course->id,
            'question' => 'Manakah dari berikut ini yang merupakan karakteristik utama seorang entrepreneur yang sukses?',
            'correct_answer' => 'D',
            'order' => 4
        ]);

        QuizOption::create([
            'quiz_id' => $quiz4->id,
            'option_key' => 'A',
            'option_text' => 'Selalu menghindari risiko'
        ]);

        QuizOption::create([
            'quiz_id' => $quiz4->id,
            'option_key' => 'B',
            'option_text' => 'Bekerja sendiri tanpa tim'
        ]);

        QuizOption::create([
            'quiz_id' => $quiz4->id,
            'option_key' => 'C',
            'option_text' => 'Fokus hanya pada keuntungan jangka pendek'
        ]);

        QuizOption::create([
            'quiz_id' => $quiz4->id,
            'option_key' => 'D',
            'option_text' => 'Berani mengambil risiko terkalkulasi dan inovatif'
        ]);

        QuizOption::create([
            'quiz_id' => $quiz4->id,
            'option_key' => 'E',
            'option_text' => 'Menunggu kondisi pasar yang sempurna'
        ]);

        // Quiz 5
        $quiz5 = Quiz::create([
            'course_id' => $course->id,
            'question' => 'Apa tujuan utama dari melakukan "Customer Validation" dalam tahap awal startup?',
            'correct_answer' => 'B',
            'order' => 5
        ]);

        QuizOption::create([
            'quiz_id' => $quiz5->id,
            'option_key' => 'A',
            'option_text' => 'Meningkatkan jumlah karyawan'
        ]);

        QuizOption::create([
            'quiz_id' => $quiz5->id,
            'option_key' => 'B',
            'option_text' => 'Memvalidasi apakah produk benar-benar dibutuhkan oleh target pasar'
        ]);

        QuizOption::create([
            'quiz_id' => $quiz5->id,
            'option_key' => 'C',
            'option_text' => 'Mendapatkan pendanaan dari investor'
        ]);

        QuizOption::create([
            'quiz_id' => $quiz5->id,
            'option_key' => 'D',
            'option_text' => 'Membuat website perusahaan'
        ]);

        QuizOption::create([
            'quiz_id' => $quiz5->id,
            'option_key' => 'E',
            'option_text' => 'Mengurus legalitas perusahaan'
        ]);

        $this->command->info('Quiz data seeded successfully for course: ' . $course->title);
    }
}