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
        Schema::create('employee_education', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('created_by')->nullable();
            $table->foreign('created_by')->references('id')->on('users')->onDelete('RESTRICT');

            $table->integer('user_id');
            $table->string('name',200);
            $table->string('description',240)->nullable();
            $table->string('institution',200);
            $table->string('passing_year',200);
            $table->string('result',100)->nullable();
            $table->string('degree_type')->nullable();
            $table->date('achievement_date')->nullable();


            $table->tinyInteger('status')->default(1)->unsigned();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employee_education');
    }
};
