<?php

namespace App\Http\Controllers;

use App\Http\Requests\PublicHolidayRequest;
use App\Repositories\PublicHolidayRepository;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicHolidayController extends Controller
{
    protected $public_holiday;
    public function __construct(PublicHolidayRepository $public_holiday)
    {
        $this->public_holiday = $public_holiday;
    }


    public function index(){
        $result = $this->public_holiday->getAll();
        return Inertia::render('Module/PublicHoliday/Index',[
            'permissions' => checkPermissions(), 
            'result' => $result
        ]);
    }
    public function create(){
        return Inertia::render('Module/PublicHoliday/Add');
    }
    public function store(PublicHolidayRequest $request){
        $result = $this->public_holiday->store($request);
        if($result['status']== true){
            // return back()->with('success', $result['message']);
            return to_route('admin.public_holiday')->with('success', $result['message']);
        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }
    public function edit($id){
        $result = $this->public_holiday->edit($id);
        return Inertia::render('Module/PublicHoliday/Edit',['result'=>$result]);
    }
    public function update(Request $request){
        $result=$this->public_holiday->update($request);
        if($result['status']== true){
            // return back()->with('success', $result['message']);
            return to_route('admin.public_holiday')->with('success', $result['message']);
        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }
    public function delete($id){
        $result= $this->public_holiday->delete($id);
        return back()->with('success', $result['message']);
    }
    public function status($id){
        $result = $this->public_holiday->status($id);
        return back()->with('success', $result['message']);
    }
}
