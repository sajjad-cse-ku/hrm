<?php

namespace App\Http\Controllers;

use App\Http\Requests\DutyLocationRequest;
use App\Repositories\DutyLocationsRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DutyLocationController extends Controller
{
    protected $duty_location;
    public function __construct(DutyLocationsRepository $duty_location)
    {
        $this->duty_location = $duty_location;
    }


    public function index(){
        $result = $this->duty_location->getAll();
        return Inertia::render('Module/DutyLocation/Index',['result' => $result]);
    }
    public function create(){
        return Inertia::render('Module/DutyLocation/Add');
    }
    public function store(DutyLocationRequest $request){
        $result = $this->duty_location->store($request);
        if($result['status']== true){
            // return back()->with('success', $result['message']);
            return to_route('admin.duty_locations')->with('success', $result['message']);
        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }
    public function edit($id){
        $result = $this->duty_location->edit($id);
        return Inertia::render('Module/DutyLocation/Edit',['result'=>$result]);
    }
    public function update(Request $request){
        $result=$this->duty_location->update($request);
        if($result['status']== true){
            // return back()->with('success', $result['message']);
            return to_route('admin.duty_locations')->with('success', $result['message']);
        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }
    public function delete($id){
        $result= $this->duty_location->delete($id);
        return back()->with('success', $result['message']);
    }
    public function status($id){
        $result = $this->duty_location->status($id);
        return back()->with('success', $result['message']);
    }
}
