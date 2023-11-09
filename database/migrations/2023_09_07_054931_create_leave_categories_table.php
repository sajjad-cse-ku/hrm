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
        Schema::create('leave_categories', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('company_id')->nullable();
            $table->foreign('company_id')->references('id')->on('companies')->onDelete('RESTRICT');

            $table->unsignedBigInteger('created_by')->nullable();
            $table->foreign('created_by')->references('id')->on('users')->onDelete('RESTRICT');


            $table->string('name',100);
            $table->char('short_code',5);

            $table->char('leave_type',1)->default('Y');
            $table->char('leave_limit',1)->default('Y');
            $table->integer('yearly_limit')->unsigned()->default(0);
            $table->char('is_carry_forward',1)->default('N');
            $table->char('show_roster',1)->default('Y');
            $table->mediumText('particulars')->nullable();
            $table->integer('status')->default(1);


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leave_categories');
    }
};
