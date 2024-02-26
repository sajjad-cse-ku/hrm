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
        Schema::create('salary_setups', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('company_id')->nullable();
            $table->foreign('company_id')->references('id')->on('companies')->onDelete('RESTRICT');

            $table->unsignedBigInteger('user_id')->nullable();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('RESTRICT');

            $table->unsignedBigInteger('created_by')->nullable();
            $table->foreign('created_by')->references('id')->on('users')->onDelete('RESTRICT');

            $table->decimal('basic',15,2)->default(0);
            $table->decimal('ot_basic',15,2)->default(0);
            $table->decimal('house_rent',15,2)->default(0);
            $table->decimal('medical',15,2)->default(0);
            $table->decimal('entertainment',15,2)->default(0);
            $table->decimal('conveyance',15,2)->default(0);
            $table->decimal('food',15,2)->default(0);
            $table->decimal('special_allowance',15,2)->default(0);
            $table->decimal('others_allowance',15,2)->default(0);
            $table->decimal('gross_salary',15,2)->default(0);
            $table->decimal('cash_salary',15,2)->default(0);

            $table->decimal('pf_own',15,2)->default(0);
            $table->decimal('income_tax',15,2)->default(0);
            $table->decimal('salary_advance',15,2)->default(0);
            $table->decimal('mobile_others',15,2)->default(0);
            $table->decimal('stamp_fee',15,2)->default(0);
            $table->decimal('punishment',15,2)->default(0);

            $table->unsignedBigInteger('bank_id')->nullable();
            $table->foreign('bank_id')->references('id')->on('banks')->onDelete('RESTRICT');
            $table->string('account_no',240)->default(0);
            $table->char('tds',1)->default('N')->comment('N = Non TDS, T=TDS, C=Cons TDSl');

            $table->decimal('other_details',15,2)->default(0);
            $table->decimal('other_deduction',15,2)->default(0);
            $table->mediumText('other_deduction_details')->nullable();
            $table->decimal('last_month_salary',15,2)->default(0);
            $table->unsignedBigInteger('checker_id')->nullable();
            $table->foreign('checker_id')->references('id')->on('users')->onDelete('RESTRICT');
            $table->timestamp('check_date')->nullable()->default(null);
            $table->boolean('check_status')->default(0);

            $table->boolean('status')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('salary_setups');
    }
};
