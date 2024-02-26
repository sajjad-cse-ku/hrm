<?php

namespace App\Http\Controllers;

use App\Http\Requests\LeaveApplicationRequest;
use App\Http\Requests\PublicHolidayRequest;
use App\Models\Department;
use App\Models\EmployeePosting;
use App\Models\LeaveApplication;
use App\Models\LeaveCategory;
use App\Models\LeaveRegister;
use App\Models\PublicHoliday;
use App\Models\SiteSettings;
use App\Models\User;
use App\Repositories\LeaveApplicationRepository;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class LeaveApplicationController extends Controller
{
    protected $leave_application;
    public function __construct(LeaveApplicationRepository $religions)
    {
        $this->leave_application = $religions;
    }

    public function index(){

         $user = User::with('professionaldata')->where('id',Auth::user()->id)->first();
         $departmentId = $user->professionaldata->department_id;

         $users =User::with('professionaldata.designation')->whereHas('professionaldata', function ($query) use ($departmentId) {
             $query->where('department_id', $departmentId);
         })->where('status',1)->where('is_show',1)
             ->where('id','!=',Auth::id())->get();

        $result = $this->leave_application->getAll(Auth::id());
        $pre_leave_applications = LeaveApplication::where('user_id', Auth::id())
            ->get();

        return Inertia::render('Module/LeaveApplication/Index',[
            'permissions' => checkPermissions(),
            'result' => $result,
            'users'=>$users,
            'pre_leave_applications'=>$pre_leave_applications
        ]);
    }
    public function create(){
        return Inertia::render('Module/LeaveApplication/Add');
    }
    public function store(LeaveApplicationRequest $request){
        $result = $this->leave_application->store($request);
        if($result['status']== true){
            return back()->with('success', $result['message']);
        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }
    public function edit($id,$leaveID){
        $result = $this->leave_application->edit($id,$leaveID);
        return Inertia::render('Module/LeaveApplication/Edit',['result'=>$result]);
    }
    public function apply($id,$leaveId){
//        dd($id,$leaveId);
        $user = User::with('professionaldata')->where('id',Auth::user()->id)->first();
        $departmentId = $user->professionaldata->department_id;
        $users =User::whereHas('professionaldata', function ($query) use ($departmentId) {
            $query->where('department_id', $departmentId);
        })->get();
        $result = $this->leave_application->apply($id,$leaveId);
        $leave_name = LeaveCategory::where('id', $leaveId)->value('name');
        $pre_leave_applications = LeaveApplication::where('leave_id', $leaveId)
            ->where('user_id', $id)
            ->where('status','A')
            ->get();
        if($result['status']== true){
            return Inertia::render('Module/LeaveApplication/Apply',
                ['result'=>$result['leave'],'users'=>$users,'leave_name'=>$leave_name,'pre_leave_applications'=>$pre_leave_applications]);
        }else{
            return back()->with('error', $result['message']);
        }
    }
    public function applyProcess(Request $request){

        $result = $this->leave_application->applyProcess($request);
        if($result['status']== true){
            return to_route('admin.leave_application')->with('success', $result['message']);
        }else{
            return back()->with('error', $result['message']);
        }
    }
    public function update(Request $request){
//        dd($request->all());
        $result=$this->leave_application->update($request);
        if($result['status']== true){
            return back()->with('success', $result['message']);
        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }
    public function delete($id){
        $result= $this->leave_application->delete($id);
        return back()->with('success', $result['message']);
    }
    public function status($id){
        $result = $this->leave_application->status($id);
        return back()->with('success', $result['message']);
    }
    public function requestedUser(){
       $results = $this->leave_application->requestedUser();
        return Inertia::render('Module/LeaveApplication/Requested',[
            'permissions' => checkPermissions(),
            'results'=>$results
        ]);
    }
    public function leaveAcknowledge(){
        $results = $this->leave_application->leaveAcknowledge();
        return Inertia::render('Module/LeaveApplication/LeaveAcknowledge',[
            'permissions' => checkPermissions(),
            'results'=>$results]
        );
    }
    public function leaveReportTo(){
        $results = $this->leave_application->reportTo();
        return Inertia::render('Module/LeaveApplication/LeaveReportTo',[
            'permissions' => checkPermissions(),
            'results'=>$results
        ]);
    }
    public function approved($id){
        $results = $this->leave_application->approved($id);

        if($results['status'] == true){
            return back()->with('success', $results['message']);
        }else{
            return back()->with('error', $results['message']);
        }
    }
    public function rejected($id){
        $results = $this->leave_application->rejected($id);
        if($results['status'] == true){
            return back()->with('success', $results['message']);
        }
    }
    public function approvedByAlternate($id){
        $results = $this->leave_application->approvedByAlternate($id);
        if($results['status'] == true){
            return back()->with('success', $results['message']);
        }
    }
    public function rejectedByAlternate($id){
        $results = $this->leave_application->rejectedByAlternate($id);
        if($results['status'] == true){
            return back()->with('success', $results['message']);
        }
    }
    public function approvedByReportTo($id){
        $results = $this->leave_application->approvedByReportTo($id);
        if($results['status'] == true){
            return back()->with('success', $results['message']);
        }
    }
    public function rejectedByReportTo($id){
        $results = $this->leave_application->rejectedByReportTo($id);
        if($results['status'] == true){
            return back()->with('success', $results['message']);
        }
    }
    public function getUserLeaveDate($id){
        $sick_leave = SiteSettings::first();
        $c_year = date("Y");
        $is_exist = LeaveRegister::where('user_id', $id)->where('leave_year',$c_year)->exists();
        $companyId = \App\Models\User::where('id', auth()->user()->id)->value('company_id');

        $currentDate = Carbon::now();
        $previousYear = $currentDate->subYear();
        $lastDateOfPreviousYear = $previousYear->endOfYear();
        $end_date = $lastDateOfPreviousYear->format('Y-m-d');

        if ($is_exist) {
            $result = $this->leave_application->getAll($id);
            $pre_leave_applications = LeaveApplication::where('user_id', $id)
                ->get();
            return response()->json([$result,$pre_leave_applications]);
        }
            $employees = User::with('personaldata','professionaldata')->where('company_id', $companyId)
                ->where('id', $id)->first();
            $emp_leaves = LeaveCategory::where('company_id', $companyId)->get();
            foreach ($emp_leaves as $row) {
                if (!LeaveRegister::where('user_id', $id)
                    ->where('leave_id', $row->id)->where('leave_year', $c_year)
                    ->exists()) {

                    LeaveRegister::insert([
                        'company_id' => $companyId,
                        'user_id' => $id,
                        'leave_id' => $row['id'],
                        'leave_eligible' => $row['yearly_limit'],
                        'leave_year' => $c_year,
                        'created_by'=> Auth::id()
                    ]);
                }
            }

            $process_date = date('Y-m-d');
            $process_day = Carbon::parse($process_date);
            $join_date = $employees->professionaldata->joining_date;


            if ($join_date < $end_date) {
                $end_day = Carbon::parse($end_date);
                $w_day = $end_day->diffInDays($process_day);
                $casaul = intval($w_day / $sick_leave->value('casual'));
                $sick = intval($w_day / $sick_leave->value('sick'));
            } else {
                $join_day = Carbon::parse($join_date);
                $w_d = $join_day->diffInDays($process_day);
                $w_day = $w_d + 1;
                $casaul = intval($w_day / $sick_leave->value('casual'));
                $sick = intval($w_day / $sick_leave->value('sick'));
            }

            foreach ($emp_leaves as $row) {

                if ($row->id == 1) {

                    DB::beginTransaction();

                    try {
                        LeaveRegister::query()->where('user_id', $id)
                            ->where('leave_id', '=', '1')->where('leave_year', Carbon::now()->format('Y'))
                            ->update([
                                'leave_eligible' => $casaul,
                                'leave_balance' => DB::raw($casaul . '- leave_enjoyed')
                            ]);
                    } catch (\Exception $e) {
                        DB::rollBack();
                        $error = $e->getMessage();
                        return response()->json(['error' => $error], 404);
                    }

                    DB::commit();
                } elseif ($row->id == 2) {

                    DB::beginTransaction();

                    try {
                        LeaveRegister::query()->where('user_id', $id)
                            ->where('leave_id', '=', '2')->where('leave_year', Carbon::now()->format('Y'))
                            ->update([
                                'leave_eligible' => $sick,
                                'leave_balance' => DB::raw($sick . '- leave_enjoyed')
                            ]);
                    } catch (\Exception $e) {
                        DB::rollBack();
                        $error = $e->getMessage();
                        //            $request->session()->flash('alert-danger', $error.'Not Saved');
                        return response()->json(['error' => $error], 404);
                    }

                    DB::commit();
                } elseif($row->id == 3){
                    $earn_leave = 0;
                    $joining_date = Carbon::parse($employees->professionaldata->joining_date);
                    $w_day = $joining_date->diffInDays($process_day);

                    if($w_day >= 365){
                        $end_day = Carbon::parse($end_date);
                        $leave_enjoy = LeaveRegister::where('user_id', $id)->where('leave_year',$end_day->year)->sum('leave_enjoyed');
                        $ph = PublicHoliday::where('hYear',$end_day->year)->sum('nods'); //public holiday = ph
                        $w_day = $end_day->diffInDays($process_day); //working_holiday = w_day
                        $wh_day = 104; //weakly_holiday = wh_day
                        $earn_leave = (365-($wh_day+$ph+$leave_enjoy))/18;
                        $pre_earn_leave = LeaveRegister::where('user_id', $id)->where('leave_year',$end_day->year)->where('leave_id',3)->value('leave_balance');
                        $earn_leave = $earn_leave + $pre_earn_leave;

                        DB::beginTransaction();

                        try {
                            LeaveRegister::query()->where('user_id', $id)
                                ->where('leave_id', '=', '3')->where('leave_year', Carbon::now()->format('Y'))
                                ->update([
                                    'leave_eligible' => $earn_leave,
                                    'leave_balance' => DB::raw($earn_leave . '- leave_enjoyed')
                                ]);
                        } catch (\Exception $e) {
                            DB::rollBack();
                            $error = $e->getMessage();
                            //            $request->session()->flash('alert-danger', $error.'Not Saved');
                            return response()->json(['error' => $error], 404);
                        }
                        DB::commit();
                    }else{
                        DB::beginTransaction();
                        try {
                            LeaveRegister::query()->where('user_id', $id)
                                ->where('leave_id', '=', '3')->where('leave_year', Carbon::now()->format('Y'))
                                ->update([
                                    'leave_eligible' => $earn_leave,
                                    'leave_balance' => DB::raw($earn_leave . '- leave_enjoyed')
                                ]);
                        } catch (\Exception $e) {
                            DB::rollBack();
                            $error = $e->getMessage();
                            return response()->json(['error' => $error], 404);
                        }
                        DB::commit();
                    }

                }
            }

        $result = $this->leave_application->getAll($id);
        $end_day = Carbon::parse($end_date);
        LeaveRegister::where('user_id',$id)->where('leave_year',$end_day->year)->delete();

        $pre_leave_applications = LeaveApplication::where('user_id', $id)
            ->get();
        return response()->json([$result,$pre_leave_applications]);
    }

    public function directLeaveApprove(){
        $users = User::with('professionaldata.designation','professionaldata.department')->select('id','first_name','last_name')->get();
        return Inertia::render('Module/LeaveApplication/DirectLeaveApprove',[
            'users' => $users
        ]);
    }
    public function directLeaveApproveApply(Request $request){

        $companyId = \App\Models\User::where('id', auth()->user()->id)->value('company_id');
        $c_year = date("Y");
        $leave_balance = LeaveRegister::where('user_id',$request->user_id)->where('leave_id',$request->leave_id)->first();


        if($leave_balance->leave_balance < $request->nods){
            return back()->with('error','You have input more days than your vacation');

        }else{
            $save  = LeaveApplication::create([
                'company_id'=>$companyId,
                'created_by'=>Auth::id(),
                'leave_id'=>$request->leave_id,
                'user_id'=>$request->user_id,
                'alternate_id'=>Auth::id(),
                'recommend_id'=>Auth::id(),
                'approve_id'=>Auth::id(),
                'leave_year'=>$c_year,
                'from_date'=>$request->from_date,
                'to_date'=>$request->to_date,
                'nods'=>$request->nods,
                'reason'=>$request->reason,
                'approve_date' => date('Y-m-d'),
                'status'=>'A'
            ]);
            if($save){
                $user = LeaveApplication::where('user_id', $request->user_id)->first();
                $leave_balance = LeaveRegister::where('user_id',$request->user_id)->first();
                $leave_balance->update([
                    'leave_enjoyed'=>$leave_balance->leave_enjoyed + $request->nods,
                   'leave_balance'=>$leave_balance->leave_balance - $request->nods,
                ]);
            }
            return to_route('admin.leave_application')->with('success','Leave Application Apply Successfully');
        }
    }

    public function leaveList(){
        $leaveApplications = LeaveApplication::with('user','leavecategory')->get();

        return Inertia::render('Module/LeaveApplication/LeaveList',[
            'leaveApplications' => $leaveApplications
        ]);
    }

}
