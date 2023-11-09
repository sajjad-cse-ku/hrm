<?php

namespace App\Http\Controllers;

use App\Http\Requests\LateApplyRequest;
use App\Models\Attendance;
use App\Models\LateApply;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LateApplyController extends Controller
{
    public function lateApply(){
        $auth_user = User::with('professionaldata','personaldata','professionaldata.department','professionaldata.designation')
            ->where('id',Auth::id())
            ->first();
        $departmentId = $auth_user->professionaldata->department_id;

        $all_users =User::with('professionaldata.designation')->whereHas('professionaldata', function ($query) use ($departmentId) {
            $query->where('department_id', $departmentId);
        })->where('id','!=',Auth::id())->get();

        return Inertia::render('Module/LateManagement/LateApply',[
            'auth_user'=>$auth_user,
            'all_users'=>$all_users,
        ]);
    }
    public function lateApplySend(LateApplyRequest $request){
        $save = LateApply::create([
            'user_id' => $request->user_id,
            'subject'=>$request->subject,
            'late_date'=>$request->late_date,
            'message'=>$request->late_message
        ]);
        if($save){
            return to_route('admin.late.list')->with('success',"Apply Successfully");
        }
    }
    public function applyList(){
        $results = LateApply::where('user_id',Auth::id())->take(10)->get();
        return Inertia::render('Module/LateManagement/ApplyList',[
            'results' => $results
        ]);
    }
    public function lateList(){
        $results = LateApply::with('user','user.professionaldata.department')->where('status',0)->get();
        return Inertia::render('Module/LateManagement/LateList',[
            'results' => $results
        ]);
    }
    public function getLateUserData($id){
        $userData = LateApply::with('user')->where('id',$id)->where('status',0)->first();
        return response()->json($userData);
    }
    public function lateApproved($id){
        $data = LateApply::where('id',$id)->first();
        $updateDate = $data->update([
            'status'=>1,
        ]);
        if($updateDate){
            Attendance::where('user_id',$data->user_id)->whereDate('attend_date',$data->late_date)->update([
                'late_flag'=> 0
            ]);
            return back()->with('success','Late Application Approved');
        }
    }
    public function lateDeclined($id){
        $data = LateApply::where('id',$id)->update([
            'status'=>2,
        ]);
        if($data){
            return back()->with('error','Rejected Late Application');
        }
    }
    public function getUserLateApply($id){
        $result = User::with('professionaldata','personaldata','professionaldata.department','professionaldata.designation')
            ->where('id',$id)
            ->where('status',1)->first();
        return response()->json($result);
    }
    public function customLateAllow(){
        $users =User::with('professionaldata.designation','professionaldata.department')->orderBy('first_name','asc')->get();

        return Inertia::render('Module/LateManagement/CustomLateAllow',[
            'users'=>$users,
        ]);
    }
    public function customLateAllowSend(Request $request){
        $request->validate([
            'user_id' => 'required',
            'date' => 'required',
        ]);

        $data =  Attendance::where('user_id', '=', $request->user_id)->where('attend_date',$request->date)->first();

        if($data->late_flag == 0){
            return back()->with('error',"This user haven't late att all");
        }
        if($data->late_flag == 1){
            $data->update([
                'late_allow'=>0
            ]);
            return back()->with('success',"Late Allow Approved");
        }

    }
}
