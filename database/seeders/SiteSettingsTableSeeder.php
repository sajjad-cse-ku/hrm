<?php

namespace Database\Seeders;

use App\Models\SiteSettings;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SiteSettingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SiteSettings::create([
            'sick'=>26,
            'casual'=>36,
            'in_time'=>'10:15',
            'out_time'=>'18:00',
            'ip'=>'192.168.0.1',
            'port'=>'7346',
            'protocol'=>'UDP',
        ]);
    }
}
