<?php

namespace App\Http\Controllers;

use App\Models\MonthlySalary;
use App\Models\OrgCalender;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Exports\SalaryWithHeldExport;
use Maatwebsite\Excel\Facades\Excel;
use function Symfony\Component\String\b;

class MonthlySalaryController extends Controller
{

    private $currentMonth;
    private $currentYear;

    public function __construct()
    {
        $this->currentMonth = now()->month;;
        $this->currentYear = now()->year;;
    }
    public function monthlySalaryForm() {
        $period_id = OrgCalender::where('salary_open', 'O')->first();

        if (!$period_id) {
            return back()->with('error', 'This month salary is not open');
        }

        // get current month salary year and month name
        $monthId = $period_id->month_id;
        $year = $period_id->calender_year;
        $carbonDate = Carbon::createFromDate($year, $monthId, 1);
        $salaryMonthName = $carbonDate->format('F');
        $salaryYear = $carbonDate->format('Y');

        return Inertia::render('Module/SalarySetup/GenerateMonthlySalary', [
            'salaryMonthName' => $salaryMonthName,
            'salaryYear' => $salaryYear
        ]);
    }
    public function monthlySalary()
    {
        $period_id = OrgCalender::where('salary_open', 'O')->first();

        if (!$period_id) {
            return back()->with('error', 'This month salary is not open');
        }
        $monthId = $period_id->month_id;
        $year = $period_id->calender_year;
        $last_day = Carbon::create($year, $monthId)->endOfMonth();

        $users =  User::with('professionaldata:id,user_id,bank_id', 'salary', 'arears')
            ->where('status', 1)
            ->where('is_show', 1)
            ->orderByRaw('status DESC, first_name ASC')
            ->select('id', 'company_id')
            ->get();

        foreach ($users as $user) {
            $userWithAttendances = $user->with(['attendances' => function ($query) {
                $currentMonth = Carbon::now()->format('m');
                $currentYear = Carbon::now()->format('Y');

                $query->whereMonth('attend_date', $currentMonth)
                    ->whereYear('attend_date', $currentYear);
            }])
                ->select('id')
                ->first();

            $attancdenceData = $userWithAttendances->attendances;
            $report = collect();
            $report['present'] = $attancdenceData ? $attancdenceData->where('late_flag', 0)->where('leave_id', 0)->where('attendance_datetime', true)->count() : null;
            $report['absense'] = $attancdenceData ? $attancdenceData->where('holiday_flag', 0)->where('offday_flag', 0)->where('leave_id', 0)->where('attendance_datetime', null)->count() : null;
            $report['off_days'] = $attancdenceData ? $attancdenceData->where('holiday_flag', 0)->where('offday_flag', 1)->whereNull('attendance_datetime')->count() : null;
            $report['leave'] = $attancdenceData ? $attancdenceData->where('leave_id', '!=', 0)->where('holiday_flag', 0)->count() : null;
            $report['total_late_count'] = $attancdenceData ? $attancdenceData->where('late_flag', 1)->where('attendance_datetime', !null)->count() : null;

            $paid_days = ($last_day->day - floor($report['total_late_count'] / 3));
            $gross_salary = $user->salary?->basic + $user->salary?->house_rent + $user->salary?->medical + $user->salary?->conveyance + $user->salary?->entertainment + $user->salary?->others_allowance;
            $one_day_salary = $gross_salary / $last_day->day;

            $arear_amount = $user?->arears?->amount;
            $earned_salary = ($paid_days * $one_day_salary) + $arear_amount;
            $net_salary = $earned_salary - ($user->salary?->income_tax + $user->salary?->mobile_others + $user->salary?->food + $user->salary?->stamp_fee);

            MonthlySalary::updateOrCreate([
                'user_id' => $user->id,
                'period_id' => $period_id->id,
            ], [
                'company_id' => $user->company_id,
                'user_id' => $user->id,
                'period_id' => $period_id->id,
                'bank_id' => $user->professionaldata->bank_id ?? 1,
                'created_by' => Auth::id(),
                'basic' => $user->salary->basic ?? 0,
                'house_rent' => $user->salary->house_rent ?? 0,
                'medical' =>  $user->salary->medical ?? 0,
                'conveyance' =>  $user->salary->conveyance ?? 0,
                'entertainment' =>  $user->salary->entertainment ?? 0,
                'other_allowance' =>  $user->salary->others_allowance ?? 0,
                'gross_salary' =>  $gross_salary ?? 0,
                'cash_salary' => $user?->professionaldata?->bank_id ?? $gross_salary,
                'paid_days' => $paid_days ?? 0,
                'earned_salary' => $earned_salary ?? 0,
                'arear_amount' => $arear_amount ?? 0,
                'income_tax' => $user->salary->income_tax ?? 0,
                'mobile_others' => $user->salary->mobile_others ?? 0,
                'food_charge' => $user->salary->food ?? 0,
                'stamp_fee' => $user->salary->stamp_fee ?? 0,
                'net_salary' => $net_salary ?? 0,
            ]);
        }

        $carbonDate = Carbon::createFromDate($year, $monthId, 1);
        $monthName = $carbonDate->format('M');
        $year = $carbonDate->format('Y');

        $successMessage = 'Date: ' . $monthName . ',' . ' ' . $year . '<br> Generated Successfully';

        return back()->with('success', $successMessage);
    }

    public function monthSalary()
    {
        $salaries = MonthlySalary::with('user')
            ->whereMonth('created_at', $this->currentMonth)
            ->whereYear('created_at', $this->currentYear)
            ->get();

        return Inertia::render('Module/SalarySetup/MonthlySalary', [
            'salaries' => $salaries
        ]);
    }

    public function editMonthSalary($id)
    {
        $result = MonthlySalary::with(['user:id,first_name,last_name,machine_user_id', 'user.professionaldata:id,user_id,department_id,designation_id,joining_date', 'user.professionaldata.department:id,name', 'user.professionaldata.designation:id,name'])
            ->where('id', $id)
            ->whereMonth('created_at', $this->currentMonth)
            ->whereYear('created_at', $this->currentYear)
            ->first();

        $period_id = OrgCalender::where('salary_open', 'O')->first();

        if (!$period_id) {
            return back()->with('error', 'This month salary is not open');
        }

        // get current month salary year and month name
        $monthId = $period_id->month_id;
        $year = $period_id->calender_year;
        $carbonDate = Carbon::createFromDate($year, $monthId, 1);
        $salaryMonthName = $carbonDate->format('F');
        $salaryYear = $carbonDate->format('Y');

        return Inertia::render('Module/SalarySetup/EditMonthlySalary', [
            'result' => $result,
            'salaryMonthName' => $salaryMonthName,
            'salaryYear' => $salaryYear,
        ]);
    }
    public function editMonthSalaryUpdate(Request $request)
    {
        if (!(isset($request->paid_days)) || !(isset($request->withheld))) {
            return back()->with('error', 'You have to provide Paid Days and Withheld.');
        }

        $oldSalaryData = MonthlySalary::where('id', $request->id)
            ->whereMonth('created_at', $this->currentMonth)
            ->whereYear('created_at', $this->currentYear)
            ->select('paid_days', 'earned_salary')
            ->first();

        $newEarnedSalary = $request->earned_salary;

        // new earned salary calculation and number format
        if ($oldSalaryData->paid_days > 0) {
            $newEarnedSalary = ($oldSalaryData->earned_salary / $oldSalaryData->paid_days) * $request->paid_days;
            $roundedSalary = ceil($newEarnedSalary * 100) / 100;

            $newEarnedSalary = number_format($roundedSalary, 2, '.', '');
        }

       MonthlySalary::where('id', $request->id)->update([
            // 'advance' => $request->advance,
            // 'arear_amount' => $request->arear_amount,
            // 'basic' => $request->basic,
            // 'cash_salary' => $request->cash_salary,
            // 'conveyance' => $request->conveyance,
            'paid_days' => $request->paid_days,
            'earned_salary' => $newEarnedSalary,
            // 'entertainment' => $request->entertainment,
            // 'final' => $request->final,
            // 'food_charge' => $request->food_charge,
            // 'gross_salary' => $request->gross_salary,
            // 'house_rent' => $request->house_rent,
            // 'income_tax' => $request->income_tax,
            // 'increment_amt' => $request->increment_amt,
            // 'medical' => $request->medical,
            // 'mobile_others' => $request->mobile_others,
            // 'net_salary' => $request->net_salary,
            // 'other_allowance' => $request->other_allowance,
            // 'payable_salary' => $request->payable_salary,
            // 'stamp_fee' => $request->stamp_fee,
            'withheld' => $request->withheld,
            // 'remarks' => $request->remarks,
            'reason' => $request->reason,
        ]);

        return back()->with('success', 'Data updated successfully');
    }
    public function salaryHeldReport(){
        return Inertia::render('Module/SalaryReport/WithHeld/SalaryHeldReport');
    }
    public function getSalaryHeldData($year, $month){
        
        $data = MonthlySalary::with(['user:id,first_name,last_name,email,mobile', 'user.professionaldata:id,user_id,department_id,designation_id,joining_date', 'user.professionaldata.department:id,name', 'user.professionaldata.designation:id,name'])
        ->where('withheld', 1)
        ->whereMonth('created_at', $month)
        ->whereYear('created_at', $year)
        ->get();

        if ($data->isEmpty()) {
            return back()->with('error', 'No data available for the specified year and month');
        }

        return Inertia::render('Module/SalaryReport/WithHeld/SalaryHeldReportView', [
            'data' => $data,
            'year' => $year,
            'month' => $month
        ]);
    }

    public function salaryHeldExport($year, $month){
        return Excel::download(new SalaryWithHeldExport($year, $month), 'Salary_With_Held.xlsx');
    }
}
