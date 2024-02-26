<?php

namespace App\Exports;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\FromCollection;

class EmployeeExport implements FromCollection, WithHeadings
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function headings(): array
    {
        return [
            'Name',
            'Email',
            'Mobile',
            'Gender',
            'Blood Group',
            'Joining Date',
            'Designation',
            'Department',
            'Working Status',
            'Basic Salary',
            'Paid Days',
            'Earned Salary',
        ];
    }
    public function collection()
    {
        $userNames = [];

        $users = User::with('monthlysalary','monthlysalary.period','personaldata', 'professionaldata', 'professionaldata.designation', 'professionaldata.department', 'professionaldata.working')
            ->where('is_show', 1)
            ->orderByRaw('status DESC, first_name ASC')
            ->get();

        foreach ($users as $user) {
            $userNames[] = [
                'full_name' => $user->first_name . ' ' . $user->last_name ?? null,
                'email' => $user->email ?? null,
                'mobile' => $user->mobile ?? null,
                'gender' => $user->gender ?? null,
                'blood_group' => $user->personaldata->blood_group ?? null,
                'joining_date' => $user->professionaldata->joining_date ?? null,
                'designation' => $user->professionaldata->designation->name ?? null,
                'department' => $user->professionaldata->department->name ?? null,
                'working' => $user->professionaldata->working->name ?? null,
                'basic_salary' => $user->monthlysalary->basic ?? null,
                'paid_days' => $user->monthlysalary->paid_days ?? null,
                'earned_salary' => $user->monthlysalary->earned_salary ?? null,
            ];
        }

        return collect($userNames);
    }
}
