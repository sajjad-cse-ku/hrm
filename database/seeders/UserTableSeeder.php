<?php

namespace Database\Seeders;

use App\Models\EmployeePersonal;
use App\Models\EmployeeProfessional;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        User::create([
            'company_id'=>1,
            'username'=>'sajjad294',
            'first_name'=>'Sajjad',
            'last_name'=>'Hossain',
            'email'=>'super@admin.com',
            'password'=>Hash::make('secret'),
            'status'=>1,
        ]);
        User::create([
            'company_id'=>1,
            'username'=>'admin',
            'first_name'=>'Jhon',
            'last_name'=>'Doe',
            'email'=>'user@admin.com',
            'password'=>Hash::make('secret'),
            'status'=>1,
        ]);

    }
}