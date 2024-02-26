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
        Schema::create('monthly_salaries', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('company_id')->unsigned()->default(1);
            $table->foreign('company_id')->references('id')->on('companies')->onDelete('RESTRICT');
            $table->unsignedBigInteger('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('RESTRICT');

            $table->unsignedBigInteger('period_id')->unsigned();
            $table->foreign('period_id')->references('id')->on('org_calenders')->onDelete('RESTRICT');

            $table->unsignedBigInteger('bank_id')->unsigned()->default(1);
            $table->foreign('bank_id')->references('id')->on('banks')->onDelete('RESTRICT');

            $table->unsignedBigInteger('created_by')->unsigned();
            $table->foreign('created_by')->references('id')->on('users')->onDelete('RESTRICT');


            $table->decimal('basic',15,2)->default(0);
            $table->decimal('house_rent',15,2)->default(0);
            $table->decimal('medical',15,2)->default(0);
            $table->decimal('conveyance',15,2)->default(0);
            $table->decimal('entertainment',15,2)->default(0);
            $table->decimal('other_allowance',15,2)->default(0);   // Add hobe
            $table->decimal('gross_salary',15,2)->default(0);  // uporer gula milaye gross hobe
            $table->decimal('cash_salary',15,2)->default(0);   // jader bank acc nai tader cash a data porbe

            $table->unsignedSmallInteger('paid_days')->default(0);  // eita = present - late


            $table->decimal('earned_salary',15,2)->default(0);   // after paid days calculation
            $table->decimal('increment_amt',15,2)->default(0);   // eita temon dorkar nai
            $table->decimal('arear_amount',15,2)->default(0);     // earned_salary er sathe add hobe
            $table->unsignedSmallInteger('overtime_hour')->default(0);
            $table->decimal('overtime_amount',15,2)->default(0); // add hobe
            $table->decimal('payable_salary',15,2)->default(0);  // after adding all above
            $table->decimal('income_tax',15,2)->default(0);
            $table->decimal('advance',15,2)->default(0);
            $table->decimal('mobile_others',15,2)->default(0);
            $table->decimal('food_charge',15,2)->default(0);
            $table->decimal('stamp_fee',15,2)->default(0);    // Minus hobe
            $table->decimal('net_salary',15,2)->default(0);   // after all calculation which salary will insert

            $table->string('account_no',20)->nullable();
            $table->char('tds_id',1)->default('N')->comment('N=> Non TDS T=>TDS C=>Cons TDS');
            $table->boolean('manual_update')->default(0);
            $table->boolean('final')->default(0);
            $table->boolean('withheld')->default(0);
            $table->mediumText('reason')->nullable();
            $table->mediumText('remarks')->nullable();

            $table->boolean('status')->default(1);
            $table->timestamp('salary_date')->nullable()->default(null);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('monthly_salaries');
    }
};
