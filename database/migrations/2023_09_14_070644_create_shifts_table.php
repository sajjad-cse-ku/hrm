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
        Schema::create('shifts', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('company_id')->unsigned()->default(1);
            $table->foreign('company_id')->references('id')->on('companies')->onDelete('RESTRICT');

            $table->unsignedBigInteger('created_by')->unsigned();
            $table->foreign('created_by')->references('id')->on('users')->onDelete('RESTRICT');

            $table->string('name',100);
            $table->char('short_name',5);
            $table->time('from_time')->default('00:00');
            $table->time('to_time')->default('00:00');
            $table->tinyInteger('duty_hour')->default(0);
            $table->integer('end_next_day')->default(0);
            $table->date('effective_date')->default(\Carbon\Carbon::now()->format('Y-m-d'));
            $table->longText('description')->nullable();
            $table->boolean('status')->default(1);


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shifts');
    }
};
