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
        Schema::create('rosters', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('company_id')->unsigned()->nullable();
            $table->foreign('company_id')->references('id')->on('companies')->onDelete('RESTRICT');
            $table->unsignedBigInteger('created_by')->unsigned()->nullable();
            $table->foreign('created_by')->references('id')->on('users')->onDelete('RESTRICT');

            $table->year('r_year');
            $table->integer('month_id')->unsigned();

            $table->unsignedBigInteger('department_id')->unsigned()->nullable();
            $table->foreign('department_id')->references('id')->on('departments')->onDelete('RESTRICT');

            $table->unsignedBigInteger('user_id')->unsigned()->nullable();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('RESTRICT');

            $table->unsignedBigInteger('day_01')->unsigned()->nullable();
            $table->foreign('day_01')->references('id')->on('shifts')->onDelete('RESTRICT');
            $table->unsignedBigInteger('day_02')->unsigned()->nullable();
            $table->foreign('day_02')->references('id')->on('shifts')->onDelete('RESTRICT');
            $table->unsignedBigInteger('day_03')->unsigned()->nullable();
            $table->foreign('day_03')->references('id')->on('shifts')->onDelete('RESTRICT');
            $table->unsignedBigInteger('day_04')->unsigned()->nullable();
            $table->foreign('day_04')->references('id')->on('shifts')->onDelete('RESTRICT');
            $table->unsignedBigInteger('day_05')->unsigned()->nullable();
            $table->foreign('day_05')->references('id')->on('shifts')->onDelete('RESTRICT');
            $table->unsignedBigInteger('day_06')->unsigned()->nullable();
            $table->foreign('day_06')->references('id')->on('shifts')->onDelete('RESTRICT');
            $table->unsignedBigInteger('day_07')->unsigned()->nullable();
            $table->foreign('day_07')->references('id')->on('shifts')->onDelete('RESTRICT');
            $table->unsignedBigInteger('loc_01')->unsigned()->nullable();
            $table->foreign('loc_01')->references('id')->on('duty_locations')->onDelete('RESTRICT');
            $table->unsignedBigInteger('day_08')->unsigned()->nullable();
            $table->foreign('day_08')->references('id')->on('shifts')->onDelete('RESTRICT');
            $table->unsignedBigInteger('day_09')->unsigned()->nullable();
            $table->foreign('day_09')->references('id')->on('shifts')->onDelete('RESTRICT');
            $table->unsignedBigInteger('day_10')->unsigned()->nullable();
            $table->foreign('day_10')->references('id')->on('shifts')->onDelete('RESTRICT');
            $table->unsignedBigInteger('day_11')->unsigned()->nullable();
            $table->foreign('day_11')->references('id')->on('shifts')->onDelete('RESTRICT');
            $table->unsignedBigInteger('day_12')->unsigned()->nullable();
            $table->foreign('day_12')->references('id')->on('shifts')->onDelete('RESTRICT');
            $table->unsignedBigInteger('day_13')->unsigned()->nullable();
            $table->foreign('day_13')->references('id')->on('shifts')->onDelete('RESTRICT');
            $table->unsignedBigInteger('day_14')->unsigned()->nullable();
            $table->foreign('day_14')->references('id')->on('shifts')->onDelete('RESTRICT');
            $table->unsignedBigInteger('loc_02')->unsigned()->nullable();
            $table->foreign('loc_02')->references('id')->on('duty_locations')->onDelete('RESTRICT');
            $table->unsignedBigInteger('day_15')->unsigned()->nullable();
            $table->foreign('day_15')->references('id')->on('shifts')->onDelete('RESTRICT');
            $table->unsignedBigInteger('day_16')->unsigned()->nullable();
            $table->foreign('day_16')->references('id')->on('shifts')->onDelete('RESTRICT');
            $table->unsignedBigInteger('day_17')->unsigned()->nullable();
            $table->foreign('day_17')->references('id')->on('shifts')->onDelete('RESTRICT');
            $table->unsignedBigInteger('day_18')->unsigned()->nullable();
            $table->foreign('day_18')->references('id')->on('shifts')->onDelete('RESTRICT');
            $table->unsignedBigInteger('day_19')->unsigned()->nullable();
            $table->foreign('day_19')->references('id')->on('shifts')->onDelete('RESTRICT');
            $table->unsignedBigInteger('day_20')->unsigned()->nullable();
            $table->foreign('day_20')->references('id')->on('shifts')->onDelete('RESTRICT');
            $table->unsignedBigInteger('day_21')->unsigned()->nullable();
            $table->foreign('day_21')->references('id')->on('shifts')->onDelete('RESTRICT');
            $table->unsignedBigInteger('loc_03')->unsigned()->nullable();
            $table->foreign('loc_03')->references('id')->on('duty_locations')->onDelete('RESTRICT');
            $table->unsignedBigInteger('day_22')->unsigned()->nullable();
            $table->foreign('day_22')->references('id')->on('shifts')->onDelete('RESTRICT');
            $table->unsignedBigInteger('day_23')->unsigned()->nullable();
            $table->foreign('day_23')->references('id')->on('shifts')->onDelete('RESTRICT');
            $table->unsignedBigInteger('day_24')->unsigned()->nullable();
            $table->foreign('day_24')->references('id')->on('shifts')->onDelete('RESTRICT');
            $table->unsignedBigInteger('day_25')->unsigned()->nullable();
            $table->foreign('day_25')->references('id')->on('shifts')->onDelete('RESTRICT');
            $table->unsignedBigInteger('day_26')->unsigned()->nullable();
            $table->foreign('day_26')->references('id')->on('shifts')->onDelete('RESTRICT');
            $table->unsignedBigInteger('day_27')->unsigned()->nullable();
            $table->foreign('day_27')->references('id')->on('shifts')->onDelete('RESTRICT');
            $table->unsignedBigInteger('day_28')->unsigned()->nullable();
            $table->foreign('day_28')->references('id')->on('shifts')->onDelete('RESTRICT');
            $table->unsignedBigInteger('loc_04')->unsigned()->nullable();
            $table->foreign('loc_04')->references('id')->on('duty_locations')->onDelete('RESTRICT');
            $table->unsignedBigInteger('day_29')->unsigned()->nullable();
            $table->foreign('day_29')->references('id')->on('shifts')->onDelete('RESTRICT');
            $table->unsignedBigInteger('day_30')->unsigned()->nullable();
            $table->foreign('day_30')->references('id')->on('shifts')->onDelete('RESTRICT');
            $table->unsignedBigInteger('day_31')->unsigned()->nullable();
            $table->foreign('day_31')->references('id')->on('shifts')->onDelete('RESTRICT');
            $table->unsignedBigInteger('loc_05')->unsigned()->nullable();
            $table->foreign('loc_05')->references('id')->on('duty_locations')->onDelete('RESTRICT');
//            $table->unsignedBigInteger('inserted_by')->unsigned();
//            $table->foreign('inserted_by')->references('id')->on('users')->onDelete('RESTRICT');
//            $table->timestamp('inserted_date')->default(\DB::raw('CURRENT_TIMESTAMP'));
            $table->unsignedBigInteger('approved_by')->unsigned()->nullable();
            $table->foreign('approved_by')->references('id')->on('users')->onDelete('RESTRICT');
            $table->timestamp('approved_date')->nullable();
            $table->unsignedBigInteger('updated_by')->unsigned()->nullable();
            $table->foreign('updated_by')->references('id')->on('users')->onDelete('RESTRICT');
            $table->timestamp('updated_date')->nullable();
            $table->boolean('status')->default(0);




            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rosters');
    }
};
