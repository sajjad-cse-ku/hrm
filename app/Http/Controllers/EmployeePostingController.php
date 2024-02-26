<?php

namespace App\Http\Controllers;

use App\Http\Requests\EmployeePostingRequest;
use App\Models\Department;
use App\Models\Section;
use App\Models\User;
use App\Repositories\EmployPostingRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeePostingController extends Controller
{
    protected $employee_posting;
    public function __construct(EmployPostingRepository $employee_posting)
    {
        $this->employee_posting = $employee_posting;
    }


    public function index($id){
        $user = User::with('professionaldata','personaldata','professionaldata.department','professionaldata.designation')
            ->where('id',$id)
            ->first();
        $result = $this->employee_posting->getAll($id);
        return Inertia::render('Module/EmployeePosting/Index',['result' => $result , 'user' => $user]);
    }
    public function create($id){
        $companyId = \App\Models\User::where('id', auth()->user()->id)->value('company_id');
        $departments = Department::where('company_id', $companyId)->get();
        $sections = Section::where('company_id', $companyId)->get();
        $users = User::all();
        return Inertia::render('Module/EmployeePosting/Add',['user_id'=>$id, 'departments'=>$departments, 'sections' => $sections, 'users' => $users]);
    }
    public function store(EmployeePostingRequest $request){
        $result = $this->employee_posting->store($request);
        if($result['status']== true){
            return to_route('admin.employee_posting',$request->user_id)->with('success',$result['message']);
        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }
    public function edit($id){
        $result = $this->employee_posting->edit($id);
        $companyId = \App\Models\User::where('id', auth()->user()->id)->value('company_id');
        $departments = Department::where('company_id', $companyId)->get();
        $sections = Section::where('company_id', $companyId)->get();
        $users = User::all();
        return Inertia::render('Module/EmployeePosting/Edit',['result'=>$result,'departments'=>$departments, 'sections' => $sections, 'users' => $users]);
    }
    public function update(Request $request){
        $result=$this->employee_posting->update($request);
        if($result['status']== true){
            return to_route('admin.employee_posting',$request->user_id)->with('success',$result['message']);
        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }
    public function delete($id){
        $result= $this->employee_posting->delete($id);
        return back()->with('success', $result['message']);
    }
    public function status($id){
        $result = $this->employee_posting->status($id);
        return back()->with('success', $result['message']);
    }
}
