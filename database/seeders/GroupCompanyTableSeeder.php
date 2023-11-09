<?php

namespace Database\Seeders;

use App\Models\GroupCompany;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GroupCompanyTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        GroupCompany::create([
            'country'=>'Bangladesh',
            'name'=>'Team Corp Ltd',
            'address'=>'Dhaka',
            'city'=>'Dhaka',
        ]);
    }
}
