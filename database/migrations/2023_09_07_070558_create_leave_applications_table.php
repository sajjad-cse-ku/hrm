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
        Schema::create('leave_applications', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('company_id')->nullable();
            $table->foreign('company_id')->references('id')->on('companies')->onDelete('RESTRICT');

            $table->unsignedBigInteger('created_by')->nullable();
            $table->foreign('created_by')->references('id')->on('users')->onDelete('RESTRICT');

            $table->unsignedBigInteger('leave_id')->nullable();
            $table->foreign('leave_id')->references('id')->on('leave_categories')->onDelete('RESTRICT');

            $table->unsignedBigInteger('recommend_id')->nullable();
            $table->foreign('recommend_id')->references('id')->on('users')->onDelete('RESTRICT');

            $table->unsignedBigInteger('approve_id')->nullable();
            $table->foreign('approve_id')->references('id')->on('users')->onDelete('RESTRICT');

            $table->integer('user_id');
            $table->string('leave_year');
            $table->date('from_date');
            $table->date('to_date');
            $table->smallInteger('nods')->default(0);
            $table->date('duty_date')->nullable();
            $table->char('application_time')->default('B')->comment('B=Before,A=After');
            $table->string('reason')->nullable();
            $table->string('leave_attachment',240)->nullable();
            $table->string('location')->nullable();
            $table->integer('alternate_id')->nullable();
            $table->timestamp('alternate_submit')->nullable();


            $table->timestamp('recommend_date')->nullable();

            $table->timestamp('approve_date')->nullable();
            $table->mediumText('notes')->nullable();
            $table->char('status',2)->default('C')->comment('C = Created, A=Approved, R=Recommended, D=Dismissed, E=Enjoyed, L=Cancel , Acknowledged=AK , CA=CancelAcknowledged');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leave_applications');
    }
};
