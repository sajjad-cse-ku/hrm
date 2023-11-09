<?php

namespace App\Http\Controllers;

use App\Http\Requests\DepartmentRequest;
use App\Models\User;

use App\Repositories\DepartmentRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DepartmentController extends Controller
{
    protected $department;
    public function __construct(DepartmentRepository $department)
    {
        $this->department = $department;
    }


    public function index(){
        $result = $this->department->getAll();
        return Inertia::render('Module/Department/Index',['result' => $result]);
    }
    public function create(){
        $users = User::get();
        return Inertia::render('Module/Department/Add',['users'=>$users]);
    }
    public function store(DepartmentRequest $request){
        $result = $this->department->store($request);
        if($result['status']== true){

            // return back()->with('success', $result['message']);
            return to_route('admin.department')->with('success', $result['message']);

        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }
    public function edit($id){
        $result = $this->department->edit($id);
        $users = User::get();
        return Inertia::render('Module/Department/Edit',['result'=>$result,'users'=>$users]);
    }
    public function update(Request $request){
        $result=$this->department->update($request);
        if($result['status']== true){
            // return back()->with('success', $result['message']);
            return to_route('admin.department')->with('success', $result['message']);
        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }
    public function delete($id){
        $result= $this->department->delete($id);
        return back()->with('success', $result['message']);
    }
    public function status($id){
        $result = $this->department->status($id);
        return back()->with('success', $result['message']);
    }
}
