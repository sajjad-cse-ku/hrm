<?php
namespace App\Repositories;


use App\Models\EmployeeEducation;
use Illuminate\Support\Facades\Auth;

class EmployEducationRepository {
    protected $model;

    public function __construct(EmployeeEducation $model)
    {
        $this->model=$model;
    }

    public function getAll($id){
        return $this->model::with('user','user.professionaldata','user.personaldata','user.professionaldata.designation')->where('user_id',$id)->get();
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
                 return ['status'=>true , 'message'=>'Employee Education Delete successfully'];
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
               $data = $this->model::updateOrCreate(
                   ['id' =>isset( $request->id)?  $request->id : ''],
                   [
                       'user_id'=>$request->user_id,
                       'name'=>$request->name,
                       'description'=>$request->description,
                       'institution'=>$request->institution,
                       'passing_year'=>$request->passing_year,
                       'result'=>$request->result,
                       'degree_type'=>$request->degree_type,
                       'achievement_date'=>$request->achievement_date,
                       'created_by'=>Auth::id()
                   ]
                );
            if ($data) {
                $message = $action == "save" ?"Employee Education Save Successfully" :"Employee Education Update Successfully";
                return ['status' => true, 'message' => $message,];
            }


        } catch (\Exception $e) {
            return ['status' => false, 'errors' =>  $e->getMessage()];
        }
    }


}