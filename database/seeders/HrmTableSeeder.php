<?php

namespace Database\Seeders;

use App\Models\Department;
use App\Models\Designation;
use App\Models\LeaveCategory;
use App\Models\LeaveRegister;
use App\Models\Religions;
use App\Models\Shift;
use App\Models\Title;
use App\Models\WorkingStatus;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class HrmTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Department::create([
            'company_id'=>1,
            'created_by'=>1,
            'name'=>'Department A',
            'short_name'=>'A',
            'roster_year'=>Carbon::now()->year,
            'roster_month_id'=>Carbon::now()->month
        ]);
        //end department
        //manage designation
        Designation::create([
            'company_id'=>1,
            'created_by'=>1,
            'name'=>'Software Engineer',
            'short_name'=>'SE',
            'designation_code'=>001
        ]);
        //end designation

        //manage title
        Designation::create([
            'company_id'=>1,
            'created_by'=>1,
            'name'=>'Frontend Design',
            'short_name'=>'FD',
            'designation_code'=>001
        ]);
        //end title

        //manage title
        Title::create([
            'company_id'=>1,
            'created_by'=>1,
            'name'=>'Mr',
        ]);
        //end title


        //manage title
        Religions::create([
            'created_by'=>1,
            'name'=>'Islam',
        ]);
        Religions::create([
            'created_by'=>1,
            'name'=>'Hindu',
        ]);
        Religions::create([
            'created_by'=>1,
            'name'=>'buddha',
        ]);
        Religions::create([
            'created_by'=>1,
            'name'=>'kristen',
        ]);

        LeaveCategory::create([
            'created_by'=>1,
            'company_id'=>1,
            'name'=>'Casual',
            'short_code'=>'Cas',
        ]);
        LeaveCategory::create([
            'created_by'=>1,
            'company_id'=>1,
            'name'=>'Sick',
            'short_code'=>'Si',
        ]);
        LeaveCategory::create([
            'created_by'=>1,
            'company_id'=>1,
            'name'=>'Earn',
            'short_code'=>'Ea',
        ]);
        LeaveCategory::create([
            'created_by'=>1,
            'company_id'=>1,
            'name'=>'Alternative',
            'short_code'=>'Alt',
        ]);
        LeaveCategory::create([
            'created_by'=>1,
            'company_id'=>1,
            'name'=>'Maternity',
            'short_code'=>'Mat',
        ]);
        LeaveCategory::create([
            'created_by'=>1,
            'company_id'=>1,
            'name'=>'Training',
            'short_code'=>'Trn',
        ]);
        LeaveCategory::create([
            'created_by'=>1,
            'company_id'=>1,
            'name'=>'Special',
            'short_code'=>'Spe',
        ]);
        LeaveCategory::create([
            'created_by'=>1,
            'company_id'=>1,
            'name'=>'Without Pay Leave',
            'short_code'=>'WPL',
        ]);

        WorkingStatus::create([
            'created_by'=>1,
            'company_id'=>1,
            'name'=>'Regular',
        ]);
        WorkingStatus::create([
            'created_by'=>1,
            'company_id'=>1,
            'name'=>'Provisional',
        ]);
        WorkingStatus::create([
            'created_by'=>1,
            'company_id'=>1,
            'name'=>'Contractual',
        ]);
        WorkingStatus::create([
            'created_by'=>1,
            'company_id'=>1,
            'name'=>'Resigned',
        ]);
        WorkingStatus::create([
            'created_by'=>1,
            'company_id'=>1,
            'name'=>'Dismissed',
        ]);
        WorkingStatus::create([
            'created_by'=>1,
            'company_id'=>1,
            'name'=>'Discontinued',
        ]);

        Shift::create([
            'company_id'=>1,
            'name'=>'OFF',
            'short_name'=>'OFF',
            'from_time'=>'00:00:00',
            'to_time'=>'00:00:00',
            'duty_hour'=>0,
            'end_next_day'=>0,
            'effective_date'=>'2019-01-01',
            'description'=>NULL,
            'status'=>1,
            'created_by'=>1,
        ]);

        Shift::create([
            'company_id'=>1,
            'status'=>1,
            'created_by'=>1,
            'name'=>'GENERAL',
            'short_name'=>'G',
            'from_time'=>'09:00:00',
            'to_time'=>'18:00:00',
            'duty_hour'=>9,
            'end_next_day'=>0,
            'effective_date'=>'2019-01-01',
            'description'=>NULL,

        ]);
        Shift::create([
            'company_id'=>1,
            'status'=>1,
            'created_by'=>1,
            'name'=>'MORNING',
            'short_name'=>'M',
            'from_time'=>'08:00:00',
            'to_time'=>'15:00:00',
            'duty_hour'=>7,
            'end_next_day'=>0,
            'effective_date'=>'2019-01-01',
            'description'=>NULL,

        ]);
        Shift::create([
            'company_id'=>1,
            'status'=>1,
            'created_by'=>1,
            'name'=>'EVENING',
            'short_name'=>'E',
            'from_time'=>'15:00:00',
            'to_time'=>'22:00:00',
            'duty_hour'=>7,
            'end_next_day'=>0,
            'effective_date'=>'2019-01-01',
            'description'=>NULL,

        ]);
        Shift::create([
            'company_id'=>1,
            'status'=>1,
            'created_by'=>1,
            'name'=>'NIGHT',
            'short_name'=>'N',
            'from_time'=>'22:00:00',
            'to_time'=>'08:00:00',
            'duty_hour'=>10,
            'end_next_day'=>1,
            'effective_date'=>'2019-01-27',
            'description'=>NULL,

        ]);

        Shift::create([
            'company_id'=>1,
            'status'=>1,
            'created_by'=>1,
            'name'=>'MORNING 1',
            'short_name'=>'M1',
            'from_time'=>'08:00:00',
            'to_time'=>'16:00:00',
            'duty_hour'=>8,
            'end_next_day'=>0,
            'effective_date'=>'2019-01-27',
            'description'=>NULL,

        ]);
        Shift::create([
            'company_id'=>1,
            'status'=>1,
            'created_by'=>1,
            'name'=>'MORNING H',
            'short_name'=>'MH',
            'from_time'=>'07:00:00',
            'to_time'=>'15:00:00',
            'duty_hour'=>8,
            'end_next_day'=>0,
            'effective_date'=>'2019-01-27',
            'description'=>NULL,

        ]);

        Shift::create([
            'company_id'=>1,
            'status'=>1,
            'created_by'=>1,
            'name'=>'EVENING H',
            'short_name'=>'EH',
            'from_time'=>'14:00:00',
            'to_time'=>'22:00:00',
            'duty_hour'=>8,
            'end_next_day'=>0,
            'effective_date'=>'2019-01-27',
            'description'=>NULL,

        ]);
        Shift::create([
            'company_id'=>1,
            'status'=>1,
            'created_by'=>1,
            'name'=>'NIGHT H',
            'short_name'=>'NH',
            'from_time'=>'22:00:00',
            'to_time'=>'07:00:00',
            'duty_hour'=>9,
            'end_next_day'=>1,
            'effective_date'=>'2019-01-27',
            'description'=>NULL,
        ]);

        Shift::create([
            'company_id'=>1,
            'status'=>1,
            'created_by'=>1,
            'name'=>'MORNING I',
            'short_name'=>'MI',
            'from_time'=>'08:00:00',
            'to_time'=>'20:00:00',
            'duty_hour'=>12,
            'end_next_day'=>0,
            'effective_date'=>'2019-01-27',
            'description'=>NULL,
        ]);

        Shift::create([
            'company_id'=>1,
            'status'=>1,
            'created_by'=>1,
            'name'=>'NIGHT I',
            'short_name'=>'NI',
            'from_time'=>'20:00:00',
            'to_time'=>'08:00:00',
            'duty_hour'=>12,
            'end_next_day'=>1,
            'effective_date'=>'2019-01-27',
            'description'=>NULL,
        ]);

        Shift::create([
            'company_id'=>1,
            'status'=>1,
            'created_by'=>1,
            'name'=>'EVENING 1',
            'short_name'=>'E1',
            'from_time'=>'15:00:00',
            'to_time'=>'23:00:00',
            'duty_hour'=>8,
            'end_next_day'=>0,
            'effective_date'=>'2019-01-27',
            'description'=>NULL,
        ]);

        Shift::create([
            'company_id'=>1,
            'status'=>1,
            'created_by'=>1,
            'name'=>'MORNING N',
            'short_name'=>'MN',
            'from_time'=>'08:00:00',
            'to_time'=>'14:00:00',
            'duty_hour'=>6,
            'end_next_day'=>0,
            'effective_date'=>'2019-01-27',
            'description'=>NULL,
        ]);

        Shift::create([
            'company_id'=>1,
            'status'=>1,
            'created_by'=>1,
            'name'=>'EVENING 2',
            'short_name'=>'EN',
            'from_time'=>'14:00:00',
            'to_time'=>'20:00:00',
            'duty_hour'=>6,
            'end_next_day'=>0,
            'effective_date'=>'2019-01-27',
            'description'=>NULL,
        ]);
        Shift::create([
            'company_id'=>1,
            'status'=>1,
            'created_by'=>1,
            'name'=>'EVENING DOCTOR',
            'short_name'=>'ED',
            'from_time'=>'13:00:00',
            'to_time'=>'21:00:00',
            'duty_hour'=>8,
            'end_next_day'=>0,
            'effective_date'=>'2019-01-27',
            'description'=>NULL,
        ]);
    }
}
