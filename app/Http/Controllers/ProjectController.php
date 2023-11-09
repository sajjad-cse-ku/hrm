<?php

namespace App\Http\Controllers;

use App\Http\Requests\ModuleRequest;
use App\Http\Requests\ProjectRequest;
use App\Repositories\ProjectRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    protected $project;
    public function __construct(ProjectRepository $project)
    {
        $this->project = $project;
    }


    public function index(){
        $result = $this->project->getAll();
        return Inertia::render('Module/Project/Index',['result' => $result]);
    }
    public function create(){
        return Inertia::render('Module/Project/Add');
    }
    public function store(ProjectRequest $request){
        $result = $this->project->store($request);
        if($result['status']== true){
            return to_route('admin.project')->with('success', $result['message']);
        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }
    public function edit($id){
        $result = $this->project->edit($id);
        return Inertia::render('Module/Project/Edit',['result'=>$result]);
    }
    public function update(Request $request){
        $result=$this->project->update($request);
        if($result['status']== true){
            return to_route('admin.project')->with('success', $result['message']);
        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }
    public function delete($id){
        $result= $this->project->delete($id);
        return back()->with('success', $result['message']);
    }
    public function status($id){
        $result = $this->project->status($id);
        return back()->with('success', $result['message']);
    }
}
