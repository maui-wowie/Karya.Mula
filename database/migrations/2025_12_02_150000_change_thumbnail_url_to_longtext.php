<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('asset_library', function (Blueprint $table) {
            $table->longText('thumbnail_url')->nullable()->change();
        });
    }

    public function down()
    {
        Schema::table('asset_library', function (Blueprint $table) {
            $table->text('thumbnail_url')->nullable()->change();
        });
    }
};
