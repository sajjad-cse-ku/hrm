<?php

namespace App\Exports;

use App\Models\MonthlySalary;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\FromCollection;

class SalaryWithHeldExport implements FromCollection,WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    protected $year;
    protected $month;

    public function __construct($year, $month)
    {
        $this->year = $year;
        $this->month = $month;
    }

    public function headings():array{
        return[
            'Name',
            'Email',
            'Mobile',
            'Designation',
            'Department',
            'Paid Days',
            'Earned Salary',
            'Reason'
        ];
    } 
    public function collection()
    {
        $heldSalaryArr = [];

        $heldSalary = MonthlySalary::with(['user:id,first_name,last_name,email,mobile', 'user.professionaldata:id,user_id,department_id,designation_id,joining_date', 'user.professionaldata.department:id,name', 'user.professionaldata.designation:id,name'])
        ->where('withheld', 1)
        ->whereMonth('created_at', $this->month)
        ->whereYear('created_at', $this->year)
        ->get();

        foreach ($heldSalary as $salary) {
            $heldSalaryArr[] = [
                'full_name' => $salary->user->first_name . ' ' . $salary->user->last_name ?? null,
                'email' => $salary->user->email ?? null,
                'mobile' => $salary->user->mobile ?? null,
                'designation' => $salary->user->professionaldata->designation->name ?? null,
                'department' => $salary->user->professionaldata->department->name ?? null,
                'paid_days' => $salary->paid_days ?? null,
                'earned_salary' => $salary->earned_salary ?? null,
                'reason' => $salary->reason ?? null,
            ];
        }

        return collect($heldSalaryArr);
    }
}
