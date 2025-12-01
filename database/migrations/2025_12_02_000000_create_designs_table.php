<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('designs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->string('type')->default('custom'); // logo, banner, etc.
            $table->json('canvas_data')->nullable();
            $table->longText('thumbnail_url')->nullable(); // Changed to longText directly
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('designs');
    }
};
