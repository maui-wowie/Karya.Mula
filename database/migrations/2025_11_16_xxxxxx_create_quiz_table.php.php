<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        // Tabel untuk soal quiz
        Schema::create('quizzes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->constrained()->onDelete('cascade');
            $table->text('question');
            $table->string('correct_answer'); // A, B, C, D, atau E
            $table->integer('order')->default(0); // urutan soal
            $table->timestamps();
        });

        // Tabel untuk opsi jawaban
        Schema::create('quiz_options', function (Blueprint $table) {
            $table->id();
            $table->foreignId('quiz_id')->constrained()->onDelete('cascade');
            $table->string('option_key'); // A, B, C, D, E
            $table->text('option_text');
            $table->timestamps();
        });

        // Tabel untuk menyimpan jawaban user
        Schema::create('user_quiz_answers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('course_id')->constrained()->onDelete('cascade');
            $table->foreignId('quiz_id')->constrained()->onDelete('cascade');
            $table->string('selected_answer'); // A, B, C, D, atau E
            $table->boolean('is_correct')->default(false);
            $table->timestamps();

            // User hanya bisa menjawab satu kali per soal
            $table->unique(['user_id', 'quiz_id']);
        });

        // Tabel untuk skor total quiz user
        Schema::create('user_quiz_scores', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('course_id')->constrained()->onDelete('cascade');
            $table->integer('score'); // 0-100
            $table->integer('correct_answers');
            $table->integer('total_questions');
            $table->boolean('is_passed')->default(false); // passing score 60
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();

            // User bisa mengulang quiz, tapi simpan record terakhir
            $table->unique(['user_id', 'course_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_quiz_scores');
        Schema::dropIfExists('user_quiz_answers');
        Schema::dropIfExists('quiz_options');
        Schema::dropIfExists('quizzes');
    }
};