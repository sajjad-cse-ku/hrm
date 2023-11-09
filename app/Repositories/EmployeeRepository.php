<?php
namespace App\Repositories;


use App\Models\EmployeePersonal;
use App\Models\EmployeeProfessional;
use App\Models\Title;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class EmployeeRepository {
    protected $model;

    public function __construct(User $model)
    {
        $this->model=$model;
    }

    public function getAll(){
        return User::with('personaldata','professionaldata','professionaldata.designation','professionaldata.department','professionaldata.working')
            ->where('is_show',1)
            ->orderBy('first_name','ASC')
            ->get();
    }
    public function store($request){
        return $this->storeOrUpdate($request , $action="save");
    }
    public function edit(int $id){
        return $this->model::with('personaldata','professionaldata','professionaldata.designation','professionaldata.department','professionaldata.working')->find($id);
    }

    public function update($request){
        return $this->storeOrUpdate($request , $action="update");
    }
    public function delete($id){
        try {
            $result=User::findOrFail($id);
            if($result){
                $result->delete();
                 return ['status'=>true , 'message'=>'User Delete successfully'];
            }
         } catch (\Throwable $th) {
            //throw $th;
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
    protected function storeOrUpdate($request, $action)
    {
        try {
            $user = User::with('personaldata')->where('id',$request->user_id)->first();

            if(!empty($request->avatar)){
                $avatar =  fileUpload($request->avatar[0] , "profile");
            }else if(isset($user->avatar)){
                $avatar = $user->avatar;
            }else{
                $avatar ="";
            }

            if(!empty($request->signature)){
                $signature =  fileUpload($request->signature[0] , "signature");
            }else if(isset($user->signature)){
                $signature = $user->signature;
            }else{
                $signature ="";
            }


            $companyId = \App\Models\User::where('id', auth()->user()->id)->value('company_id');
            $user = User::updateOrCreate(
                [
                    'id'=>$request->user_id,
                ],
                [
                'company_id'=>$companyId,
                'username' => $request->first_name.' '.$request->last_name,
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'mobile'=>$request->mobile,
                'machine_user_id'=>$request->machine_user_id,
                'gender'=>$request->gender,
                'date_of_birth'=>$request->date_of_birth,
                'password' => Hash::make('12345678'),
                'avatar'=>$avatar ?? "",
            ]);
            if($user){
                $personal_data = EmployeePersonal::updateOrCreate(
                    [
                        'user_id'=>$request->user_id,
                    ],
                    [
                    'company_id'=>$companyId,
                    'user_id'=>$user->id,
                    'title_id'=>$request->title_id,
                    'religion_id'=>$request->religion_id,
                    'signature'=>$signature ?? "",
                    'pr_address'=>$request->pr_address,
                    'pr_district'=>$request->pr_district,
                    'pr_police_station'=>$request->pr_police_station,
                    'pr_post_code'=>$request->pr_post_code,
                    'pm_address'=>$request->pm_address,
                    'pm_district'=>$request->pm_district,
                    'pm_police_station'=>$request->pm_police_station,
                    'pm_post_code'=>$request->pm_post_code,
                    'm_address'=>$request->m_address,
                    'm_district'=>$request->m_district,
                    'm_police_station'=>$request->m_police_station,
                    'm_post_code'=>$request->m_post_code,
                    'biography'=>$request->biography,
                    'father_name'=>$request->father_name,
                    'mother_name'=>$request->mother_name,
                    'spouse_name'=>$request->spouse_name,
                    'blood_group'=>$request->blood_group,
                    'last_education'=>$request->last_education,
                    'prof_speciality'=>$request->prof_speciality,
                    'national_id'=>$request->national_id,
                    'is_printed'=>isset($request->is_printed) ?? 0,
                    'status'=>$request->status,
                    'created_by'=>auth()->user()->id,
                ]);
                if($personal_data){
                    $professional_data = EmployeeProfessional::updateOrCreate(
                        [
                            'user_id'=>$request->user_id,
                        ],
                        [
                        'user_id'=>$user->id,
                        'designation_id'=>$request->designation_id,
                        'working_status_id'=>$request->working_status_id,
                        'bank_id'=>$request->bank_id,
                        'pf_no'=>$request->pf_no ?? 0,
                        'report_to'=>$request->report_to,
                        'joining_date'=>$request->joining_date,
                        'overtime'=>$request->overtime ?? 0,
                        'late_allow'=>$request->late_allow ?? 0,
                        'overtime_note'=>$request->overtime_note ?? 0,
                        'transport'=>$request->transport ?? 0,
                        'transport_note'=>$request->transport_note,
                        'pay_grade'=>$request->pay_grade,
                        'pay_schale'=>$request->pay_schale ?? 0,
                        'confirm_probation'=>$request->confirm_probation ?? "P",
                        'confirm_period'=>$request->confirm_period,
                        'bank_acc_no'=>$request->bank_acc_no,
                        'status_change_date'=>$request->status_change_date,
                        'created_by'=>auth()->user()->id,
                    ]);
                }
            }
            if ($professional_data) {
                $message = $action == "save" ?"Employee Save Successfully" :"Employee Update Successfully";
                return ['status' => true, 'message' => $message,];
            }else{
                $message = "Does not insert";
                return ['status' => false, 'message' => $message];
            }

        } catch (\Exception $e) {
            return ['status' => false, 'errors' =>  $e->getMessage()];
        }
    }


}