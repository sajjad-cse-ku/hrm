<?php

namespace App\Http\Controllers;

use App\Http\Requests\SectionRequest;
use App\Models\Department;
use App\Models\User;
use App\Repositories\SectionRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SectionController extends Controller
{
    protected $section;
    public function __construct(SectionRepository $section)
    {
        $this->section = $section;
    }


    public function index(){
        $result = $this->section->getAll();
        return Inertia::render('Module/Section/Index',['result' => $result]);
    }
    public function create(){
        $users = User::get();
        $departments= Department::get();
        return Inertia::render('Module/Section/Add',['users'=>$users,'departments'=>$departments]);
    }
    public function store(SectionRequest $request){
        $result = $this->section->store($request);
        if($result['status']== true){
            // return back()->with('success', $result['message']);
            return to_route('admin.section')->with('success', $result['message']);

        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }
    public function edit($id){
        $result = $this->section->edit($id);
        $users = User::get();
        $departments= Department::get();
        return Inertia::render('Module/Section/Edit',['result'=>$result,'users'=>$users,'departments'=>$departments]);
    }
    public function update(Request $request){
        $result=$this->section->update($request);
        if($result['status']== true){
            // return back()->with('success', $result['message']);
            return to_route('admin.section')->with('success', $result['message']);
        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }
    public function delete($id){
        $result= $this->section->delete($id);
        return back()->with('success', $result['message']);
    }
    public function status($id){
        $result = $this->section->status($id);
        return back()->with('success', $result['message']);
    }
}
