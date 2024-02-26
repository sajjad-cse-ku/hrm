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
            $currentYear = now()->year;
            $active_users = User::where('status',1)->count('id');
            $total_users = User::count('id');

            $latestnotices= Notice::orderBy('created_at', 'desc')
                ->where('status',1)
                ->whereYear('notice_date', $currentYear)
                ->limit(10)
                ->take(5)
                ->get();

// Query for $leaveacknowledge
            $leaveacknowledge = LeaveApplication::with('user')
                ->where('alternate_id', Auth::id())
                ->where('status', 'C')
                ->whereYear('leave_year', $currentYear) // Replace 'your_date_column' with the actual date column in your table
                ->get();

// Query for $leavereport
            $leavereport = LeaveApplication::with('user')
                ->where('recommend_id', Auth::id())
                ->where('status', 'AK')
                ->whereYear('leave_year', $currentYear) // Replace 'your_date_column' with the actual date column in your table
                ->get();

// Query for $leaveapprove
            $leaveapprove = LeaveApplication::with('user')
                ->where('recommend_id', Auth::id())
                ->where('status', 'R')
                ->whereYear('leave_year', $currentYear) // Replace 'your_date_column' with the actual date column in your table
                ->get();

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

    public function error(){
        return Inertia::render('Error');
    }
}