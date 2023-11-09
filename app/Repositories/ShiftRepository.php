<?php
namespace App\Repositories;


use App\Models\Shift;
use Illuminate\Support\Facades\Auth;

class ShiftRepository {
    protected $model;

    public function __construct(Shift $model)
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
                 return ['status'=>true , 'message'=>'Shift Delete successfully'];
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
                        'name'=>$request->name,
                        'short_name'=>$request->short_name,
                        'from_time'=>$request->from_time ?? '00:00',
                        'to_time'=>$request->to_time ?? '00:00',
                        'duty_hour'=>$request->duty_hour ?? 0,
                        'end_next_day'=>$request->end_next_day ?? 0,
                        'effective_date'=>$request->effective_date ?? \Carbon\Carbon::now()->format('Y-m-d'),
                        'description'=>$request->description,
                        'created_by'=>Auth::user()->id,
                        'company_id'=>$companyId
                   ]
                );
            if ($data) {
                $message = $action == "save" ?"Shift Save Successfully" :"Shift Update Successfully";
                return ['status' => true, 'message' => $message,];
            }


        } catch (\Exception $e) {
            return ['status' => false, 'errors' =>  $e->getMessage()];
        }
    }


}