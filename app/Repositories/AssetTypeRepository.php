<?php
namespace App\Repositories;
use App\Models\AssetType;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;

class AssetTypeRepository {
    protected $model;

    public function __construct(AssetType $model)
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
        return $this->model::find($id);
    }

    public function update($request){
        return $this->storeOrUpdate($request , $action="update");
    }

    public function delete($id){
        try {
            $result=$this->edit($id)->delete();
            if($result){
                return ['status'=>true , 'message'=>'Asset Type Delete successfully'];
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
        $company_id = User::where('id',Auth::id())->value('company_id');
//        dd($company_id);
        try {
            $data = $this->model::updateOrCreate(
                ['id' => $request->id], // 'id' is used as the condition
                [
                    'company_id' => $company_id,
                    'created_by' => auth()->id(),
                    'name' => $request->name,
                    'asset_type' => $request->asset_type,
                ]
            );
            if ($data) {
                $message = $action == "save" ?"Asset Type Save Successfully" :"Asset Type Update Successfully";
                return ['status' => true, 'message' => $message,];
            }
        } catch (\Exception $e) {
            return ['status' => false, 'errors' => $e->getMessage()];
        }
    }
}