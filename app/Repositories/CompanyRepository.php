<?php
namespace App\Repositories;

use App\Models\Company;

class CompanyRepository {
    protected $model;

    public function __construct(Company $model)
    {
        $this->model=$model;
    }

    public function getAll(){
        return $this->model::with('groupcompany')->get();
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
                 return ['status'=>true , 'message'=>'Company Delete successfully'];
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
                        'group_company_id'=>$request->group_id,
                        'name' => $request->name,
                        'address' => $request->address,
                        'city' => $request->city,
                        'state' => $request->state,
                        'post_code' => $request->post_code,
                        'email' => $request->email,
                        'country' => $request->country,
                        'phone_no' => $request->phone_no,
                        'website' => $request->website,
                        'currency' => $request->currency ?? 'BDT',
                   ]
                );
            if ($data) {
                $message = $action == "save" ?"Company Save Successfully" :"Company Update Successfully";
                return ['status' => true, 'message' => $message,];
            }


        } catch (\Exception $e) {
            return ['status' => false, 'errors' =>  $e->getMessage()];
        }
    }


}