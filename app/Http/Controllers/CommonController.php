<?php

namespace App\Http\Controllers;

use App\Models\Bangladesh;
use App\Models\Department;
use App\Models\LeaveApplication;
use App\Models\LeaveCategory;
use App\Models\LeaveRegister;
use App\Models\Section;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommonController extends Controller
{
    public function getThana($district){
        $allThana = Bangladesh::where('district',$district)->select('thana','post_office')->get();
        return response()->json($allThana);
    }

    public function getPostCode($post_code){
        $parts = explode("-", $post_code);
        $thana = $parts[0]; // "Dhemra"
        $post_office = $parts[1]; // "Dhemra"
        $postCode = Bangladesh::where('thana',$thana)->where('post_office',$post_office)->select('post_code')->first();
        return response()->json($postCode);
    }

    public function sectionSelect($id){
        $department = Department::with('sections')->find($id);
        return $department->sections;
    }
    public function getLeaveData($id){
        $data = LeaveRegister::with('leavecategory')->where('user_id',$id)->get();
        return response()->json($data);
    }
    public function getEligibilityLeaveBalance($leaveId , $id){
//        dd($leaveId,$id);
        $data = LeaveRegister::where('user_id', $id)
               ->where('leave_id',$leaveId)
            ->first();
        return response()->json($data);
    }

    public function setTodayAttendance($date){
        $currentDate = $date;

       $results = User::with(['attendance' => function ($query) use ($currentDate) {
            $query->with(['shift'=>function($shiftQuery){
                $shiftQuery->select('id', 'from_time','to_time');
            },'leave' => function ($leaveQuery) {
                $leaveQuery->select('id', 'name');
            }])

                ->whereDate('attend_date', $currentDate)
                ->select('id', 'user_id', 'leave_id', 'attend_date', 'entry_time', 'exit_time', 'holiday_flag', 'leave_id', 'shift_id','offday_flag', 'late_flag', 'attendance_datetime','manual_update_remarks');
        }])->where('is_show',1)
           ->where('status',1)
        ->select('id', 'first_name', 'last_name')
        ->orderBy('first_name', 'asc')
        ->get();

        return response()->json($results);
    }
}
