<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrgCalenderRequest;
use App\Repositories\OrgCalenderRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrgCalenderController extends Controller
{
    protected $org_calender;

    public function __construct(OrgCalenderRepository $org_calender)
    {
        $this->org_calender = $org_calender;
    }

    public function index(){
        $result = $this->org_calender->getAll();
        return Inertia::render('Module/OrgCalender/Index',['result' => $result]);
    }
    public function create(){
        return Inertia::render('Module/OrgCalender/Add');
    }
    public function store(OrgCalenderRequest $request){
        $result = $this->org_calender->store($request);
        if($result['status'] === true){
            return to_route('admin.org_calender')->with('success', $result['message']);
        }elseif($result['status']== 'same'){
            return back()->with('error', $result['message']);
        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }
    public function edit($id){
        $result = $this->org_calender->edit($id);
        return Inertia::render('Module/OrgCalender/Edit',['result'=>$result]);
    }
    public function update(Request $request){
        $result=$this->org_calender->update($request);
        if($result['status'] === true){
            return to_route('admin.org_calender')->with('success', $result['message']);
        }elseif($result['status']== 'same'){
            return back()->with('error', $result['message']);
        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }
    public function delete($id){
        $result= $this->org_calender->delete($id);
        return back()->with('success', $result['message']);
    }
    public function status($id){
        $result = $this->org_calender->status($id);
        return back()->with('success', $result['message']);
    }
}
