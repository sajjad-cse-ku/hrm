<?php
namespace App\Repositories;


use App\Models\EmployeeProfessional;
use App\Models\EmployeePromotion;
use http\Env\Request;
use Illuminate\Support\Facades\Auth;

class EmployeePromotionRepository {
    protected $model;

    public function __construct(EmployeePromotion $model)
    {
        $this->model = $model;
    }

    public function getAll($id){
        return $this->model::with('user','user.professionaldata','user.personaldata','user.professionaldata.designation','company','designation')->where('user_id',$id)->get();
    }

    public function store($request){
        return $this->StoreOrUpdate($request , $action = "save");
    }

    public function edit($id){
        return $this->model::find($id);
    }

    public function update($request){
        return $this->storeOrUpdate($request , $action = "update");
    }

    public function delete($id){
        try {
            $result=$this->model::find($id)->delete();
            if($result){
                return ['status'=>true , 'message'=>'Employee Posting Delete successfully'];
            }
        } catch (\Throwable $th) {
            //throw $th;
            return ['status' => false, 'errors' =>  $th->getMessage()];
        }

    }

    public function status($id) {
        try {
            $result = $this->model::find($id);
            $result->update(['status' => $result->status == 1 ? 0 : 1]);

            return ['status' => true, 'message' => 'Status Updated Successfully'];

        } catch (\Throwable $th) {
            return ['status' => false, 'error' => $th->getMessage()];
        }
    }

    protected function StoreOrUpdate($request, $action){
        $professional = EmployeeProfessional::where('user_id', $request->user_id)->update([
            'designation_id'=>$request->designation_id,
        ]);

        try {
            $data = $this->model::updateOrCreate(
                ['id' => $request->id ?? null],
                    [
                        'company_id' => $request->company_id,
                        'created_by' => $request->created_by,
                        'user_id' => $request->user_id,
                        'effective_date' => $request->effective_date,
                        'designation_id' => $request->designation_id,
                        'descriptions' => $request->descriptions,
                    ],
        );
            if ($data)
            {
                $message = $action === "save" ? "Employee Promotion Save Successfully" : "Employee Promotion Updated Successfully";
                return ['status'=>true,'message'=>$message];
            }

        } catch (\Exception $e) {
            return ['status' => false, 'errors' =>  $e->getMessage()];
        }
    }
}