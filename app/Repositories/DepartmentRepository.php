<?php
namespace App\Repositories;


use App\Models\Department;
use Illuminate\Support\Facades\Auth;

class DepartmentRepository {
    protected $model;

    public function __construct(Department $model)
    {
        $this->model=$model;
    }

    public function getAll(){
        return $this->model::all();
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
                 return ['status'=>true , 'message'=>'Department Delete successfully'];
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
            $currentMonthId = date('n');
            $companyId = \App\Models\User::where('id', auth()->user()->id)->value('company_id');
               $data = $this->model::updateOrCreate(
                   ['id' =>isset( $request->id)?  $request->id : ''],
                   [
                       'name' => $request->name,
                       'short_name' =>$request->short_name,
                       'department_code' => $request->department_code ?? null,
                       'started_from' => $request->started_from ?? \Carbon\Carbon::now(),
                       'top_rank' => $request->top_rank,
                       'roster_month_id'=>$currentMonthId,
                       'report_to' => $request->report_to ?? null,
                       'headed_by' => $request->headed_by ?? null,
                       'second_man' => $request->second_man ?? null,
                       'created_by'=>Auth::user()->id,
                       'company_id'=>$companyId
                   ]
                );
            if ($data) {
                $message = $action == "save" ?"Department Save Successfully" :"Department Update Successfully";
                return ['status' => true, 'message' => $message,];
            }


        } catch (\Exception $e) {
            return ['status' => false, 'errors' =>  $e->getMessage()];
        }
    }
}

