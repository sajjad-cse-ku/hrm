<?php
namespace App\Repositories;


use App\Models\PublicHoliday;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class PublicHolidayRepository {
    protected $model;

    public function __construct(PublicHoliday $model)
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
                 return ['status'=>true , 'message'=>'Public Holiday Delete successfully'];
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
            $currentYear = Carbon::now()->year;
               $data = $this->model::updateOrCreate(
                   ['id' =>isset( $request->id)?  $request->id : ''],
                   [
                        'hYear'=>$currentYear,
                        'from_date' => $request->from_date,
                        'to_date' => $request->to_date,
                        'title' => $request->title,
                        'nods' => $request->nods,
                        'description' => $request->description,
                        'created_by'=>Auth::user()->id,
                        'company_id'=>$companyId
                   ]
                );
            if ($data) {
                $message = $action == "save" ?"Public Holiday Save Successfully" :"Public Holiday Update Successfully";
                return ['status' => true, 'message' => $message,];
            }


        } catch (\Exception $e) {
            return ['status' => false, 'errors' =>  $e->getMessage()];
        }
    }


}