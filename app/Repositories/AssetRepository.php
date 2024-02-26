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

class AssetRepository {
    protected $model;

    public function __construct(Asset $model)
    {
        $this->model=$model;
    }

    public function getAll(){
        return $this->model::with('company','assettype','user')->get();
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
            }else{
                return ['status'=>false , 'message'=>'Asset Delete successfully'];
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
        $companyId = AssetType::where('id',$request->asset_type_id)->value('company_id');
        try {
            $data = $this->model::updateOrCreate(
                ['id' => $request->id],
                [
                    'company_id'=> $companyId,
                    'product_name'=> $request->product_name,
                    'asset_type_id' => $request->asset_type_id,
                    'model' => $request->model,
                    'serial_no' => $request->serial_no,
                    'office_tag_number' => $request->office_tag_number,
                    'purchase_date' => $request->purchase_date,
                    'purchase_quantity' => $request->purchase_quantity,
                    'total_quantity' => $request->total_quantity,
                    'purchase_price' => $request->purchase_price,
                    'purchase_by' => $request->purchase_by,
                    'warranty_info' => $request->warranty_info,
                    'purchase_condition' => $request->purchase_condition,
                    'destroy_date' => $request->destroy_date,
                    'destroy_note' => $request->destroy_note,
                    'details' => $request->details,
                    'created_by' =>Auth::id(),
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