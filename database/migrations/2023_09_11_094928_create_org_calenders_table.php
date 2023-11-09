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
        Schema::create('org_calenders', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('company_id')->unsigned()->default(1);
            $table->foreign('company_id')->references('id')->on('companies')->onDelete('RESTRICT');

            $table->unsignedBigInteger('created_by')->unsigned();
            $table->foreign('created_by')->references('id')->on('users')->onDelete('RESTRICT');


            $table->integer('calender_year');
            $table->integer('month_id');
            $table->char('c_month_id',2);
//            $table->string('month_name',10);
            $table->date('start_from');
            $table->date('ends_on');
            $table->char('salary_open',1)->default('F')->comment('F=Future, O=Open, C=Close');
            $table->char('salary_update',1)->default('F')->comment('F=Future, O=Open, C=Close');
            $table->char('food_open',1)->default('F')->comment('F=Future, O=Open, C=Close');

            $table->boolean('status')->default(0);



            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('org_calenders');
    }
};
