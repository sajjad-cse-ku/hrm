<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\LeaveApplication;
use App\Models\Notice;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Session;
class DashboardController extends Controller
{
    public function adminDashboard(){
        if(Session::get('adminLogin')){
            $active_users = User::where('status',1)->count('id');
            $total_users = User::count('id');

            $latestnotices= Notice::orderBy('created_at', 'desc')
                ->where('status',1)->limit(10)->take(5)->get();

            $leaveacknowledge = LeaveApplication::with('user')->where('alternate_id',Auth::id())->where('status','C')->get();
            $leavereport = LeaveApplication::with('user')->where('recommend_id',Auth::id())->where('status','AK')->get();
            $leaveapprove= LeaveApplication::with('user')->where('recommend_id',Auth::id())->where('status','R')->get();
            $departments = Department::where('status',1)->select('name','id')->get();

            return Inertia::render('Module/Dashboard/Index',
                [
                    'active_users'=> $active_users,
                    'total_users'=> $total_users,
                    'notices'=>$latestnotices,
                    'leaveacknowledge'=>$leaveacknowledge,
                    'leavereport'=>$leavereport,
                    'leaveapprove'=>$leaveapprove,
                    'departments'=>$departments
                ]
            );
        }else{
            return to_route('login');
        }
    }
}