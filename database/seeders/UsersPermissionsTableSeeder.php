<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UsersPermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('user_permissions')->insert([
            'user_id' => 1,
            'permission_id' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
