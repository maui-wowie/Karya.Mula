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
        Schema::create('sdg_goals', function (Blueprint $table) {
            $table->id();
            $table->integer('goal_number')->unique(); // 1-17
            $table->string('title');
            $table->text('description');
            $table->string('color', 7); // Hex color code
            $table->string('icon_url')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sdg_goals');
    }
};
