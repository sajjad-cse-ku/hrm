<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        // Roles Table
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            // $table->integer('id');
            $table->string('role_name');
            $table->timestamps();
        });

        // Permissions Table
        Schema::create('permissions', function (Blueprint $table) {
            $table->id();
            // $table->integer('id');
            $table->string('permission_name');
            $table->timestamps();
        });
 

        // User_Roles Table (Many-to-Many Pivot Table)
        Schema::create('user_roles', function (Blueprint $table) {
            $table->id();
            // $table->id('user_id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('role_id');

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('role_id')->references('id')->on('roles');

            $table->timestamps();
        });

        // User_Permissions Table (Many-to-Many Pivot Table)
        Schema::create('user_permissions', function (Blueprint $table) {
            // $table->id('user_id');
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');

            $table->unsignedBigInteger('permission_id');
            $table->foreign('permission_id')->references('id')->on('permissions');

            $table->timestamps();
        });

        // Role_Permissions Table (Many-to-Many Pivot Table)
        Schema::create('role_permissions', function (Blueprint $table) {
            $table->id('id');
            
            $table->unsignedBigInteger('role_id');
            $table->foreign('role_id')->references('id')->on('roles');

            $table->unsignedBigInteger('permission_id');
            $table->foreign('permission_id')->references('id')->on('permissions');

            $table->timestamps();
        });
    }

    public function down()
    {
        // Drop all the tables if you ever need to rollback the migration.
        Schema::dropIfExists('role_permissions');
        Schema::dropIfExists('user_permissions');
        Schema::dropIfExists('user_roles');
        Schema::dropIfExists('permissions');
        Schema::dropIfExists('roles'); 
    }
};
