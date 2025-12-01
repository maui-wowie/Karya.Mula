<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('mentors', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('category'); // e.g., "Bisnis & Pemasaran"
            $table->decimal('rating', 2, 1)->default(0); // 0.0 to 5.0
            $table->integer('price_per_session'); // in Rupiah
            $table->integer('duration_minutes')->default(60);
            $table->json('availability')->nullable(); // Available days/times
            $table->string('profile_image')->nullable();
            $table->text('bio')->nullable();
            $table->string('expertise')->nullable(); // Specific expertise
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mentors');
    }
};
