<?php

namespace App\Http\Controllers;

use App\Http\Requests\WorkingStatusRequest;
use App\Repositories\WorkingStatusRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WorkingStatusController extends Controller
{
    protected $working_status;
    public function __construct(WorkingStatusRepository $religions)
    {
        $this->working_status = $religions;
    }


    public function index(){
        $result = $this->working_status->getAll();
        return Inertia::render('Module/WorkingStatus/Index',['result' => $result]);
    }
    public function create(){
        return Inertia::render('Module/WorkingStatus/Add');
    }
    public function store(WorkingStatusRequest $request){
        $result = $this->working_status->store($request);
        if($result['status']== true){
            // return back()->with('success', $result['message'])
            return to_route('admin.working_status')->with('success', $result['message']);
            
        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }
    public function edit($id){
        $result = $this->working_status->edit($id);
        return Inertia::render('Module/WorkingStatus/Edit',['result'=>$result]);
    }
    public function update(Request $request){
        $result=$this->working_status->update($request);
        if($result['status']== true){
            // return back()->with('success', $result['message']);
            return to_route('admin.working_status')->with('success', $result['message']);
        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }
    public function delete($id){
        $result= $this->working_status->delete($id);
        return back()->with('success', $result['message']);
    }
    public function status($id){
        $result = $this->working_status->status($id);
        return back()->with('success', $result['message']);
    }
}
