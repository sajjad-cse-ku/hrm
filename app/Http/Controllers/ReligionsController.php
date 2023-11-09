<?php

namespace App\Http\Controllers;


use App\Http\Requests\ReligionsRequest;
use App\Repositories\ReligonsRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReligionsController extends Controller
{
    protected $religions;
    public function __construct(ReligonsRepository $religions)
    {
        $this->religions = $religions;
    }


    public function index(){
        $result = $this->religions->getAll();
        return Inertia::render('Module/Religions/Index',['result' => $result]);
    }
    public function create(){
        return Inertia::render('Module/Religions/Add');
    }
    public function store(ReligionsRequest $request){
        $result = $this->religions->store($request);
        if($result['status']== true){
            // return back()->with('success', $result['message']); 
            return to_route('admin.religions')->with('success', $result['message']);
        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }
    public function edit($id){
        $result = $this->religions->edit($id);
        return Inertia::render('Module/Religions/Edit',['result'=>$result]);
    }
    public function update(Request $request){
        $result=$this->religions->update($request);
        if($result['status']== true){
            // return back()->with('success', $result['message']);
            return to_route('admin.religions')->with('success', $result['message']);
        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }
    public function delete($id){
        $result= $this->religions->delete($id);
        return back()->with('success', $result['message']);
    }
    public function status($id){
        $result = $this->religions->status($id);
        return back()->with('success', $result['message']);
    }
}