<?php
namespace App\Repositories;
use App\Models\SalarySetup;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;

class SalarySetupRepository {
    protected $model;

    public function __construct(SalarySetup $model)
    {
        $this->model=$model;
    }

    public function getAll(){
        return $this->model::with('user','company')->get();
    }

    public function store($request){
        return $this->storeOrUpdate($request , $action="save");
    }

    public function edit(int $id){
        return $this->model::with('user:id,first_name,last_name,machine_user_id','user.professionaldata:id,user_id,department_id,designation_id,joining_date','user.professionaldata.department:id,name','user.professionaldata.designation:id,name')->find($id);
    }

    public function update($request){
        return $this->storeOrUpdate($request , $action="update");
    }

    public function delete($id){
        try {
            $result=$this->edit($id)->delete();
            if($result){
                return ['status'=>true , 'message'=>'Salary Setup Delete successfully'];
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
//        dd($request->all());
        try {
            $data = $this->model::updateOrCreate(
                ['id' => $request->id], // 'id' is used as the condition
                [
                    'company_id' => $request->company_id,
                    'user_id' => $request->user_id,
                    'created_by' => Auth::id(),
                    'basic' => $request->basic ?? 0,
                    'ot_basic' => $request->ot_basic ?? 0,
                    'house_rent' => $request->house_rent ?? 0,
                    'medical' => $request->medical ?? 0,
                    'entertainment' => $request->entertainment ?? 0,
                    'conveyance' => $request->conveyance ?? 0,
                    'food' => $request->food ?? 0,
                    'special_allowance' => $request->special_allowance ?? 0,
                    'others_allowance' => $request->others_allowance ?? 0,
                    'gross_salary' => $request->gross_salary ?? 0,
                    'cash_salary' => $request->cash_salary ?? 0,

                    'pf_own' => $request->pf_own ?? 0,
                    'income_tax' => $request->income_tax ?? 0,
                    'salary_advance' => $request->salary_advance ?? 0,
////                    'mobile_others' => $request->mobile_others ?? null,
                    'stamp_fee' => $request->stamp_fee ?? 0,
                    'punishment' => $request->punishment ?? 0,
                    'other_deduction' => $request->other_deduction ?? 0,
//
                    'other_deduction_details' => $request->other_deduction_details ?? null,
////
                    'bank_id' => $request->bank_id ?? 1,
                    'account_no' => $request->account_no ?? 151515000,
                    'tds' => $request->tds ?? "N",
                ]
            );
            if ($data) {
                $message = $action == "save" ?"Salary Setup Save Successfully" :"Salary Setup Update Successfully";
                return ['status' => true, 'message' => $message,];
            }
        } catch (\Exception $e) {
            return ['status' => false, 'errors' => $e->getMessage()];
        }
    }

}