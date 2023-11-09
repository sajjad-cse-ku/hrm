<?php

namespace App\Http\Controllers;

use App\Http\Requests\ModuleRequest;
use App\Repositories\ModuleRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ModuleController extends Controller
{
    protected $module;
    public function __construct(ModuleRepository $module)
    {
        $this->module = $module;
    }


    public function index(){
        $result = $this->module->getAll();
        return Inertia::render('Module/Module/Index',['result' => $result]);
    }
    public function create(){
        return Inertia::render('Module/Module/Add');
    }
    public function store(ModuleRequest $request){
        $result = $this->module->store($request);
        if($result['status']== true){
            return to_route('admin.modules')->with('success', $result['message']);
        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }
    public function edit($id){
        $result = $this->module->edit($id);
        return Inertia::render('Module/Module/Edit',['result'=>$result]);
    }
    public function update(Request $request){
        $result=$this->module->update($request);
        if($result['status']== true){
            return to_route('admin.modules')->with('success', $result['message']);
        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }
    public function delete($id){
        $result= $this->module->delete($id);
        return back()->with('success', $result['message']);
    }
    public function status($id){
        $result = $this->module->status($id);
        return back()->with('success', $result['message']);
    }
}
