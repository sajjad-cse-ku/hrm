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
        Schema::create('bangladeshes', function (Blueprint $table) {
            $table->id();
            $table->char('lang',2)->default('en');
            $table->string('division',20);
            $table->string('district',25);
            $table->string('thana',60);
            $table->string('post_office',60);
            $table->string('post_code',4);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bangladeshes');
    }
};
