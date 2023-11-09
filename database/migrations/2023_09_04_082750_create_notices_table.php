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
        Schema::create('notices', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('company_id')->nullable();
            $table->foreign('company_id')->references('id')->on('companies')->onDelete('RESTRICT');

            $table->unsignedBigInteger('created_by')->nullable();
            $table->foreign('created_by')->references('id')->on('users')->onDelete('RESTRICT');

            $table->date('notice_date')->default(\Carbon\Carbon::now()->format('Y-m-d'));
            $table->date('expiry_date')->nullable();
            $table->string('title',240);
            $table->mediumText('description')->nullable();
            $table->string('sender',240);
            $table->char('type',1)->default('D')->comment('D=>Display E=>Email');
            $table->char('confidentiality',1)->default('P')->comment('P=>Public C=>Confidential');
            $table->char('receiver',1)->default('A')->comment('A=>all; P=>Person D=>Department');
            $table->string('file_path',240)->nullable();
            $table->boolean('status')->default(1);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notices');
    }
};
