<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Department;
use App\Models\Designation;
use App\Models\LeaveApplication;
use App\Models\PunchDetails;
use App\Models\Religions;
use App\Models\User;
use App\Models\WorkingStatus;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

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

       $data = User::with(['company','professionaldata','attendances','attendances.shift' => function ($query) use ($request) {
           $query->whereBetween('attend_date', [$request->from_date, $request->to_date]);
       }])->first();

       $pdf = PDF::loadView('pdf.employee-attendance', [
           'data' => $data,
           'from' => $request->from_date,
           'to' => $request->to_date,
       ]);
       $filename = 'Emp'.now() . '.pdf';
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

        if(!$request->filled('to_date')) $request->to_date = $request->from_date;

        if($request->department_id == "all"){
            $data['users'] = User::with('professionaldata','attendances')
                ->whereHas('attendances', function ($query) use ($request) {
                       $query ->whereBetween('attend_date', [$request->from_date, $request->to_date]);
                })
                ->get();
            $allData = $data['users']->map(function ($user){
                $report = collect();
                $report->id = $user->id;
                $report->full_name = $user->first_name.' '.$user->last_name;
                $report->designation = $user->professionaldata?->designation?->name;
                $report->department = $user->professionaldata?->department?->name;
                $report->present = ($user->attendances)?$user->attendances->where('late_flag',0)->count():null;
                $report->absense = ($user->attendances)?$user->attendances->whereNull('entry_time')->count():null;
                $report->off_days = ($user->attendances)?$user->attendances->where('offday_flag',true)->count():null;
                $report->leave = ($user->attendances)?$user->attendances->where('leave_id',true)->count():null;
                $report->total_late_count = ($user->attendances)?$user->attendances->where('late_flag',true)->count():null;
                return $report;
            });

        }else{
            $data['users'] = User::with('professionaldata','attendances')
                ->whereHas('attendances', function ($query) use ($request) {
                    $query->where('department_id', $request->department_id)
                        ->whereBetween('attend_date', [$request->from_date, $request->to_date]);
                })
                ->groupBy('id')
                ->get();
        }
        $allData = $data['users']->map(function ($user) {
            $report = collect();
            $report->id = $user->id;
            $report->full_name = $user->first_name.' '.$user->last_name;
            $report->designation = $user->professionaldata?->designation?->name;
            $report->department = $user->professionaldata?->department?->name;
            $report->present = ($user->attendances)?$user->attendances->where('late_flag',0)->count():null;
            $report->absense = ($user->attendances)?$user->attendances->whereNull('entry_time')->count():null;
            $report->off_days = ($user->attendances)?$user->attendances->where('offday_flag',true)->count():null;
            $report->leave = ($user->attendances)?$user->attendances->where('leave_id',true)->count():null;
            $report->total_late_count = ($user->attendances)?$user->attendances->where('late_flag',true)->count():null;
            return $report;

        });

        $department=Department::with('company')->where('id',$request->department_id)->first();
        $pdf = PDF::loadView('pdf.department-attendance', [
            'data' => $allData,
            'department' => $department,
            'from' => $request->from_date,
            'to' => $request->to_date,
            'total_days'=>Carbon::parse($request->from_date)->diffInDays(Carbon::parse($request->to_date))
        ]);
        $filename = 'Dept'.now() . '.pdf';
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

        $data['users'] = User::with('professionaldata','attendances')
            ->whereHas('attendances', function ($query) use ($request) {
                $query->whereBetween('attend_date', [$request->from_date, $request->to_date]);
            })
            ->get();

        $allData = $data['users']->map(function ($user){
            $report = collect();
            $report->id = $user->id;
            $report->full_name = $user->first_name.' '.$user->last_name;
            $report->designation = $user->professionaldata?->designation?->name;
            $report->department = $user->professionaldata?->department?->name;
            $report->present = ($user->attendances)?$user->attendances->where('late_flag',0)->count():null;
            $report->absense = ($user->attendances)?$user->attendances->whereNull('entry_time')->count():null;
            $report->off_days = ($user->attendances)?$user->attendances->where('offday_flag',true)->count():null;
            $report->leave = ($user->attendances)?$user->attendances->where('leave_id',true)->count():null;
            $report->total_late_count = ($user->attendances)?$user->attendances->where('late_flag',true)->count():null;
            return $report;
        });
//    dd($allData);
        $pdf = PDF::loadView('pdf.all-emp-attendance', [
            'data' => $allData,
            'from' => $request->from_date,
            'to' => $request->to_date,
            'total_days'=>Carbon::parse($request->from_date)->diffInDays(Carbon::parse($request->to_date))
        ]);
        $filename = 'allEmp'.now() . '.pdf';
        $pdf->save(public_path('pdfs/' . $filename));
        return Inertia::render('Module/PdfReport/AllEmployeeAttendanceDateRangeWiseReport',[
            'filename' => $filename
        ]);
    }
    public function punchDetailsDateRangeWise(){
        return Inertia::render('Module/PdfReport/PunchDetailsDateRangeWise');
    }
    public function punchDetailsDateRangeWiseReport(Request $request){
        $request->validate([
            'from_date' => 'required',
            'to_date' => 'required',
        ]);

        $data = PunchDetails::whereBetween('attendance_datetime', [$request->from_date, $request->to_date])->get();
//        $data['user']=$data;

        $pdf = PDF::loadView('pdf.punch-details-attendance', [
            'data' => $data,
            'from' => $request->from_date,
            'to' => $request->to_date,
        ]);
        $filename = 'punchDetails'.now() . '.pdf';
        $pdf->save(public_path('pdfs/' . $filename));
        return Inertia::render('Module/PdfReport/PunchDetailsDateRangeWiseReport',[
            'filename' => $filename
        ]);
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
        $filename = 'lateFlag'.now() . '.pdf';
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

        $data = LeaveApplication::with('user','leavecategory')->whereBetween('approve_date', [$request->from_date, $request->to_date])
            ->where('user_id',$request->user_id)
            ->where('approve_id',1)
            ->get();

//        dd($data);

        if(count($data)){
            $pdf = PDF::loadView('pdf.employee-leave-application', [
                'data' => $data,
                'from' => $request->from_date,
                'to' => $request->to_date,
            ]);
            $filename = 'Emp-Leave'.now() . '.pdf';
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
            $data = LeaveApplication::with('user','leavecategory')->whereBetween('approve_date', [$request->from_date, $request->to_date])
                ->where('approve_id',1)->get();
        }else{
            $userIdsArray = User::whereHas('professionaldata', function ($query) use ($request) {
                $query->where('department_id', $request->department_id);
            })
                ->pluck('id')
                ->toArray();

            $data = LeaveApplication::with('user', 'leavecategory')
                ->whereIn('user_id', $userIdsArray)
                ->whereBetween('approve_date', [$request->from_date, $request->to_date])
                ->where('approve_id', 1)
                ->get();

        }
//        dd($data);
        $department=Department::with('company')->where('id',$request->department_id)->first();
        $pdf = PDF::loadView('pdf.dept-leave-application', [
            'data' => $data,
            'department'=>$department,
            'from' => $request->from_date,
            'to' => $request->to_date,
        ]);
        $filename = 'Dept-Leave'.now() . '.pdf';
        $pdf->save(public_path('pdfs/' . $filename));
        return Inertia::render('Module/PdfReport/AllOrDeptLeaveApplicationReport',[
            'filename' => $filename
        ]);
    }
    public function employeeLeaveDetailsMonthYear(){
        return Inertia::render('Module/PdfReport/EmployeeLeaveDetailsMonthYear');
    }
    public function employeeLeaveDetailsMonthYearReport(Request $request){
        $dateString = sprintf('%04d-%02d', $request->year, $request->month);

        $carbonDate = Carbon::parse($dateString);
        $formattedDate = $carbonDate->format('M, Y');

        $data = LeaveApplication::with('user', 'leavecategory')->whereRaw("DATE_FORMAT(created_at, '%Y-%m') = ?", [$dateString])
            ->where('approve_id', 1)
            ->get();

        $pdf = PDF::loadView('pdf.emp-my-leave-report', [
            'data' => $data,
            'date'=>$formattedDate
        ]);
        $filename = 'Emp-M&Y'.now() . '.pdf';
        $pdf->save(public_path('pdfs/' . $filename));
        return Inertia::render('Module/PdfReport/AllOrDeptLeaveApplicationReport',[
            'filename' => $filename
        ]);

    }
}

