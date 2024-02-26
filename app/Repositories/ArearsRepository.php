<?php
namespace App\Repositories;


use App\Models\Arears;
use App\Models\OrgCalender;
use Illuminate\Support\Facades\Auth;

class ArearsRepository {
    protected $model;

    public function __construct(Arears $model)
    {
        $this->model=$model;
    }

    public function getAll(){
        return $this->model::with('user','org')->get();
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
                 return ['status'=>true , 'message'=>'Arears Delete successfully'];
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
//        try {
            $check_so = OrgCalender::where('salary_open','O')->first();
            if ($check_so){
                $data = $this->model::updateOrCreate(
                    ['id' =>isset( $request->id)?  $request->id : ''],
                    [
                        'user_id' => $request->user_id,
                        'amount' => $request->amount,
                        'period_id'=>$check_so->id,
                        'description'=>$request->description,
                    ]
                );
                if ($data) {
                    $message = $action == "save" ?"Arears Save Successfully" :"Arears Update Successfully";
                    return ['status' => true, 'message' => $message,];
                }

            }


//        } catch (\Exception $e) {
//            return ['status' => false, 'errors' =>  $e->getMessage()];
//        }
    }


}