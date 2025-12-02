<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('asset_library', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('name'); // Asset name
            $table->string('type')->default('image'); // image, icon, etc.
            $table->longText('asset_url'); // Base64 or file path
            $table->text('thumbnail_url')->nullable();
            $table->integer('width')->nullable();
            $table->integer('height')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('asset_library');
    }
};
