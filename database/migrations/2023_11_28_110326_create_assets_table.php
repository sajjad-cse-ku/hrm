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
        Schema::create('assets', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('company_id')->nullable();
            $table->foreign('company_id')->references('id')->on('companies')->onDelete('RESTRICT');

            $table->unsignedBigInteger('purchase_by')->nullable();
            $table->foreign('purchase_by')->references('id')->on('users')->onDelete('RESTRICT');

            $table->unsignedBigInteger('created_by')->nullable();
            $table->foreign('created_by')->references('id')->on('users')->onDelete('RESTRICT');

            $table->unsignedBigInteger('asset_type_id')->nullable();
            $table->foreign('asset_type_id')->references('id')->on('asset_types')->onDelete('RESTRICT');

            $table->string('product_name')->nullable();
            $table->string('model')->nullable();
            $table->string('serial_no')->nullable();
            $table->date('purchase_date')->nullable();
            $table->string('purchase_quantity')->nullable();
            $table->string('office_tag_number')->nullable();
            $table->string('total_quantity')->nullable();
            $table->string('purchase_price')->nullable();
            $table->string('warranty_info')->nullable();
            $table->string('purchase_condition')->nullable();
            $table->date('destroy_date')->nullable();
            $table->string('destroy_note')->nullable();
            $table->string('details')->nullable();
            $table->boolean('status')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assets');
    }
};
