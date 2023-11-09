<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
       $this->call(GroupCompanyTableSeeder::class);
       $this->call(CompanyTableSeeder::class);
       $this->call(BangladeshTableSeeder::class);
       $this->call(UserTableSeeder::class);
       $this->call(HrmTableSeeder::class);
       $this->call(EmployeeTableSeeder::class);
       $this->call(PermissionsTableSeeder::class);
       $this->call(UsersPermissionsTableSeeder::class);
       $this->call(SiteSettingsTableSeeder::class);


    }
}