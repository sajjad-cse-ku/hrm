<?php

namespace App\Http\Controllers;

use App\Http\Requests\BangladeshRequest;
use App\Repositories\BangladeshRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BangladeshController extends Controller
{
    protected $bangladesh;
    public function __construct(BangladeshRepository $bangladesh)
    {
        $this->bangladesh = $bangladesh;
    }


    public function index(){
        $result = $this->bangladesh->getAll();
        return Inertia::render('Module/Bangladesh/Index',['result' => $result]);
    }
    public function create(){
        return Inertia::render('Module/Bangladesh/Add');
    }
    public function store(BangladeshRequest $request){
        $result = $this->bangladesh->store($request);
        if($result['status']== true){
            return back()->with('success', $result['message']);
        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }
    public function edit($id){
        $result = $this->bangladesh->edit($id);
        return Inertia::render('Module/Bangladesh/Edit',['result'=>$result]);
    }
    public function update(Request $request){
        $result=$this->bangladesh->update($request);
        if($result['status']== true){
            return back()->with('success', $result['message']);
        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }
    public function delete($id){
        $result= $this->bangladesh->delete($id);
        return back()->with('success', $result['message']);
    }
    public function status($id){
        $result = $this->bangladesh->status($id);
        return back()->with('success', $result['message']);
    }
}
