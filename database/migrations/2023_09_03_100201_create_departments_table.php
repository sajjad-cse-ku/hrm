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
        Schema::create('departments', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('company_id')->nullable();
            $table->foreign('company_id')->references('id')->on('companies')->onDelete('RESTRICT');

            $table->unsignedBigInteger('created_by')->nullable();
            $table->foreign('created_by')->references('id')->on('users')->onDelete('RESTRICT');

            $table->string('name');
            $table->char('short_name',25);

            $table->integer('department_code')->nullable();

            $table->date('started_from')->default(\Carbon\Carbon::now());
            $table->integer('report_to')->nullable();
            $table->integer('approval_authority')->nullable();
            $table->integer('headed_by')->nullable();
            $table->integer('second_man')->nullable();
            $table->string('email',190)->nullable()->unique();
            $table->tinyInteger('status')->default(1);
            $table->integer('emp_count')->unsigned()->default(0);
            $table->integer('approved_manpower')->unsigned()->default(0);
            $table->string('top_rank',100)->nullable();
            $table->integer('roster_year')->unsigned()->default(2023);
            $table->integer('roster_month_id')->nullable();
            $table->char('leave_steps',4)->default('1111');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('departments');
    }
};
