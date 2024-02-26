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
        Schema::create('site_settings', function (Blueprint $table) {
            $table->id();
            $table->integer('sick')->default(26);
            $table->integer('casual')->default(36);
            $table->integer('extra_time')->default(15);
            $table->string('ip')->default('192.168.0.1');
            $table->integer('port')->default('7436');
            $table->string('protocol')->default('UDP');
            $table->integer('general_shift')->default('2');
            $table->string('night_shift')->nullable();

            $table->timestamps();
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
