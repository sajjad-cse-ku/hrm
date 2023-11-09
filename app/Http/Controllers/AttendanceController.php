<?php

namespace App\Http\Controllers;
use App\Models\Attendance;
use App\Models\BreakTime;
use App\Models\Department;
use App\Models\LeaveCategory;
use App\Models\PublicHoliday;
use App\Models\PunchDetails;
use App\Models\Roster;
use App\Models\Shift;
use App\Models\User;
use Carbon\Carbon;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Carbon\CarbonPeriod;
use Psy\CodeCleaner\AssignThisVariablePass;


class AttendanceController extends Controller
{
    public function attendance(Request $request)
    {

        date_default_timezone_set('Asia/Dhaka');
        $allow_minute = SiteSettings()->extra_time;
        $currentYear = date('Y');
        $currentMonth = date('m');
        $currentDate = $request->set_date ?? Carbon::now()->toDateString();
        $currentDay = Carbon::parse($currentDate)->day;
        $currentOfMonth = Carbon::now()->startOfMonth();
        $endOfMonth = Carbon::now()->endOfMonth();
        $created_by = Auth::id();

        $companies = Company::with('user')->where('status', 1)->get();
        $isData = PunchDetails::whereDate('attendance_datetime',$currentDate)->get();
        $general_time = Shift::where('id', 2)->first();

        if(count($isData) > 0){
            foreach ($companies as $company) {

                $public_holiday = $this->getCompnayBasePublicHoliDays($currentOfMonth,$endOfMonth,$currentDate,$company->id);
                $userAttendanceData = $this->userAttendanceData($company,$currentDate);
                // New loop Add for testing
                foreach ($userAttendanceData as $attendanceData) {
                    $type = null ;
                    $user = $attendanceData['user'];
                    $leaves = $attendanceData['leaves'];
                    //Rostar and Shift Data
                    $userWithRoster = $this->userWithRoster($currentYear,$currentMonth,$user->id,$currentDay,$general_time);
                    $shift_id = $userWithRoster['shift_id'] ;
                    // Entry Exit Data Get
                    $enrtyExitData = $this->enrtyExitData($attendanceData,$shift_id,$type,$leaves);
                    $getUserLateData = $this->getUserLateData($shift_id,$userWithRoster['shift_entry_time'] ,$allow_minute,$enrtyExitData['entry_time'],$userWithRoster['shift_exit_time'],$enrtyExitData['exit_time'],$user);

                    $leave_flag = isset($leaves->id) ? 1 : 0;
                    $leave_id = isset($leaves->id) ? 1 : 0;
                    $offday_flag = $shift_id == 1 ? 1 : 0;
                    $offday_present = ($offday_flag == 1 && $user->id) ? 1 : 0;
                    // Data Insert Or Update
                    $this->attendanceDataDbInsert($user,$enrtyExitData,$userWithRoster,$getUserLateData,$leave_flag,$leave_id,$public_holiday,$offday_flag,$offday_present,$created_by,$currentDate);

                }
            }
            return back()->with('success','Get Attendance Successfully');
        }
        else if( count($isData) == 0 ) {
            foreach ($companies as $company) {
                $public_holiday = $this->getCompnayBasePublicHoliDays($currentOfMonth,$endOfMonth,$currentDate,$company->id);
                if($public_holiday != NULL){
                    foreach ($company->user as $user) {
                        $this->publicHoliDayDataInsert($user,$currentDate,$created_by,$public_holiday);
                    }
                }
            }
            return back()->with('success','Get Attendance Successfully');
        }
        else{
            return back()->with('error','This day have no date att all');
        }
    }

    public function attendanceDataDbInsert($user,$enrtyExitData,$userWithRoster,$getUserLateData,$leave_flag,$leave_id,$public_holiday,$offday_flag,$offday_present,$created_by,$currentDate){

        try {
            DB::beginTransaction();
            $save = Attendance::updateOrCreate(
                [
                    'user_id' => $user->id,
                    'attend_date' => $currentDate ?? $enrtyExitData['attend_date'],
                ],
                [
                    'company_id' => $user->company_id,
                    'created_by' => $created_by,
                    'user_id' => $user->id,
                    'department_id' => $user->professionaldata->department_id,
                    'device_id' => 1,
                    'attendance_datetime' => $enrtyExitData['attend_date'] ?? null,
                    'attend_date' => $currentDate ?? $enrtyExitData['attend_date'],
                    'entry_date' => $enrtyExitData['entry_date'] ?? null,
                    'entry_time' => $enrtyExitData['entry_time'] ?? null,
                    'shift_entry_time' => $userWithRoster['shift_entry_time'] ?? null,
                    'exit_date' => $enrtyExitData['exit_date'] ?? null,
                    'exit_time' => $enrtyExitData['exit_time'] ?? null,
                    'shift_exit_time' => $userWithRoster['shift_exit_time'] ?? null,
                    'attend_status' => $enrtyExitData['attend_status'] ?? 0,
                    'night_duty' => $enrtyExitData['night_duty'] ?? 0,
                    'late_flag' => $getUserLateData['late_flag'] ?? 0,
                    'late_allow' => $getUserLateData['late_allow'] ?? 0,
                    'late_minute' => $getUserLateData['late_minute'] ?? 0,
                    'over_time' => $getUserLateData['over_time'] ?? 0,
                    'overtime_hour' => $getUserLateData['overtime_hour'] ?? 0,
                    'leave_flag' => $leave_flag,
                    'leave_id' => $leave_id,
                    'holiday_flag' => count($public_holiday) == 0 ? 0 : 1,
                    'offday_flag' => $offday_flag,
                    'offday_present' => $offday_present,
                    'shift_id' => $userWithRoster['shift_id'] ?? null,
                ]
            );
            if ($save) {
                DB::commit();
            }
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
        return true ;
    }
    //    Get Compay Base HoliDay Data
    public function getCompnayBasePublicHoliDays($currentOfMonth,$endOfMonth,$currentDate,$company_id){
        $events = PublicHoliday::where(function ($query) use ($currentOfMonth, $endOfMonth,$company_id) {
            $query->where('from_date', '<=', $endOfMonth)
                ->where('to_date', '>=', $currentOfMonth)
                ->where('company_id', $company_id);
        })->get();

        $public_holiday = $events->filter(function ($event) use ($currentDate) {
            return $event->from_date <= $currentDate && $event->to_date >= $currentDate;
        });
        return $public_holiday;
    }
    //    Get  User Attendance Data
    public function userAttendanceData($company,$currentDate){

        $userAttendanceData = []; // Array to store user attendance data
        foreach ($company->user as $user) {
            $punches = $user->punches()->whereDate('attendance_datetime', $currentDate)->get();
            $leaves = $user->leaveapplication()->whereDate('from_date', $currentDate)->first();
            if (isset($punches)) {
                $minAttendanceDetails = $punches->min('attendance_datetime');
                $maxAttendanceDetails = $punches->max('attendance_datetime');
                $userAttendanceData[] = [
                    'user' => $user,
                    'leaves'=>$leaves,
                    'minAttendanceDetails' => $punches->where('attendance_datetime', $minAttendanceDetails)->first(),
                    'maxAttendanceDetails' => $punches->where('attendance_datetime', $maxAttendanceDetails)->first(),
                ];
            }
        }
        return $userAttendanceData ;
    }
    //    Get User  Roster Data
    public function userWithRoster($currentYear,$currentMonth,$user_id,$currentDay,$general_time){

        $result = [];
        $userWithRoster = Roster::with(
            'shift_day_1', 'shift_day_2', 'shift_day_3', 'shift_day_4', 'shift_day_5', 'shift_day_6', 'shift_day_7', 'shift_day_8', 'shift_day_9', 'shift_day_10', 'shift_day_11', 'shift_day_12', 'shift_day_13', 'shift_day_14', 'shift_day_15', 'shift_day_16', 'shift_day_17', 'shift_day_18', 'shift_day_19', 'shift_day_20', 'shift_day_21', 'shift_day_22', 'shift_day_23', 'shift_day_24', 'shift_day_25', 'shift_day_26', 'shift_day_27', 'shift_day_28', 'shift_day_29', 'shift_day_30', 'shift_day_31',
            'loc_1', 'loc_2', 'loc_3', 'loc_4', 'loc_5'
        )->where('r_year', $currentYear)
            ->where('month_id', $currentMonth)
            ->where('user_id', $user_id)
            ->first();

        for ($day = 1; $day <= 31; $day++) {

            $dayProperty = "shift_day_" . $day;

            if ($day == $currentDay && isset($userWithRoster)) {
                $shift_entry_time = $userWithRoster->$dayProperty ? $userWithRoster->$dayProperty->from_time :  $general_time->from_time;
                $shift_exit_time = $userWithRoster->$dayProperty ? $userWithRoster->$dayProperty->to_time : $general_time->to_time;
                break;
            }else{
                $shift_entry_time = $general_time->from_time ;
                $shift_exit_time = $general_time->to_time;
            }
        }
        $shift_id = $userWithRoster->{'shift_day_' . $currentDay}->id ?? null ;

        // Push Result to Array Value
        $result['shift_entry_time'] = $shift_entry_time ;
        $result['shift_exit_time'] = $shift_exit_time ;
        $result['shift_id'] = $shift_id ;
        return $result ;

    }
    // Get Entry Data And Exit
    public function enrtyExitData($attendanceData,$shift_id,$type,$leaves){

        $result = [];
        if($type == "hr_manual"){

            $attendanceDate = Carbon::parse($attendanceData["attendance_date"]);
            $inTime = Carbon::parse($attendanceData["in_time"]);
            $min_attendance_datetime = $attendanceDate->setTimeFromTimeString($inTime)->toDateTimeString() ?? null;

            $exit_date = Carbon::parse($attendanceData["exit_date"]);
            $out_time = Carbon::parse($attendanceData["out_time"]);
            $max_attendance_datetime=  $exit_date->setTimeFromTimeString($out_time)->toDateTimeString() ?? null;

        }else if($type == null){
            $minAttendanceDetails = isset($attendanceData['minAttendanceDetails']) ? $attendanceData['minAttendanceDetails'] : null ;
            $maxAttendanceDetails = isset($attendanceData['maxAttendanceDetails']) ? $attendanceData['maxAttendanceDetails'] : null;
            $min_attendance_datetime= $minAttendanceDetails != null ? $minAttendanceDetails->attendance_datetime : null;
            $max_attendance_datetime= $minAttendanceDetails != null ? $maxAttendanceDetails->attendance_datetime : null;
        }

        if ($min_attendance_datetime !== null) {
            $minCarbon = Carbon::parse($min_attendance_datetime);
            $attend_date = $minCarbon->toDateString();
            $entry_date = $minCarbon->toDateString();
            $entry_time = $minCarbon->toTimeString();
        }else{
            $entry_time = $entry_date = $attend_date  = null;
        }

        if ($max_attendance_datetime !== null) {
            $maxCarbon = Carbon::parse($max_attendance_datetime);
            $exit_date = $maxCarbon->toDateString();
            $exit_time = $maxCarbon->toTimeString();
        } else {
            $exit_date = $exit_time = null;
        }

        $attend_status = $min_attendance_datetime != null ? 'P' : ($shift_id == 1 ? 'O' : (isset($leaves->id )? 'L' : 'A'));
        $night_duty = in_array($shift_id, [5,9,11]) ? $shift_id : 0;

         $result['attend_date'] = $attend_date;
         $result['entry_date'] = $entry_date;
         $result['entry_time'] = $entry_time;
         $result['exit_date'] = $exit_date;
         $result['exit_time'] = $exit_time;
         $result['attend_status'] = $attend_status;
         $result['night_duty'] = $night_duty;

         return $result;
    }
    // Get the Late Data Info
    public function getUserLateData($shift_id,$shift_entry_time,$allow_minute,$entry_time,$shift_exit_time,$exit_time,$user){

        $result = [];
        if($shift_id !== 1 || $shift_id === null){
            $late_flag = (Carbon::parse($shift_entry_time)->addMinutes($allow_minute)->format('H:i:s') < $entry_time) ? 1 : 0;
        }else $late_flag = 0;


        //late time count
        $carbonShiftEntryTime = Carbon::parse($shift_entry_time);
        $carbonEntryTime = Carbon::parse($entry_time);
        $late_minute = floor(($carbonShiftEntryTime->diffInSeconds($carbonEntryTime))/60);
        //late time count
        $carbonShiftExitTime = Carbon::parse($shift_exit_time);
        $carbonExitTime = Carbon::parse($exit_time);
        $over_time = $user->professionaldata->overtime == 1 ? 1 : 0;
        $overtime_hour = ceil(($carbonShiftExitTime->diffInSeconds($carbonExitTime))/60);
        $late_allow = $user->professionaldata->late_allow ?? 0;

        $result['late_flag'] = $late_flag ;
        $result['late_minute'] = $late_minute ;
        $result['over_time'] = $over_time ;
        $result['overtime_hour'] = $overtime_hour ;
        $result['late_allow'] = $late_allow ;
        return $result;

    }
    public function publicHoliDayDataInsert($user,$currentDate,$created_by,$public_holiday){
        try {
            DB::beginTransaction();
            $save = Attendance::updateOrCreate(
                [
                    'user_id' => $user->id,
                    'attend_date'=> $currentDate,
                ],
                [
                    'company_id'=>$user->company_id,
                    'created_by'=> $created_by,
                    'user_id'=>$user->id,
                    'department_id'=>$user->professionaldata->department_id,
                    'device_id'=>1,
                    'attendance_datetime'=> null,
                    'attend_date'=> $currentDate ,
                    'entry_date'=> null,
                    'entry_time'=> null,
                    'shift_entry_time'=> null ,
                    'exit_date'=> null ,
                    'exit_time'=> null ,
                    'shift_exit_time'=>  null ,
                    'attend_status'=> "O" ,
                    'night_duty'=> 0 ,
                    'late_flag'=>0 ,
                    'late_allow'=> 0 ,
                    'late_minute'=> 0 ,
                    'over_time'=> 0 ,
                    'overtime_hour'=> 0 ,
                    'leave_flag'=> 0 ,
                    'leave_id'=>0 ,
                    'holiday_flag'=>count($public_holiday) == 0 ? 0 : 1,
                    'offday_flag'=> 1 ,
                    'offday_present'=>1,
                    'shift_id'=> null,
                ]);
            if($save){
                DB::commit();
            }
        }
        catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
        return true ;
    }

    public function todayAttendance(){
        $general_time = Shift::where('id', 2)->first();
        $currentDate = Carbon::now()->toDateString();

        $results = User::with(['attendance' => function ($query) use ($currentDate) {
            $query->with(['shift'=>function($shiftQuery){
                $shiftQuery->select('id', 'from_time','to_time');
            },'leave' => function ($leaveQuery) {
                $leaveQuery->select('id', 'name');
            }])

                ->whereDate('attend_date', $currentDate)
                ->select('id', 'user_id', 'leave_id', 'attend_date', 'entry_time', 'exit_time', 'holiday_flag', 'leave_id', 'shift_id','offday_flag', 'late_flag', 'attendance_datetime','manual_update_remarks','attend_status');
        }])->where('is_show',1)
            ->where('status',1)
            ->select('id', 'first_name', 'last_name')
            ->orderBy('first_name', 'asc')
            ->get();

//return $results;
        return Inertia::render('Module/Attendance/TodayAttendance',
            [
                'results' => $results,
                'general_time'=>$general_time
            ]);
    }
    public function attendanceReport(Request $request){
        $now = Carbon::now(); // Get the current date and time

        $currentMonth = $now->month; // Get the current month
        $currentYear = $now->year;   // Get the current year

        $startDate = Carbon::create($currentYear, $currentMonth, 1); // First day of the current month
        $endDate = $startDate->copy()->endOfMonth();               // Last day of the current month

        // Create a date range using CarbonPeriod
        $period = CarbonPeriod::create($startDate, $endDate);

        if ($request->get_attendance == "all"){
            $currentMonthAttendance = User::with(['professionaldata.designation','attendances' => function ($query) use ($currentMonth, $currentYear) {
                $query->whereMonth('attend_date', $currentMonth)
                    ->whereYear('attend_date', $currentYear);
            }])->where('is_show',1)
                ->where('status',1)
                ->orderBy('first_name', 'asc')->get()->map(function ($query) use ($period){
                    $attendancesCollection = collect();
                    foreach ($period as $date){
                        $result = $query->attendances->where('attend_date',$date->toDateString())->first();
                        $status = $this->getAttendanceStatus($result,$date->toDateString());
                        $attendancesCollection->push([
                            'date'  => $date->toDateString(),
                            'status' => $this->getAttendanceStatus($result,$date->toDateString()),
                            'intime' => ($result)? $result->entry_time:null,
                            'exittime' => ($result)? $result->exit_time:null
                        ]);
                    }
                    return $collect = collect([
                        'id'=>$query->id,
                        'username' => $query->first_name. ' ' .$query->last_name,
                        'designation'=>$query->professionaldata?->designation?->name,
                        'getAttendance' => $attendancesCollection
                    ]);
                });
//            return $currentMonthAttendance;
            return Inertia::render('Module/Attendance/AttendanceReport',['currentMonthAttendance' => $currentMonthAttendance]);
        }
        if ($request->get_attendance){

            $currentMonthAttendance = User::whereHas('professionaldata.department', function ($subquery) use ($request) {
                $subquery->where('id', $request->get_attendance);
            })
                ->with(['attendances' => function ($query) use ($currentMonth, $currentYear) {
                    $query->whereMonth('created_at', $currentMonth)
                        ->whereYear('created_at', $currentYear);
                }])
                ->where('status',1)
                ->where('is_show',1)
                ->orderBy('first_name', 'asc')
                ->get()->map(function ($query) use ($period){
                    $attendancesCollection = collect();
                    foreach ($period as $date){
                        $result = $query->attendances->where('attend_date',$date->toDateString())->first();
                        $status = $this->getAttendanceStatus($result,$date->toDateString());
                        $attendancesCollection->push([
                            'date'  => $date->toDateString(),
                            'status' => $this->getAttendanceStatus($result,$date->toDateString()),
                            'intime' => ($result)? $result->entry_time:null,
                            'exittime' => ($result)? $result->exit_time:null
                        ]);
                    }
                    return $collect = collect([
                        'username' => $query->first_name. ' ' .$query->last_name,
                        'entry_time'=>$query,
                        'getAttendance' => $attendancesCollection
                    ]);
                });
            return Inertia::render('Module/Attendance/AttendanceReport',['currentMonthAttendance' => $currentMonthAttendance]);
        }
        return back()->with('error',"Attendance not found");
    }
    private function getAttendanceStatus($attendance,$date){
        $statusLists = ['Off Day','Present','Absent','Late','Leave','Pass Day','Public Holiday','Upcomming','Remote'];
        if(Carbon::now() < Carbon::parse($date)) return $statusLists[7];
        elseif(!$attendance) return $statusLists[5]; //pass day
        elseif($attendance->late_flag == 1 && $attendance->attendance_datetime !== null) return $statusLists[3]; //Late

        elseif($attendance->holiday_flag == 0 && $attendance->offday_flag == 1 && $attendance->attendance_datetime == null) return $statusLists[0]; //off day
        elseif($attendance->leave_id !== 0 && $attendance->holiday_flag == 0) return LeaveCategory::where('id',$attendance->leave_id)->first(['name'])->name; //leave id
        elseif($attendance->holiday_flag === 1 && $attendance->attendance_datetime == null ) return $statusLists[6]; // public holiday

        elseif($attendance->late_flag == 0 && $attendance->leave_id == 0 && $attendance->attendance_datetime) return $attendance->attend_status == "R" ? $statusLists[8] : $statusLists[1]; // present
        elseif($attendance->attendance_datetime === null && $attendance->leave_id == 0 && $attendance->holiday_flag == 0 && $attendance->offday_flag == 0) return $statusLists[2]; //Absent

        else return '';
    }
    public function allOrDepartWise(){
        $departments = Department::where('status',1)->select('name','id')->get();
        return Inertia::render('Module/Attendance/AllOrDept',[
            'departments'=>$departments
        ]);
    }
    public function manualAttendance(){
        $users = User::where('is_show',1)->where('status', 1)->get();
        return Inertia::render('Module/Attendance/ManualAttendance',[
            'users'=>$users
        ]);
    }
    public function manualAttendanceUpdate(Request $request){

        $currentOfMonth = Carbon::now()->startOfMonth();
        $endOfMonth = Carbon::now()->endOfMonth();
        $currentDate = Carbon::now()->toDateString();
        $general_time = Shift::where('id', 2)->first();
        $allow_minute = SiteSettings()->extra_time;
        $user = User::with('professionaldata')->where('id',$request->user_id)->first();
        $leaves = $user->leaveapplication()->whereDate('from_date', $currentDate)->first();
        $attendanceData = $request->all();
        $type = 'hr_manual' ;

        $public_holiday = $this->getCompnayBasePublicHoliDays($currentOfMonth,$endOfMonth,$currentDate,$user->company_id);

        $currentYear = Carbon::parse($request->attendance_date)->year ;
        $currentMonth = Carbon::parse($request->attendance_date)->format('n') ;
        $currentDay = Carbon::parse($request->attendance_date)->day;

        $userWithRoster = $this->userWithRoster($currentYear,$currentMonth,$user->id,$currentDay,$general_time);
        $shift_id = $userWithRoster['shift_id'] ;

        $enrtyExitData = $this->enrtyExitData($attendanceData,$shift_id,$type,$leaves);

//        $late_flag = (Carbon::parse($userWithRoster['shift_entry_time'])->addMinutes($allow_minute)->format('H:i:s') < $enrtyExitData['entry_time']) ? 1 : 0;

        if($shift_id !== 1 || $shift_id === null){
            $late_flag = (Carbon::parse($userWithRoster['shift_entry_time'])->addMinutes($allow_minute)->format('H:i:s') < $enrtyExitData['entry_time']) ? 1 : 0;
        }else{
            $from_time = $general_time->from_time;
            $late_flag = (Carbon::parse($general_time->from_time)->addMinutes($allow_minute)->format('H:i:s') < $enrtyExitData['entry_time'] ) ? 1 : 0;
        }
        //late in_time count
        $carbonShiftEntryTime = Carbon::parse($userWithRoster['shift_entry_time']);
        $carbonEntryTime = Carbon::parse($enrtyExitData['entry_time']);

        $late_minute = ($request->in_time === null || $carbonEntryTime <= $carbonShiftEntryTime) ? 0 : floor($carbonShiftEntryTime->diffInSeconds($carbonEntryTime) / 60);

        //late out_time count
        $carbonShiftExitTime = Carbon::parse($userWithRoster['shift_exit_time']);
        $carbonExitTime = Carbon::parse($enrtyExitData['exit_time']);

        $over_time = $user->professionaldata->overtime == 1 ? 1 : 0;
        $late_allow = $user->professionaldata->late_allow ?? 0;

        $leave_flag = isset($leaves->id) ? 1 : 0;
        $leave_id = isset($leaves->id) ? 1 : 0;
        $offday_flag = $shift_id == 1 ? 1 : 0;
        $offday_present = ($offday_flag == 1 && $user->id) ? 1 : 0;

        $save = Attendance::updateOrCreate(
            [
                'user_id' => $user->id,
                'attend_date'=>  $enrtyExitData['attend_date'] ,
            ],
            [
                'company_id'=>$user->company_id,
                'created_by'=>Auth::id(),
                'user_id'=>$user->id,
                'department_id'=>$user->professionaldata->department_id,
                'device_id'=>1,
                'attendance_datetime'=> $enrtyExitData['attend_date']  ,
                'attend_date'=>   $enrtyExitData['attend_date']  ,
                'entry_date'=>$request->attendance_date ?? null ,
                'entry_time' => $enrtyExitData['entry_time']  ?? null ,
                'shift_entry_time'=>$carbonShiftEntryTime ?? null ,
                'exit_date'=>$enrtyExitData['exit_date']  ?? null ,
                'exit_time'=> $enrtyExitData['exit_time']   ?? null ,
                'shift_exit_time'=>$carbonShiftExitTime ?? null ,
                'attend_status'=>$enrtyExitData['attend_status'] ?? 0  ,
                'night_duty'=>$enrtyExitData['night_duty'] ?? 0  ,
                'late_flag'=>$late_flag ?? 0  ,
                'late_allow'=>$late_allow ?? 0  ,
                'late_minute'=>$late_minute ?? 0  ,
                'over_time'=>$over_time ?? 0  ,
                'leave_flag'=>$leave_flag ?? 0  ,
                'leave_id'=>$leave_id ?? 0  ,
                'holiday_flag'=>count($public_holiday) == 0 ? 0 : 1,
                'offday_flag'=>$offday_flag ?? 0  ,
                'offday_present'=>$offday_present ?? 0  ,
                'shift_id'=>$shift_id ?? null,
                'manual_update_remarks'=>$request->manual_update_remarks,
            ]);
        return back()->with('success','Attendance Successfully Added');
    }
    public function manualComment(){
        $users = User::where('status', 1)->get();
        return Inertia::render('Module/Attendance/ManualComment',[
            'users'=>$users
        ]);
    }
    public function manualCommentUpdate(Request $request){
        $attendance = Attendance::where('user_id', $request->user_id)->whereDate('attend_date',now())->first();
        if($attendance){
            $attendance->update([
                'manual_update_remarks'=>$request->comment
            ]);
            return back()->with('success','comment done');
        }

    }
    public function getDateWiseAttendance(){
        $date =Carbon::parse(now())->toDateString();
        return Inertia::render('Module/Attendance/GetDateWiseAttendance',[
            'date'=>$date
        ]);
    }
    public function homeOfficeAttendance(){

        $user_att = Attendance::where('attend_date',now()->format('Y-m-d'))->where('user_id',Auth::id())->first();
        if(!empty($user_att['entry_time']) && !empty($user_att['exit_time'])){
            return back()->with('error','You have already attendance');
        }

        $currentOfMonth = Carbon::now()->startOfMonth();
        $endOfMonth = Carbon::now()->endOfMonth();
        $currentDate = Carbon::now()->toDateString();
        $general_time = Shift::where('id', 2)->first();
        $allow_minute = SiteSettings()->extra_time;
        $user = User::with('professionaldata')->where('id',Auth::id())->first();

        $leaves = $user->leaveapplication()->whereDate('from_date', $currentDate)->first();


        $events = PublicHoliday::where(function ($query) use ($currentOfMonth, $endOfMonth) {
            $query->where('from_date', '<=', $endOfMonth)
                ->where('to_date', '>=', $currentOfMonth);
        })->get();

        $public_holiday = $events->filter(function ($event) use ($currentDate) {
            return $event->from_date <= $currentDate && $event->to_date >= $currentDate;
        });

        $userWithRoster = Roster::with(
            'shift_day_1', 'shift_day_2', 'shift_day_3', 'shift_day_4', 'shift_day_5', 'shift_day_6', 'shift_day_7', 'shift_day_8', 'shift_day_9', 'shift_day_10', 'shift_day_11', 'shift_day_12', 'shift_day_13', 'shift_day_14', 'shift_day_15', 'shift_day_16', 'shift_day_17', 'shift_day_18', 'shift_day_19', 'shift_day_20', 'shift_day_21', 'shift_day_22', 'shift_day_23', 'shift_day_24', 'shift_day_25', 'shift_day_26', 'shift_day_27', 'shift_day_28', 'shift_day_29', 'shift_day_30', 'shift_day_31',
            'loc_1', 'loc_2', 'loc_3', 'loc_4', 'loc_5'
        )
            ->where('r_year', Carbon::parse(now('Asia/Dhaka'))->year)
            ->where('month_id',Carbon::parse(now('Asia/Dhaka'))->format('n'))
            ->where('user_id', $user->id)
            ->first();

        for ($day = 1; $day <= 31; $day++) {
            $dayProperty = "shift_day_" . $day;
            if ($day == Carbon::parse(now())->day && isset($userWithRoster->$dayProperty)) {
                $shift_entry_time = $userWithRoster->$dayProperty->from_time;
                $shift_exit_time = $userWithRoster->$dayProperty->to_time;
                break;
            }else{
                $shift_entry_time = $general_time->from_time ;
                $shift_exit_time = $general_time->to_time;
            }

        }


        $shift_id = $userWithRoster->{'shift_day_' . Carbon::parse(Carbon::now('Asia/Dhaka')->format('Y-m-d'))->day}->id ?? null;


        if (empty($user_att['entry_time'])) {
            $minCarbon = Carbon::parse(Carbon::now('Asia/Dhaka')->format('H:i:s'));
            $entry_date = $minCarbon->toDateString();
            $entry_time = $minCarbon->toTimeString();
        }else{
            $entry_time= $minCarbon = $user_att['entry_time'];
            $entry_date = $user_att['attendance_datetime'];
        }

        if (!empty($user_att['entry_time'])) {
            $maxCarbon = Carbon::parse(Carbon::now('Asia/Dhaka')->format('H:i:s'));
            $exit_date = $maxCarbon->toDateString();
            $exit_time = $maxCarbon->toTimeString();
        }


        $attend_status = $minCarbon != null ? 'R' :
            ($shift_id == 1 ? 'O' :
                (isset($leaves->id )? 'L' : 'A'));
        $night_duty = in_array($shift_id, [5,9,11]) ? $shift_id : 0;

        $late_flag = (Carbon::parse($shift_entry_time)->addMinutes($allow_minute)->format('H:i:s') < $entry_time) ? 1 : 0;
        //late in_time count
        $carbonShiftEntryTime = Carbon::parse($shift_entry_time);
        $carbonEntryTime = Carbon::parse($entry_time);
        $late_minute = ($minCarbon == null || $carbonEntryTime <= $carbonShiftEntryTime) ? 0 : floor($carbonShiftEntryTime->diffInSeconds($carbonEntryTime) / 60);

        //late out_time count
        $carbonShiftExitTime = Carbon::parse($shift_exit_time);
//        $carbonExitTime = Carbon::parse($exit_time);
        $over_time = $user->professionaldata->overtime == 1 ? 1 : 0;
        $late_allow = $user->professionaldata->late_allow ?? 0;

        $leave_flag = isset($leaves->id) ? 1 : 0;
        $leave_id = isset($leaves->id) ? 1 : 0;
        $offday_flag = $shift_id == 1 ? 1 : 0;
        $offday_present = ($offday_flag == 1 && $user->id) ? 1 : 0;

//        dd($entry_time,Carbon::now('Asia/Dhaka')->format('H:i:s'),Carbon::parse(Carbon::now()->format('H:i:s')));

        $save = Attendance::updateOrCreate(
            [
                'user_id' => $user->id,
                'attend_date'=> Carbon::now('Asia/Dhaka')->format('Y-m-d'),
            ],
            [
                'company_id'=>$user->company_id,
                'created_by'=>Auth::id(),
                'user_id'=>$user->id,
                'department_id'=>$user->professionaldata->department_id,
                'device_id'=>1,
                'attendance_datetime'=>$entry_date ?? null ,
                'attend_date'=>Carbon::now('Asia/Dhaka')->format('Y-m-d') ,
                'entry_date'=>Carbon::now('Asia/Dhaka')->format('Y-m-d') ?? null ,
                'entry_time' => $entry_time ?? null ,
                'shift_entry_time'=>$carbonShiftEntryTime ?? null ,
                'exit_date'=>$exit_date ?? null ,
                'exit_time'=>$exit_time ?? null ,
                'shift_exit_time'=>$carbonShiftExitTime ?? null ,
                'attend_status'=>$attend_status ?? 0  ,
                'night_duty'=>$night_duty ?? 0  ,
                'late_flag'=>$late_flag ?? 0  ,
                'late_allow'=>$late_allow ?? 0  ,
                'late_minute'=>$late_minute ?? 0  ,
                'over_time'=>$over_time ?? 0  ,
                'leave_flag'=>$leave_flag ?? 0  ,
                'leave_id'=>$leave_id ?? 0  ,
                'holiday_flag'=>count($public_holiday) == 0 ? 0 : 1,
                'offday_flag'=>$offday_flag ?? 0  ,
                'offday_present'=>$offday_present ?? 0  ,
                'shift_id'=>$shift_id ?? null,
                'manual_update_remarks'=>"Home Office",
            ]);
        return back()->with('success','Attendance Successfully Added');
    }
    public function myAttendanceReport($id){
        $currentMonth = Carbon::now();
        $general_time = Shift::where('id', 2)->first();
        $results = User::with(['attendances' => function ($query) use ($currentMonth) {
            $query->with(['shift'=>function($shiftQuery){
                $shiftQuery->select('id', 'from_time','to_time');
            },'leave' => function ($leaveQuery) {
                $leaveQuery->select('id', 'name');
            }])
                ->whereYear('attend_date', $currentMonth->year)
                ->whereMonth('attend_date', $currentMonth->month)
            ->orderBy('attend_date',"asc");
        }])->with('professionaldata.department')->where('is_show',1)
            ->where('status',1)
            ->where('id',$id)->first();

        return Inertia::render('Module/Attendance/MyAttendanceReport',[
            'results' => $results,
            'general_time'=>$general_time
        ]);
    }
    public function homeOffice(){
        $break_times = BreakTime::where('user_id',Auth::id())->where('start_date',now()->format('Y-m-d'))->get();
        return Inertia::render('Module/Attendance/HomeOfficeAttendance',[
            'break_times'=>$break_times
        ]);
    }
    public function homeOfficeAttendanceSave(Request $request){

        $data = BreakTime::where('user_id', Auth::id())->where('start_date', now()->format('Y-m-d'))->latest()->first();

        if ($data && $data->end_date) {
            // If there's an existing record with an end_date, insert a new record
            $newEvent = new BreakTime();
            $newEvent->user_id = Auth::id();
            $newEvent->start_date = now()->toDateString();
            $newEvent->start_time = now()->toTimeString();
            $newEvent->save();
            $data_response = BreakTime::where('user_id', Auth::id())->where('start_date', now()->format('Y-m-d'))->latest()->get();
            return response()->json($data_response);
        } elseif ($data) {
            $request->validate([
                'comment' => 'required',
            ]);
            // If there's an existing record without an end_date, update it
            $data->end_date = now()->toDateString();
            $data->end_time = now()->toTimeString();
            $formattedDuration  = now()->diff($data->start_time);
            $data->duration  = $formattedDuration->format('%H:%I:%S');
            $data->comment = $request->comment;
            $data->save();
            $data_response = BreakTime::where('user_id', Auth::id())->where('start_date', now()->format('Y-m-d'))->latest()->get();
            return response()->json($data_response);
        } else {
            // If no record is found, insert a new record
            $newEvent = new BreakTime();
            $newEvent->user_id = Auth::id();
            $newEvent->start_date = now()->toDateString();
            $newEvent->start_time = now()->toTimeString();
            $newEvent->save();
            $data_response = BreakTime::where('user_id', Auth::id())->where('start_date', now()->format('Y-m-d'))->latest()->get();
            return response()->json($data_response);
        }

    }
}