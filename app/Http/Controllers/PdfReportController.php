<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Religions;
use App\Models\Attendance;
use App\Models\Department;
use App\Models\Designation;
use App\Models\OrgCalender;
use App\Models\PunchDetails;
use Illuminate\Http\Request;
use App\Models\AssetAssigned;
use App\Models\MonthlySalary;
use App\Models\WorkingStatus;
use App\Models\TaskManagement;
use Illuminate\Support\Carbon;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\LeaveApplication;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class PdfReportController extends Controller
{
   public function employeeAttendanceDateRangeWise(){
       $users = User::where('status',1)->get();
        return Inertia::render('Module/PdfReport/EmployeeAttendanceDateRangeWise',[
            'users' => $users
        ]);
   }
   public function employeeAttendanceDateRangeWiseReport(Request $request){

       $request->validate([
           'user_id' => 'required',
           'from_date' => 'required',
           'to_date' => 'required',
       ]);

       $data = User::with(['attendances.shift', 'company', 'professionaldata.department', 'attendances' => function ($query) use ($request) {
        $query->whereBetween('attend_date', [$request->from_date, $request->to_date]);
    }])->where('id', $request->user_id)->first();


       $pdf = PDF::loadView('pdf.employee-attendance', [
           'data' => $data,
           'from' => $request->from_date,
           'to' => $request->to_date,
       ]);
       $filename = 'Emp'. '.pdf';
       $pdf->save(public_path('pdfs/' . $filename));
       return Inertia::render('Module/PdfReport/EmployeeAttendanceDateRangeWiseReport',[
           'filename' => $filename
       ]);
   }
    public function departmentAttendanceDateRangeWise(){
        $departments = Department::where('status',1)->get();
        return Inertia::render('Module/PdfReport/DepartmentAttendanceDateRangeWise',[
            'departments' => $departments
        ]);
    }
    public function departmentAttendanceDateRangeWiseReport(Request $request){
        $request->validate([
            'from_date' => 'required',
            'to_date' => 'required',
            'department_id' => 'required',
        ]);

        if($request->department_id == "all"){

            $data['users'] = User::with(['professionaldata', 'attendances' => function ($query) use ($request) {
                if ($request->from_date == $request->to_date) {
                    $query->whereDate('attend_date', $request->from_date);
                } else {
                    $query->whereBetween('attend_date', [$request->from_date, $request->to_date]);
                }
            }])
                ->whereHas('attendances', function ($query) use ($request) {
                    if ($request->from_date == $request->to_date) {
                        $query->whereDate('attend_date', $request->from_date);
                    } else {
                        $query->whereBetween('attend_date', [$request->from_date, $request->to_date]);
                    }
                })
                ->get();
            $allData = $data['users']->map(function ($user){
                $report = collect();
                $report->id = $user->id;
                $report->full_name = $user->first_name.' '.$user->last_name;
                $report->designation = $user->professionaldata?->designation?->name;
                $report->department = $user->professionaldata?->department?->name;

                $report->present = $user->attendances ? $user->attendances->where('late_flag', 0)->where('leave_id', 0)->where('attendance_datetime', true)->count() : null;
                $report->absense = ($user->attendances) ? $user->attendances->where('holiday_flag',0)->where('offday_flag',0)->where('leave_id',0)->where('attendance_datetime',null)->count():null;
                $report->off_days = $user->attendances ? $user->attendances->where('holiday_flag',0)->where('offday_flag',1)->whereNull('attendance_datetime')->count():null;
                $report->leave = ($user->attendances)?$user->attendances->where('leave_id','!=', 0)->where('holiday_flag',0)->count():null;
                $report->total_late_count = ($user->attendances)?$user->attendances->where('late_flag',1)->where('attendance_datetime',!null)->count():null;
                return $report;
            });
        }else{

            $data['users'] = User::with(['professionaldata', 'attendances' => function ($query) use ($request) {
                $query->where('department_id', $request->department_id);
                if ($request->from_date == $request->to_date) {
                    $query->whereDate('attend_date', $request->from_date);
                } else {
                    $query->whereBetween('attend_date', [$request->from_date, $request->to_date]);
                }
            }])
                ->whereHas('attendances', function ($query) use ($request) {
                    $query->where('department_id', $request->department_id);
                    if ($request->from_date == $request->to_date) {
                        $query->whereDate('attend_date', $request->from_date);
                    } else {
                        $query->whereBetween('attend_date', [$request->from_date, $request->to_date]);
                    }
                })
                ->get();

            $allData = $data['users']->map(function ($user) {
                $report = collect();
                $report->id = $user->id;
                $report->full_name = $user->first_name.' '.$user->last_name;
                $report->designation = $user->professionaldata?->designation?->name;
                $report->department = $user->professionaldata?->department?->name;

            $report->present = $user->attendances ? $user->attendances->where('late_flag', 0)->where('leave_id', 0)->where('attendance_datetime', true)->count() : null;
            $report->absense = ($user->attendances) ? $user->attendances->where('holiday_flag',0)->where('offday_flag',0)->where('leave_id',0)->where('attendance_datetime',null)->count():null;
            $report->off_days = $user->attendances ? $user->attendances->where('holiday_flag',0)->where('offday_flag',1)->whereNull('attendance_datetime')->count():null;
            $report->leave = ($user->attendances)?$user->attendances->where('leave_id','!=', 0)->where('holiday_flag',0)->count():null;
            $report->total_late_count = ($user->attendances)?$user->attendances->where('late_flag',1)->where('attendance_datetime',!null)->count():null;
            return $report;

        });

        }


        $department=Department::with('company')->where('id',$request->department_id)->first();
        $pdf = PDF::loadView('pdf.department-attendance', [
            'data' => $allData,
            'department' => $department,
            'from' => $request->from_date,
            'to' => $request->to_date,
            'total_days'=>Carbon::parse($request->from_date)->diffInDays(Carbon::parse($request->to_date))
        ]);
        $filename = 'Dept'. '.pdf';
        $pdf->save(public_path('pdfs/' . $filename));
        return Inertia::render('Module/PdfReport/DepartmentAttendanceDateRangeWiseReport',[
            'filename' => $filename
        ]);
    }
    public function allEmployeetAttendanceDateRangeWise(){
        return Inertia::render('Module/PdfReport/AllEmployeeAttendanceDateRangeWise');
    }
    public function allEmployeeAttendanceDateRangeWiseReport(Request $request){
        $request->validate([
            'from_date' => 'required',
            'to_date' => 'required',
        ]);

        $data['users'] = User::with(['professionaldata', 'attendances' => function ($query) use ($request) {
            if ($request->from_date == $request->to_date) {
                $query->whereDate('attend_date', $request->from_date);
            } else {
                $query->whereBetween('attend_date', [$request->from_date, $request->to_date]);
            }
        }])
            ->whereHas('attendances', function ($query) use ($request) {
                if ($request->from_date == $request->to_date) {
                    $query->whereDate('attend_date', $request->from_date);
                } else {
                    $query->whereBetween('attend_date', [$request->from_date, $request->to_date]);
                }
            })
            ->get();

        $allData = $data['users']->map(function ($user){
            $report = collect();
            $report->id = $user->id;
            $report->full_name = $user->first_name.' '.$user->last_name;
            $report->designation = $user->professionaldata?->designation?->name;
            $report->department = $user->professionaldata?->department?->name;
            $report->present = $user->attendances ? $user->attendances->where('late_flag', 0)->where('leave_id', 0)->where('attendance_datetime', true)->count() : null;
            $report->absense = ($user->attendances) ? $user->attendances->where('holiday_flag',0)->where('offday_flag',0)->where('leave_id',0)->where('attendance_datetime',null)->count():null;
            $report->off_days = $user->attendances ? $user->attendances->where('holiday_flag',0)->where('offday_flag',1)->whereNull('attendance_datetime')->count():null;
            $report->leave = ($user->attendances)?$user->attendances->where('leave_id','!=', 0)->where('holiday_flag',0)->count():null;
            $report->total_late_count = ($user->attendances)?$user->attendances->where('late_flag',1)->where('attendance_datetime',!null)->count():null;
            return $report;
        });
//    dd($allData);
        $pdf = PDF::loadView('pdf.all-emp-attendance', [
            'data' => $allData,
            'from' => $request->from_date,
            'to' => $request->to_date,
            'total_days'=>Carbon::parse($request->from_date)->diffInDays(Carbon::parse($request->to_date))
        ]);
        $filename = 'allEmp'. '.pdf';
        $pdf->save(public_path('pdfs/' . $filename));
        return Inertia::render('Module/PdfReport/AllEmployeeAttendanceDateRangeWiseReport',[
            'filename' => $filename
        ]);
    }
    public function punchDetailsDateRangeWise(){
       $users = $users = User::where('status',1)->get();
        return Inertia::render('Module/PdfReport/PunchDetailsDateRangeWise',[
            'users' => $users,
        ]);
    }
    public function punchDetailsDateRangeWiseReport(Request $request){


        if($request->date_range == "single"){
            $request->validate([
                'from_date' => 'required',
                'user_id' => 'required',
            ]);

            $results = User::with(['professionaldata.designation', 'professionaldata.department', 'punches' => function ($query) use ($request) {
                $query->whereDate('attendance_datetime', $request->from_date);
            }])->where('id', $request->user_id)->first();

            return Inertia::render('Module/PdfReport/PunchDetailsDateRangeWiseReport', [
                'results' => $results,
            ]);


        }
        elseif($request->date_range == "range"){

            $request->validate([
                'from_date' => 'required',
                'to_date' => 'required',
                'user_id' => 'required',
            ]);

//            $results = User::with(['professionaldata.designation', 'professionaldata.department', 'punches' => function ($query) use ($request) {
//                $query->whereBetween('attendance_datetime', [$request->from_date, $request->to_date]);
//            }])->where('id', $request->user_id)->first();

            $results = User::with(['professionaldata.designation', 'professionaldata.department', 'punches' => function ($query) use ($request) {
                if ($request->from_date == $request->to_date) {
                    $query->whereDate('attendance_datetime', '=', $request->from_date);
                } else {
                    $query->whereBetween('attendance_datetime', [$request->from_date, $request->to_date]);
                }
            }])->where('id', $request->user_id)->first();

            return Inertia::render('Module/PdfReport/PunchDetailsDateRangeWiseReport',[
                'results' => $results,
            ]);

        }

    }
    public function lateFlagReport(){
        $currentMonth = Carbon::now()->format('m');
        $currentYear = Carbon::now()->format('Y');

        $late_flag_count = User::with(['attendances' => function ($query) use ($currentMonth, $currentYear) {
            $query->selectRaw('user_id, COUNT(late_flag) as late_flag_count')
                ->whereMonth('attend_date', $currentMonth)
                ->whereYear('attend_date', $currentYear)
                ->where('late_flag', 1)
                ->groupBy('user_id')
                ->havingRaw('COUNT(late_flag) >= 3');
        }])
            ->orderBy('first_name', 'ASC')
            ->get();

        $late_flag_count_value = $late_flag_count->filter(function ($user) {
            return $user->attendances->isNotEmpty();
        });

        $data = $late_flag_count_value->values();


        $pdf = PDF::loadView('pdf.late-flag-report', [
            'data' => $data,
        ]);
        $filename = 'lateFlag'. '.pdf';
        $pdf->save(public_path('pdfs/' . $filename));
        return Inertia::render('Module/PdfReport/LateFlagReport',[
            'filename' => $filename
        ]);

    }
    public function allTypeEmployee(){
       $departments = Department::select('id','name')->get();
       $designations = Designation::select('id','name')->get();
       $religions = Religions::select('id','name')->get();
       $working_status = WorkingStatus::select('id','name')->get();
        return Inertia::render('Module/PdfReport/AllTypeEmployeeReport',[
            'departments'=>$departments,
            'designations'=>$designations,
            'religions'=>$religions,
            'working_status'=>$working_status
        ]);
    }
    public function allTypeEmployeeReport(request $request){
       if ($request->emp_dept == "all"){
           if($request->date_range == "yes"){
//               show all employ with working status and date range
               dd("all+yes");
           }else{
//               show here all employees
               dd("all+no");

           }
       }
       if($request->emp_dept == "dept"){
           if($request->date_range == "no"){

               if($request->department_id !== "all"){
                   dd("all_dept+no date range");
               }
               if ($request->department_id === "all"){

               }
           }else{
               dd("dept+yes");
           }
       }
    }
    public function employeeLeaveApplication(){
        $users = User::where('status',1)->get();
        return Inertia::render('Module/PdfReport/EmployeeLeaveApplication',[
            'users' => $users
        ]);
    }
    public function employeeLeaveApplicationReport(Request $request){
        $request->validate([
            'user_id' => 'required',
            'from_date' => 'required',
            'to_date' => 'required',
        ]);

//        $data = LeaveApplication::with('user','leavecategory')->whereBetween('approve_date', [$request->from_date, $request->to_date])
//            ->where('user_id',$request->user_id)
//            ->where('approve_id',1)
//            ->get();

        $data = LeaveApplication::with('user', 'leavecategory')
            ->where('user_id', $request->user_id);

        if ($request->from_date != $request->to_date) {
            $data->whereBetween('approve_date', [$request->from_date, $request->to_date]);
        } else {
            $data->whereDate('approve_date', $request->from_date);
        }

        $data = $data->get();

        $department = User::with(['professionaldata.department'])->where('id', $request->user_id)->first();

        if(count($data)){
            $pdf = PDF::loadView('pdf.employee-leave-application', [
                'data' => $data,
                'from' => $request->from_date,
                'to' => $request->to_date,
                'department' => $department,
            ]);
            $filename = 'Emp-Leave'. '.pdf';
            $pdf->save(public_path('pdfs/' . $filename));
            return Inertia::render('Module/PdfReport/EmployeeLeaveApplicationReport',[
                'filename' => $filename
            ]);
        }else{
            return back()->with('error','This person never leave this between dates');
        }
    }
    public function allOrDeptLeaveApplication(){
        $departments = Department::where('status',1)->get();
        return Inertia::render('Module/PdfReport/AllOrDeptLeaveApplication',[
            'departments' => $departments
        ]);
    }
    public function allOrDeptLeaveApplicationReport(Request $request){
        $request->validate([
            'department_id' => 'required',
            'from_date' => 'required',
            'to_date' => 'required',
        ]);

        if($request->department_id == "all"){
//            $data = LeaveApplication::with('user', 'leavecategory')
//                ->where(function ($query) use ($request) {
//                    if ($request->from_date == $request->to_date) {
//                        $query->whereDate('approve_date', '=', $request->from_date);
//                    } else {
//                        $query->whereBetween('approve_date', [$request->from_date, $request->to_date]);
//                    }
//                })
//                ->get();
            $departments = Department::with('company')->get();
        }else{
//            $userIdsArray = User::whereHas('professionaldata', function ($query) use ($request) {
//                $query->where('department_id', $request->department_id);
//            })
//                ->pluck('id')
//                ->toArray();
//
////            dd($userIdsArray);
//
//            $data = LeaveApplication::with('user', 'leavecategory')
//                ->whereIn('user_id', $userIdsArray)
//                ->where(function ($query) use ($request) {
//                    if ($request->from_date != $request->to_date) {
//                        $query->whereBetween('approve_date', [$request->from_date, $request->to_date]);
//                    }else{
//                        $query->whereDate('approve_date', $request->from_date);
//                    }
//                })
//                ->get();
            $departments=Department::with('company')->where('id',$request->department_id)->get();
        }

        $pdf = PDF::loadView('pdf.dept-leave-application', [
//            'data' => $data,
            'departments'=>$departments,
            'from' => $request->from_date,
            'to' => $request->to_date,
        ]);
        $filename = 'Dept-Leave'. '.pdf';
        $pdf->save(public_path('pdfs/' . $filename));
        return Inertia::render('Module/PdfReport/AllOrDeptLeaveApplicationReport',[
            'filename' => $filename
        ]);
    }
    public function employeeLeaveDetailsMonthYear(){
        return Inertia::render('Module/PdfReport/EmployeeLeaveDetailsMonthYear');
    }
    public function employeeLeaveDetailsMonthYearReport(Request $request){
        $request->validate([
            'year' => 'required|integer|min:1900|max:9999',
            'month' => 'required|integer|min:1|max:12',
        ]);
        $dateString = sprintf('%04d-%02d', $request->year, $request->month);

        $carbonDate = Carbon::parse($dateString);
        $formattedDate = $carbonDate->format('M, Y');

        $data = LeaveApplication::with('user', 'leavecategory')->whereRaw("DATE_FORMAT(created_at, '%Y-%m') = ?", [$dateString])
            ->get();

        $company = User::with('company')->where('id', Auth::id())->first();

        $pdf = PDF::loadView('pdf.emp-my-leave-report', [
            'data' => $data,
            'date'=>$formattedDate,
            'company'=>$company
        ]);

        $filename = 'Emp-M&Y'. '.pdf';
        $pdf->save(public_path('pdfs/' . $filename));
        return Inertia::render('Module/PdfReport/AllOrDeptLeaveApplicationReport',[
            'filename' => $filename
        ]);

    }

    public function taskDetailsReport(){
        $users = User::where('status',1)->get();
        return Inertia::render('Module/PdfReport/TaskDetailsReport',[
            'users'=>$users,
        ]);
    }
    public function taskDetailsReportSave(Request $request){
        if($request->status == 'all'){
            $data = TaskManagement::whereHas('users', function ($query) use ($request) {
                $query->where('user_id', $request->user_id);
            })
                ->whereBetween('submit_date', [$request->from_date, Carbon::parse($request->to_date)->addDay()])
                ->with('project')
                ->get();
        }else if($request->status == 'c'){
           $data = TaskManagement::whereHas('users', function ($query) use ($request) {
               $query->where('user_id', $request->user_id);
           })
               ->whereBetween('submit_date', [$request->from_date, Carbon::parse($request->to_date)->addDay()])
               ->where('task_status', 'C')
               ->with('project')
               ->get();

       }else if($request->status == 'p'){
           $data = TaskManagement::whereHas('users', function ($query) use ($request) {
               $query->where('user_id', $request->user_id);
           })
               ->whereBetween('submit_date', [$request->from_date, Carbon::parse($request->to_date)->addDay()])
               ->where('task_status', 'P')
               ->with('project')
               ->get();
       }else if($request->status == 'r'){
           $data = TaskManagement::whereHas('users', function ($query) use ($request) {
               $query->where('user_id', $request->user_id);
           })
               ->whereBetween('submit_date', [$request->from_date, Carbon::parse($request->to_date)->addDay()])
               ->where('task_status', 'R')
               ->with('project')
               ->get();
       }else{
           $data = TaskManagement::whereHas('users', function ($query) use ($request) {
               $query->where('user_id', $request->user_id);
           })
               ->whereBetween('submit_date', [$request->from_date, Carbon::parse($request->to_date)->addDay()])
               ->where('task_status', 'A')
               ->with('project')
               ->get();
           }
       $user = User::with('company','professionaldata.department','professionaldata.designation')->where('id', $request->user_id)->first();

        $pdf = PDF::loadView('pdf.task-report', [
            'data' => $data,
            'user' => $user,
            'from' => $request->from_date,
            'to' => $request->to_date,

        ]);
        $filename = 'Task'. '.pdf';
        $pdf->save(public_path('pdfs/' . $filename));
        return Inertia::render('Module/PdfReport/AllOrDeptLeaveApplicationReport',[
            'filename' => $filename
        ]);
    }

    public function assetDetailsReport(){
        $users = User::where('status',1)->get();
        return Inertia::render('Module/PdfReport/AssetDetailsReport',[
            'users'=>$users,
        ]);
    }

    public function assetDetailsReportSave(Request $request){
        $request->validate([
            'user_id' => 'required',
        ]);
        $data = AssetAssigned::with(['assettype.company', 'asset', 'employee'])
            ->where('employee_id', $request->user_id)
            ->get();

        $pdf = PDF::loadView('pdf.asset-report', [
            'data' => $data,
        ]);

        $filename = 'Emp-Asset'. '.pdf';
        $pdf->save(public_path('pdfs/' . $filename));
        return Inertia::render('Module/PdfReport/AssetAssignedReport',[
            'filename' => $filename
        ]);
    }
    public function salaryGeneratePdf()
    {
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

        $salaryData = MonthlySalary::with('user','bank','period','company')->get();
        $pdf = PDF::loadView('pdf.salary-report', [
            'data' => $salaryData,
            'salaryMonthName' => $salaryMonthName,
            'salaryYear' => $salaryYear
        ]);

        $filename = 'Salary'. '.pdf';
        $pdf->save(public_path('pdfs/' . $filename));

        return Inertia::render('Module/PdfReport/SalaryReport',[
            'filename' => $filename
        ]);
    }

    public function salaryHeldPdf($year, $month)
    {
        $carbonDate = Carbon::createFromDate($year, $month, 1);
        $salaryMonthName = $carbonDate->format('F');
        $salaryYear = $carbonDate->format('Y');

        $salaryData = MonthlySalary::with('user','bank','period','company')->where('withheld','1')->get();
        $pdf = PDF::loadView('pdf.salary-held-report', [
            'data' => $salaryData,
            'salaryMonthName' => $salaryMonthName,
            'salaryYear' => $salaryYear
        ]);

        $filename = 'Salary'. '.pdf';
        $pdf->save(public_path('pdfs/' . $filename));

        return Inertia::render('Module/PdfReport/SalaryHeldReport',[
            'filename' => $filename
        ]);
    }

}

