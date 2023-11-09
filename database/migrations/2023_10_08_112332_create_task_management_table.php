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
        Schema::create('task_management', function (Blueprint $table) {
            $table->id();


            $table->unsignedBigInteger('task_creator_id')->nullable();
            $table->foreign('task_creator_id')->references('id')->on('users')->onDelete('RESTRICT');

            $table->unsignedBigInteger('department_id')->nullable();
            $table->foreign('department_id')->references('id')->on('departments')->onDelete('RESTRICT');

            $table->unsignedBigInteger('project_id')->nullable();
            $table->foreign('project_id')->references('id')->on('projects')->onDelete('RESTRICT');


            $table->string('task_title');
            $table->text('task_author_comment')->nullable();
            $table->text('task_assigned_user_comment')->nullable();
            $table->string('task_priority');
            $table->date('submit_date')->nullable();
            $table->date('task_approximate_start_date')->nullable();
            $table->date('task_approximate_end_date')->nullable();
            $table->time('task_start_date_time')->nullable();
            $table->time('task_end_date_time')->nullable();
            $table->time('task_total_hours')->nullable();
            $table->char('task_status')->default('C')->comment('C = Create , P = Processing , R = Review , A = Approved');
            $table->string('task_remarks')->nullable();
            $table->string('task_marking')->nullable();
            $table->string('task_link')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('task_management');
    }
};
