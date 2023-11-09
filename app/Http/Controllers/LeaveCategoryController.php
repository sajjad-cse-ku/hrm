<?php

namespace App\Http\Controllers;

use App\Http\Requests\LeaveCategoryRequest;
use App\Repositories\LeaveCategoryRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeaveCategoryController extends Controller
{
    protected $leave_category;
    public function __construct(LeaveCategoryRepository $religions)
    {
        $this->leave_category = $religions;
    }


    public function index(){
        $result = $this->leave_category->getAll();
        return Inertia::render('Module/LeaveCategory/Index',[
            'result' => $result,
            'permissions' => checkPermissions(),
        ]);

        ;
    }
    public function create(){
        return Inertia::render('Module/LeaveCategory/Add');
    }
    public function store(LeaveCategoryRequest $request){
        $result = $this->leave_category->store($request);
        if($result['status']== true){
            // return back()->with('success', $result['message']);
            return to_route('admin.leave_category')->with('success', $result['message']);
        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }
    public function edit($id){
        $result = $this->leave_category->edit($id);
        return Inertia::render('Module/LeaveCategory/Edit',['result'=>$result]);
    }
    public function update(Request $request){
        $result=$this->leave_category->update($request);
        if($result['status']== true){
            // return back()->with('success', $result['message']);
            return to_route('admin.leave_category')->with('success', $result['message']);
        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }
    public function delete($id){
        $result= $this->leave_category->delete($id);
        return back()->with('success', $result['message']);
    }
    public function status($id){
        $result = $this->leave_category->status($id);
        return back()->with('success', $result['message']);
    }
}
