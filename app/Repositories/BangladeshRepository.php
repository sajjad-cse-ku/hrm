<?php
namespace App\Repositories;


use App\Models\Bangladesh;
use Illuminate\Support\Facades\Auth;

class BangladeshRepository {
    protected $model;

    public function __construct(Bangladesh $model)
    {
        $this->model=$model;
    }

    public function getAll(){
        $chunkSize = 100;
        $allData = [];

        $this->model::chunk($chunkSize, function ($records) use (&$allData) {
            $allData = array_merge($allData, $records->toArray());
        });

        return $allData;
//        return $this->model::get();
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
                 return ['status'=>true , 'message'=>'Bangladesh Delete successfully'];
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
                        'division' => $request->division,
                        'district' => $request->district,
                        'thana' => $request->thana,
                        'post_office' => $request->post_office,
                        'post_code' => $request->post_code,
                   ]
                );
            if ($data) {
                $message = $action == "save" ?"Bangladesh Save Successfully" :"Bangladesh Update Successfully";
                return ['status' => true, 'message' => $message,];
            }


        } catch (\Exception $e) {
            return ['status' => false, 'errors' =>  $e->getMessage()];
        }
    }


}