<?php

namespace Database\Seeders;

use App\Models\Company;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CompanyTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Company::create([
            'group_company_id'=>1,
            'country'=>'Khulna',
            'name'=>'Company A',
            'address'=>'Khulna',
            'city'=>'Khulna',
        ]);
        Company::create([
            'group_company_id'=>1,
            'country'=>'Jessore',
            'name'=>'Company B',
            'address'=>'Jessore',
            'city'=>'Jessore',
        ]);
    }
}
