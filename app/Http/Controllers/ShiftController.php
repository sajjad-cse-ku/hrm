<?php

namespace App\Http\Controllers;

use App\Http\Requests\ShiftRequest;
use App\Repositories\ShiftRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShiftController extends Controller
{
    protected $shift;
    public function __construct(ShiftRepository $shift)
    {
        $this->shift = $shift;
    }


    public function index(){
        $result = $this->shift->getAll();
        return Inertia::render('Module/Shift/Index',[
            'permissions' => checkPermissions(),  
            'result' => $result
        ]);
    }
    public function create(){
        return Inertia::render('Module/Shift/Add');
    }
    public function store(ShiftRequest $request){
        $result = $this->shift->store($request);
        if($result['status']== true){
            // return back()->with('success', $result['message']);
            return to_route('admin.shift')->with('success', $result['message']);
        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }
    public function edit($id){
        $result = $this->shift->edit($id);
        return Inertia::render('Module/Shift/Edit',['result'=>$result]);
    }
    public function update(Request $request){
        $result=$this->shift->update($request);
        if($result['status']== true){
            // return back()->with('success', $result['message']);
            return to_route('admin.shift')->with('success', $result['message']);
        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }
    public function delete($id){
        $result= $this->shift->delete($id);
        return back()->with('success', $result['message']);
    }
    public function status($id){
        $result = $this->shift->status($id);
        return back()->with('success', $result['message']);
    }
}
