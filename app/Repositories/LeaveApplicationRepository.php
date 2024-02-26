<?php
namespace App\Repositories;


use App\Models\EmployeePosting;
use App\Models\LeaveApplication;
use App\Models\LeaveCategory;
use App\Models\LeaveRegister;
use App\Models\PublicHoliday;
use App\Models\SiteSettings;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class LeaveApplicationRepository {
    protected $model;

    public function __construct(LeaveApplication $model)
    {
        $this->model=$model;
    }

    public function getAll($id){
        if(Auth::id() == $id){
            $this->myLeaveData($id);
        }
        $c_year = date("Y");
        return LeaveRegister::with('user','user.personaldata','user.professionaldata.designation','user.professionaldata.department','leavecategory')
            ->where('user_id',$id)
            ->where('leave_year',$c_year)
            ->whereHas('leavecategory', function ($query) {
                $query->where('status', 1);
            })
            ->latest()
            ->get();
    }
    public function store($request){
        return $this->storeOrUpdate($request , $action="save");
    }
    public function edit(int $id, int $leaveId){
        $c_year = date("Y");
        return LeaveRegister::with('leavecategory')->where('user_id',$id)->where('leave_id',$leaveId)->where('leave_year',$c_year)->first();
    }

    public function apply(int $id , int $leaveId){

        $c_year = date("Y");
        $leave = LeaveRegister::with('leavecategory','user','user.personaldata','user.professionaldata','user.professionaldata.designation')
            ->where('user_id',$id)
            ->where('leave_id',$leaveId)
            ->where('leave_year',$c_year)->first();
        if (in_array($leave->leave_id, [1, 2, 3])) {
            if($leave->leave_balance > 0){
                return ['status'=>true , 'leave'=>$leave];
            }else{
                return ['status'=>false , 'message'=>'This category leave balance is not available'];
            }
        }else{
            return ['status'=>true , 'leave'=>$leave];
        }
    }

    public function directApply(int $id){
        $c_year = date("Y");
        $leave = LeaveRegister::with('leavecategory','user','user.personaldata','user.professionaldata','user.professionaldata.designation')->where('user_id',$id)->where('leave_year',$c_year)->first();
        if (in_array($leave->leave_id, [1, 2, 3])) {
            if($leave->leave_balance > 0){
                return ['status'=>true , 'leave'=>$leave];
            }else{
                return ['status'=>false , 'message'=>'This category leave balance is not available'];
            }
        }else{
            return ['status'=>true , 'leave'=>$leave];
        }
    }
    public function applyProcess($request){
//        dd($request->all());

        $companyId = \App\Models\User::where('id', auth()->user()->id)->value('company_id');
        $c_year = date("Y");
        $leave_balance = LeaveRegister::where('id',$request->id)->first();

        if(isset($request->leave_attachment)){
            $leave_attachment =  fileUpload($request->leave_attachment , "leave_attachment");
        }else{
            $leave_attachment = '';
        }

        if (in_array($request->leave_id, [1, 2, 3])) {
            if ($leave_balance->leave_balance < $request->days) {
                return ['status' => true, 'message' => 'You have input more days than your vacation'];
            }
        }

        $recommended_id = EmployeePosting::where('user_id', $request->user_id)->first();

        LeaveApplication::create([
            'company_id' => $companyId,
            'created_by' => Auth::user()->id,
            'leave_id' => $request->leave_id,
            'user_id' => $request->user_id,
            'alternate_id' => $request->alternative_id ?? Auth::id(),
            'recommend_id' => $recommended_id->report_to,
            'leave_year' => $request->leave_year,
            'from_date' => $request->from_date,
            'to_date' => $request->to_date,
            'nods' => $request->nods,
            'duty_date' => $request->duty_date,
            'reason' => $request->reason,
            'leave_attachment' => $leave_attachment,
            'location' => $request->location,
        ]);

        return ['status' => true, 'message' => 'Leave Application Apply Successfully'];


    }

    public function update($request){
        LeaveRegister::where('user_id',$request->user_id)->where('leave_id',$request->leave_id)->update([
            'leave_eligible' => $request->leave_eligible,
             'leave_balance' => DB::raw($request->leave_eligible . '- leave_enjoyed')
        ]);
        return ['status'=>true , 'message'=>'Leave Category Delete successfully'];
    }
    public function delete($id){
        try {
            $result=$this->edit($id)->delete();
            if($result){
                 return ['status'=>true , 'message'=>'Leave Category Delete successfully'];
            }
         } catch (\Throwable $th) {
            return ['status' => false, 'errors' =>  $th->getMessage()];
         }
    }
    public function status($id){
        try {
            $result = $this->model::find($id);
            if ($result->status == 1) {
                $result->update(['status' => 0]);
                return ['status' => true, 'message' => 'Status updated successfully'];
            } elseif ($result->status == 0) {
                $result->update(['status' => 1]);
                return ['status' => true, 'message' => 'Status updated successfully'];
            } else {
                return ['status' => false, 'message' => 'Invalid status value'];
            }
        } catch (\Throwable $th) {
            //throw $th;
            return ['status' => false, 'errors' =>  $th->getMessage()];
        }
    }
    public function requestedUser(){
        $currentYear = now()->year;
        $user = User::with('professionaldata')->where('id',Auth::id())->first();
        $departmentId = $user->professionaldata->department_id;

        return $commonUserIds = LeaveApplication::with('user','leavecategory')
            ->where('leave_applications.status', 'R')
            ->where('leave_year', $currentYear)
            ->get();
    }


    public function leaveAcknowledge(){
        $currentYear = now()->year;
        return $leaveAcknowledge = LeaveApplication::with('user','leavecategory')
            ->where('status','C')
            ->where('leave_year', $currentYear)
            ->where('alternate_id',Auth::id())->get();
    }

    public function reportTo(){
        $currentYear = now()->year;
        return $leaveAcknowledge = LeaveApplication::with('user','leavecategory')
            ->where('status','AK')
            ->where('leave_year', $currentYear)
            ->where('recommend_id',Auth::id())->get();
    }

    public function approved($id){
        $user = LeaveApplication::where('id', $id)->first();
        if ($user){
            $leave_balance = LeaveRegister::where('user_id',$user->user_id)->first();
            if($leave_balance->leave_balance < $user->nods ){
                return ['status' => false, 'message' => 'No of days is bigger that leave balance'];
            }

            $leave_balance->update([
                'leave_enjoyed'=>$leave_balance->leave_enjoyed + $user->nods,
               'leave_balance'=>$leave_balance->leave_balance - $user->nods,
            ]);
            $user->update(
                [
                    'approve_id'=>Auth::id(),
                    'approve_date'=>Carbon::now(),
                    'status' => 'A'
                ]
            );
            return ['status' => true, 'message' => 'Application Approved Successfully'];
        }
    }
    public function rejected($id){
        $user = LeaveApplication::where('id', $id)->first();
        $user->update(['status' => 'L']);
        return ['status' => true, 'message' => 'Application Cancelled Successfully'];
    }

    public function approvedByAlternate($id){
        $user = LeaveApplication::where('id', $id)->first();
        $user->update(['status' => 'AK']);
        return ['status' => true, 'message' => 'Application Approved Successfully'];
    }

    public function rejectedByAlternate($id){
        $user = LeaveApplication::where('id', $id)->first();
        $user->update(['status' => 'CA']);
        return ['status' => true, 'message' => 'Application Cancelled Successfully'];
    }

    public function approvedByReportTo($id){
        $user = LeaveApplication::where('id', $id)->first();
        $user->update(['status' => 'R']);
        return ['status' => true, 'message' => 'Application Approved Successfully'];
    }

    public function rejectedByReportTo($id){
        $user = LeaveApplication::where('id', $id)->first();
        $user->update(['status' => 'D']);
        return ['status' => true, 'message' => 'Application Cancelled Successfully'];
    }

    public function myLeaveData($id){

        $sick_leave = SiteSettings::first();

        $c_year = date("Y");
        $is_exist = LeaveRegister::where('user_id', $id)->where('leave_year',$c_year)->exists();
        $companyId = \App\Models\User::where('id', $id)->value('company_id');
        $currentDate = Carbon::now();
        $previousYear = $currentDate->subYear();
        $lastDateOfPreviousYear = $previousYear->endOfYear();
        $end_date = $lastDateOfPreviousYear->format('Y-m-d');

//        if ($is_exist) {
//            return back();
//        }
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
            //dd($process_date);
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
                        //            $request->session()->flash('alert-danger', $error.'Not Saved');
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
                            //            $request->session()->flash('alert-danger', $error.'Not Saved');
                            return response()->json(['error' => $error], 404);
                        }
                        DB::commit();
                    }

                }
            }
            $end_day = Carbon::parse($end_date);
            LeaveRegister::where('user_id',$id)->where('leave_year',$end_day->year)->delete();

    }

}