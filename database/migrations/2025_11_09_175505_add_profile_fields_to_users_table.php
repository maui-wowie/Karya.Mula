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
        Schema::table('users', function (Blueprint $table) {
        $table->string('phone_number')->nullable()->after('email');
        $table->string('username')->nullable()->unique()->after('phone_number');
        $table->date('birth_date')->nullable()->after('username');
        $table->string('location')->nullable()->after('birth_date');
        $table->text('bio')->nullable()->after('location');
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            //
        });
    }
};