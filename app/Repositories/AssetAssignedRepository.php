<?php
namespace App\Repositories;
use App\Models\Asset;
use App\Models\AssetAssigned;
use App\Models\AssetType;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;

class AssetAssignedRepository {
    protected $model;

    public function __construct(AssetAssigned $model)
    {
        $this->model=$model;
    }

    public function getAll(){
        return $this->model::with('company','assettype','asset','createdby','assignedby','employee')->get();
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
                return ['status'=>true , 'message'=>'Asset Delete successfully'];
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
        $asset_type_id = Asset::where('id',$request->asset_id)->value('asset_type_id');
        try {
            $data = $this->model::updateOrCreate(
                ['id' => $request->id],
                [
                    'employee_id'=> $request->employee_id,
                    'asset_type_id' => $asset_type_id,
                    'asset_id' => $request->asset_id,
                    'assigned_by' => $request->assigned_by,
                    'created_by' =>Auth::id(),
                    'assigned_date' => $request->assigned_date,
                    'return_date' => $request->return_date,
                    'return_condition' => $request->return_condition,
                    'return_reason' => $request->return_reason,
                    'location' => $request->location,
                    'approval_note' => $request->approval_note,
                    'description' => $request->description,
                ]
            );

            if ($data) {
                $message = $action == "save" ?"Asset Save Successfully" :"Asset Update Successfully";
                return ['status' => true, 'message' => $message,];
            }
        } catch (\Exception $e) {
            return ['status' => false, 'errors' => $e->getMessage()];
        }
    }
}