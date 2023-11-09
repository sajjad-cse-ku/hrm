<?php

namespace App\Http\Controllers;

use App\Http\Requests\EmployeeEducationRequest;
use App\Models\User;
use App\Repositories\EmployEducationRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeEducationController extends Controller
{
    protected $employee_education;
    public function __construct(EmployEducationRepository $religions)
    {
        $this->employee_education = $religions;
    }


    public function index($id){
        $user_id = $id;
        $user = User::with('professionaldata','personaldata','professionaldata.designation')->where('id',$id)->first();
        $result = $this->employee_education->getAll($id);
        return Inertia::render('Module/EmployeeEducation/Index',['result' => $result , 'user'=>$user,'user_id' => $user_id]);
    }
    public function create($id){
        return Inertia::render('Module/EmployeeEducation/Add',['user_id'=>$id]);
    }
    public function store(EmployeeEducationRequest $request){
        $result = $this->employee_education->store($request);
        if($result['status']== true){
            return to_route('admin.employee_education',$request->user_id)->with('success',$result['message']);
        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }
    public function edit($id){
        $result = $this->employee_education->edit($id);
        return Inertia::render('Module/EmployeeEducation/Edit',['result'=>$result]);
    }
    public function update(Request $request){
        $result=$this->employee_education->update($request);
        if($result['status']== true){
            return to_route('admin.employee_education',$request->user_id)->with('success',$result['message']);
        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }
    public function delete($id){
        $result= $this->employee_education->delete($id);
        return back()->with('success', $result['message']);
    }
    public function status($id){
        $result = $this->employee_education->status($id);
        return back()->with('success', $result['message']);
    }
}
