<?php
namespace App\Repositories;


use App\Models\Notice;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class NoticeRepository {
    protected $model;

    public function __construct(Notice $model)
    {
        $this->model=$model;
    }

    public function getAll(){
        return $this->model::with('company')->get();
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
                 return ['status'=>true , 'message'=>'Notice Delete successfully'];
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

        $notice = Notice::where('id',$request->id)->first();
//        dd($notice);
        try {
            $companyId = \App\Models\User::where('id', auth()->user()->id)->value('company_id');

            if($action == 'save'){
                if($request->file_path){
                    $path =  fileUpload($request->file_path , "notice");
                }
            }


            if($action == 'update'){
                if(!empty($request->file_path)){
                    $path =  fileUpload($request->file_path , "notice");
                }else if(isset($notice->file_path)){
                    $path = $notice->file_path;
                }else{
                    $path ="";
                }
            }


               $data = $this->model::updateOrCreate(
                   ['id' => $request->id ?? ''],
                   [
                        'title' => $request->title,
                        'notice_date' => $request->notice_date ?? \Carbon\Carbon::now()->format('Y-m-d'),
                        'expiry_date' => $request->expiry_date,
                        'sender' => $request->sender,
                        'type' => $request->type ?? "D",
                        'confidentiality' => $request->confidentiality ?? "P",
                        'receiver' => $request->receiver ?? "A",
                        'file_path' => $path ?? null,
                        'description' => $request->description,
                        'created_by'=>Auth::user()->id,
                        'company_id'=>$companyId
                   ]
                );
            if ($data) {
                $message = $action == "save" ?"Notice Save Successfully" :"Notice Update Successfully";
                return ['status' => true, 'message' => $message,];
            }


        } catch (\Exception $e) {
            return ['status' => false, 'errors' =>  $e->getMessage()];
        }
    }
}