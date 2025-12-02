<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('studio_templates', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Logo, Banner Toko, etc.
            $table->string('icon')->nullable(); // Icon name for display
            $table->string('color')->default('bg-blue-100 text-blue-700'); // Tailwind classes
            $table->json('canvas_data'); // Pre-designed template data
            $table->text('thumbnail_url')->nullable();
            $table->integer('order')->default(0); // Display order
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('studio_templates');
    }
};
