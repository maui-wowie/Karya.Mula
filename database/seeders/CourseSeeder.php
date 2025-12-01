<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CourseSeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('courses')->truncate();
        DB::table('course_user')->truncate();

        $coursesData = [
            [
                'id' => 1,
                'title' => "3 Step Belajar jadi Pengusaha Sukses ( I , T , M )",
                'youtube_url' => 'https://youtu.be/TcgjPvhsFWE?si=FoXGLd-_M8xD_qr0',
                'mentor_comment' => 'Video pembuka yang bagus! Fokus pada target pasar dan jangan takut gagal.',
                'description' => 'Pelajari langkah pertama untuk membangun mindset wirausaha yang kuat dengan 3 huruf saja.',
                'task_description' => 'Tuliskan 3 langkah (I, T, M) dari video ini beserta insight pribadimu.',
            ],
            [
                'id' => 2,
                'title' => "Pilih Jadi Karyawan atau Pengusaha? Video Ini Bisa Buka Matamu",
                'youtube_url' => 'https://youtu.be/0pirVi20Wdc?si=-wZKmFOgo00Do2W-',
                'mentor_comment' => 'Cara menjadi pengusaha dengan bijak agar terhindar dari kegagalan sejak dini dan menjadi kaya di waktu muda.',
                'description' => 'Diskusikan pro dan kontra menjadi pengusaha vs karyawan setelah menonton video ini.',
                'task_description' => 'Buat list 5 risiko terbesar menjadi pengusaha di usia muda.',
            ],
            [
                'id' => 3,
                'title' => "Cara Bangun Bisnis dari NOL - Mulai Dari Sini !",
                'youtube_url' => 'https://youtu.be/8g1H3ipDNOs?si=kXHqZUXY_J6MyC0l',
                'mentor_comment' => 'Kerjakan BMC ini dengan detail. Ini adalah peta bisnismu.',
                'description' => 'Langkah demi langkah menyusun kesuksesan bisnismu mulai dari ini, detik ini, waktu ini dan masa ini.',
                'task_description' => 'Identifikasi 3 langkah awal yang paling krusial dari video ini.',
            ],
            [
                'id' => 4,
                'title' => "Cara Mudah Memahami BUSINESS MODEL CANVAS",
                'youtube_url' => 'https://youtu.be/zex88hxqY4w?si=NPU75dAB7VH4Mkt6',
                'mentor_comment' => 'Kerjakan BMC ini dengan detail. Ini adalah peta bisnismu.',
                'description' => 'Langkah demi langkah menyusun Business Model Canvas yang solid dan praktis untuk validasi ide bisnis.',
                'task_description' => 'Buat draft awal 9 blok BMC untuk ide bisnis Anda.',
            ],
            [
                'id' => 5,
                'title' => "Wirausaha Muda Sukses Membangun Desa Lewat Produk Olahan Pisang Banana Chips",
                'youtube_url' => 'https://youtu.be/7yUitsWTqho?si=69tM01lccCZGM1vj',
                'mentor_comment' => 'Kerjakan BMC ini dengan detail. Ini adalah peta bisnismu.',
                'description' => 'Siapa bilang produk olahan pisang tidak menjanjikan? Di tangan wirausaha muda asal Cianjur, Nurul Ihsani, produk olahan pisang bisa menjadi suatu hal yang bernilai ekonomi dan memberi manfaat bagi orang sekitar. Lewat produk kripik pisang bernama Banana Chips yang diolah dari hasil pertanian pisang di daerahnya, wanita yang juga Young Ambassador Program YESS Kementan ini sukses membangun dan mensejahterahkan warga-warga di Warung Jambe, Kelurahan Sayang, Kecamatan Cianjur. Di usianya yang baru menginjak 20 tahun, Nurul yang juga CEO dari PT Sani Rasa Pangan Indonesia ini mengaku bangga bisa menjadi bagian dari petani muda yang turut ambil peran untuk pertanian Indonesia. Nurul yakin bahwa pertanian memiliki peluang emas yang seharusnya bisa dimanfaatkan oleh milenial.',
                'task_description' => 'Jelaskan bagaimana BMC Banana Chips ini menerapkan Customer Segments dan Value Propositions.',
            ],
            [
                'id' => 6,
                'title' => "Rahasia Bisnis Retail Autopilot dan Tim Solid",
                'youtube_url' => 'https://youtu.be/TABC2PoVpBs?si=iRjGsG-V0jfjX9N_',
                'mentor_comment' => 'Kerjakan BMC ini dengan detail. Ini adalah peta bisnismu.',
                'description' => 'Dari seorang pekerja biasa, kini sukses jadi pengusaha muda dengan omzet miliaran rupiah per bulan! Inilah kisah Denny Lukman (35 tahun), lulusan SMK yang berhasil membangun Madani Grosir Snack. Awalnya, Denny hanyalah karyawan biasa. Namun dengan tekad kuat dan keberanian memulai, ia merintis usaha grosir snack. Hasilnya? Bulan pertama langsung tembus Rp100 juta!',
                'task_description' => 'Identifikasi 3 sistem kunci yang membuat bisnis retail ini bisa "Autopilot".',
            ],
            [
                'id' => 7,
                'title' => "Baru Lulus Udah Pengen Buka Bisnis?",
                'youtube_url' => 'https://youtu.be/eOwtRnJemrg?si=UMchQZaM71BvBxVV',
                'mentor_comment' => 'Kerjakan BMC ini dengan detail. Ini adalah peta bisnismu.',
                'description' => 'Banyak fresh graduate yang pengen langsung buka bisnis padahal belum ngerti realita. Dunia kerja aja belum dijalanin, udah mau jadi bos. Bisnis itu bukan soal gaya, tapi soal mental dan tanggung jawab. Di video Kelas Pakar kali ini, dr. Tirta ngomong apa adanya soal gimana rasanya mulai bisnis dari nol, pentingnya financial stability, dan kenapa gak semua orang cocok jadi pengusaha.',
                'task_description' => 'Tuliskan 5 pelajaran finansial penting yang didapat dari video ini.',
            ],
            [
                'id' => 8,
                'title' => "Step by Step Mulai Bisnis dari Nol | Dig Deeper",
                'youtube_url' => 'https://youtu.be/89QEZGxWYZc?si=HvLQOQ99IqTxHJlL',
                'mentor_comment' => 'Kerjakan BMC ini dengan detail. Ini adalah peta bisnismu.',
                'description' => 'Hi #Temenkotheo welcome ke segement terbaru di channel ini #DIGDEEPER , dimana gue bakalan sharing inisght insight mengenai sebuah topik, fenomena, hingga pengalaman gue lebih dalem lagi Di episode perdana #Digdeeper ini  gue bakalan sharing soal sebenarnya gimana mulai binsis secara realisits dan praktikal,  gimana sih frame work nya ? modal apa aja yang di perlukan ?',
                'task_description' => 'Buat framework 5 langkah awal memulai bisnis yang Anda tangkap dari video ini.',
            ],
        ];

        // Create courses
        foreach ($coursesData as $data) {
            Course::create([
                'id' => $data['id'],
                'title' => $data['title'],
                'description' => $data['description'],
                'mentor_comment' => $data['mentor_comment'],
                'task_description' => $data['task_description'],
                'youtube_url' => $data['youtube_url'],
                'thumbnail_url' => null,
            ]);
        }

        // Enroll users ke courses dengan random progress
        $users = User::where('role', 'user')->get();
        $allCourses = Course::all();

        if ($users->count() > 0 && $allCourses->count() > 0) {
            foreach ($users as $user) {
                // Random jumlah course yang diambil (3-6 courses dari 8 yang tersedia)
                $numberOfCourses = rand(3, 6);
                $enrolledCourses = $allCourses->random($numberOfCourses);

                foreach ($enrolledCourses as $course) {
                    // 60% chance untuk completed, 40% untuk in progress
                    $isCompleted = rand(1, 10) <= 6;
                    $progress = $isCompleted ? 100 : rand(20, 85);

                    $user->courses()->attach($course->id, [
                        'is_completed' => $isCompleted,
                        'progress' => $progress,
                        'completed_at' => $isCompleted ? now()->subDays(rand(1, 60)) : null,
                        'created_at' => now()->subDays(rand(1, 90)),
                        'updated_at' => now()->subDays(rand(0, 7)),
                    ]);
                }
            }
        }

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}