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
        Schema::create('leave_registers', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('company_id')->nullable();
            $table->foreign('company_id')->references('id')->on('companies')->onDelete('RESTRICT');

            $table->unsignedBigInteger('created_by')->nullable();
            $table->foreign('created_by')->references('id')->on('users')->onDelete('RESTRICT');

            $table->unsignedBigInteger('leave_id')->nullable();
            $table->foreign('leave_id')->references('id')->on('leave_categories')->onDelete('RESTRICT');

            $table->integer('user_id');
            $table->string('leave_year');
            $table->integer('leave_eligible')->unsigned()->default(0);
            $table->integer('leave_enjoyed')->unsigned()->default(0);
            $table->integer('leave_balance')->unsigned()->default(0);
            $table->date('last_leave')->nullable();

            $table->tinyInteger('status')->default(1);


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leave_registers');
    }
};
