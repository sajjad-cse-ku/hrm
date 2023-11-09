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
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('group_company_id')->nullable();
            $table->foreign('group_company_id')->references('id')->on('group_companies')->onDelete('RESTRICT');

            $table->string('name',240);
            $table->string('address',200);
            $table->string('city',200);
            $table->string('state',200)->nullable();
            $table->string('post_code',200)->nullable();
            $table->string('country',100);
            $table->string('phone_no',200)->nullable();
            $table->string('email',190)->unique()->nullable();
            $table->string('website',190)->nullable();
            $table->char('currency',3)->default('BDT');
            $table->string('locale',20)->default('en-US')->comments('English, Bangla');
            $table->tinyInteger('status')->default(0);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};