<?php
namespace App\Repositories;


use App\Models\OrgCalender;
use Illuminate\Support\Facades\Auth;

class OrgCalenderRepository {
    protected $model;

    public function __construct(OrgCalender $model)
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
                 return ['status'=>true , 'message'=>'Org Calender Delete successfully'];
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
            $companyId = \App\Models\User::where('id', auth()->user()->id)->value('company_id');
               $data = $this->model::updateOrCreate(
                   ['id' =>isset( $request->id)?  $request->id : ''],
                   [
                        'calender_year' => $request->calender_year,
                        'month_id' => $request->month_id,
                        'c_month_id' => $request->c_month_id,
//                        'month_name' => $request->month_name,
                        'start_from' => $request->start_from,
                        'ends_on' => $request->ends_on,
                        'salary_open' => $request->salary_open,
                        'salary_update' => $request->salary_update,
                        'food_open' => $request->food_open,
                        'created_by'=>Auth::user()->id,
                        'company_id'=>$companyId
                   ]
                );
            if ($data) {
                $message = $action == "save" ?"Org Calender Save Successfully" :"Org Calender Update Successfully";
                return ['status' => true, 'message' => $message,];
            }


        } catch (\Exception $e) {
            return ['status' => false, 'errors' =>  $e->getMessage()];
        }
    }


}