<?php

namespace App\Http\Controllers;

use App\Http\Requests\DesignationRequest;
use App\Repositories\DesignationRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DesignationController extends Controller
{
    protected $designation;
    public function __construct(DesignationRepository $designation)
    {
        $this->designation = $designation;
    }


    public function index(){
        $result = $this->designation->getAll();
        return Inertia::render('Module/Designation/Index',['result' => $result]);
    }
    public function create(){
        return Inertia::render('Module/Designation/Add');
    }
    public function store(DesignationRequest $request){
        $result = $this->designation->store($request);
        if($result['status']== true){
            // return back()->with('success', $result['message']);
            return to_route('admin.designation')->with('success', $result['message']);

        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }
    public function edit($id){
        $result = $this->designation->edit($id);
        return Inertia::render('Module/Designation/Edit',['result'=>$result]);
    }
    public function update(Request $request){
        $result=$this->designation->update($request);
        if($result['status']== true){
            // return back()->with('success', $result['message']);
            return to_route('admin.designation')->with('success', $result['message']);
        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }
    public function delete($id){
        $result= $this->designation->delete($id);
        return back()->with('success', $result['message']);
    }
    public function status($id){
        $result = $this->designation->status($id);
        return back()->with('success', $result['message']);
    }
}
