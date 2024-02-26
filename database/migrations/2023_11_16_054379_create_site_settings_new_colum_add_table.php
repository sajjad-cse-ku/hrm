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
        Schema::table('site_settings', function (Blueprint $table) {

            $table->time('end_day_second_time')->default('08:00:00')->after('night_shift')->nullable();
            $table->time('end_day_first_time')->default('05:00:00')->after('night_shift')->nullable();
            $table->time('start_day_second_time')->default('12:00:00')->after('night_shift')->nullable();
            $table->time('start_day_first_time')->default('10:00:00')->after('night_shift')->nullable();



        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('site_settings');
    }
};
