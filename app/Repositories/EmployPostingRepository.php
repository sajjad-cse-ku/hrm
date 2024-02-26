<?php
namespace App\Repositories;


use App\Models\EmployeePosting;
use App\Models\EmployeeProfessional;
use Illuminate\Support\Facades\Auth;

class EmployPostingRepository {
    protected $model;

    public function __construct(EmployeePosting $model)
    {
        $this->model=$model;
    }

    public function getAll($id){
        return $this->model::with('user','user.professionaldata','user.personaldata','user.professionaldata.designation','company','department')->where('user_id',$id)->get();
    }
    public function store($request){
        return $this->storeOrUpdate($request , $action="save");
    }
    public function edit(int $id){
        return $this->model::find($id);
    }

    public function update($request){
        return $this->storeOrUpdate($request , $action="update");
    }
    public function delete($id){
        try {
            $result=$this->edit($id)->delete();
            if($result){
                 return ['status'=>true , 'message'=>'Employee Posting Delete successfully'];
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
        $professional = EmployeeProfessional::where('user_id', $request->user_id)->update([
            'department_id'=>$request->department_id,
            'section_id'=>$request->section_id,
        ]);
        try {
            $companyId = \App\Models\User::where('id', auth()->user()->id)->value('company_id');
               $data = $this->model::updateOrCreate(
                   [
                       'id' =>isset( $request->id)?  $request->id : ''
                   ],
                   [
                        'user_id'=>$request->user_id,
                        'company_id'=>$companyId,
                        'department_id'=>$request->department_id,
                        'section_id'=>$request->section_id,
                        'report_to'=>$request->report_to,
                        'posting_start_date'=>$request->posting_start_date,
                        'posting_end_date'=>$request->posting_end_date,
                        'posting_notes'=>$request->posting_notes,
                        'descriptions'=>$request->descriptions,
                       'created_by'=>Auth::id()
                   ]
                );
            if ($data) {
                $message = $action == "save" ?"Employee Posting Save Successfully" :"Employee Posting Update Successfully";
                return ['status' => true, 'message' => $message,];
            }


        } catch (\Exception $e) {
            return ['status' => false, 'errors' =>  $e->getMessage()];
        }
    }


}