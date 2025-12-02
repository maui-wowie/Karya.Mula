<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        if (!Schema::hasColumn('asset_library', 'asset_data')) {
            Schema::table('asset_library', function (Blueprint $table) {
                $table->json('asset_data')->nullable()->after('type');
            });
        }
    }

    public function down()
    {
        if (Schema::hasColumn('asset_library', 'asset_data')) {
            Schema::table('asset_library', function (Blueprint $table) {
                $table->dropColumn('asset_data');
            });
        }
    }
};
