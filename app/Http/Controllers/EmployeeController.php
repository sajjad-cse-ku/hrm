<?php

namespace App\Http\Controllers;

use App\Http\Requests\EmployeeRequest;
use App\Models\Bangladesh;
use App\Models\Bank;
use App\Models\Company;
use App\Models\Department;
use App\Models\Designation;
use App\Models\Religions;
use App\Models\Section;
use App\Models\Title;
use App\Models\User;
use App\Models\WorkingStatus;
use App\Repositories\EmployeeRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    protected $employee;

    public function __construct(EmployeeRepository $employee)
    {
        $this->employee = $employee;
    }

    public function index(){
        $result = $this->employee->getAll();
        return Inertia::render('Module/Employee/Index',['result' => $result]);
    }
    public function create(){
        $companies = Company::select('id','name')->get();
        $users = User::select('id','first_name')->get();
        $titles = Title::select('id','name')->get();
        $religions = Religions::select('id','name')->get();
        $bangladesh = Bangladesh::select('district')->groupBy('district')->get();

        $department = Department::select('id','name')->get();
        $section = Section::select('id','name')->get();
        $designation = Designation::select('id','name')->get();
        $working_status = WorkingStatus::select('id','name')->get();
        $banks = Bank::select('id','name')->get();
        return Inertia::render('Module/Employee/Add',[
            'companies'=>$companies,'users'=>$users,'titles'=>$titles,
            'religions'=>$religions,'bangladesh'=>$bangladesh,'department'=>$department,
            'section'=>$section,'designation'=>$designation,'working_status'=>$working_status,
            'banks'=>$banks,
        ]);
    }
    public function store(Request $request){
        $result = $this->employee->store($request);
        if($result['status']== true){
            // return back()->with('success', $result['message']);
            return to_route('admin.employee')->with('success', $result['message']);

        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }
    public function edit($id){
        $result = $this->employee->edit($id);
        $companies = Company::select('id','name')->get();
        $users = User::select('id','first_name')->get();
        $titles = Title::select('id','name')->get();
        $religions = Religions::select('id','name')->get();
        $bangladesh = Bangladesh::select('district')->groupBy('district')->get();

        $department = Department::select('id','name')->get();
        $section = Section::select('id','name')->get();
        $designation = Designation::select('id','name')->get();
        $working_status = WorkingStatus::select('id','name')->get();
        $banks = Bank::select('id','name')->get();
        return Inertia::render('Module/Employee/Edit',['result'=>$result,
            'companies'=>$companies,'users'=>$users,'titles'=>$titles,
            'religions'=>$religions,'bangladesh'=>$bangladesh,'department'=>$department,
            'section'=>$section,'designation'=>$designation,'working_status'=>$working_status,
            'banks'=>$banks,
        ]);
    }
    public function update(Request $request){
        $result=$this->employee->update($request);
        if($result['status'] == true){
            // return back()->with('success', $result['message']);
            return to_route('admin.employee')->with('success', $result['message']);
        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }
    public function delete($id){
        $result= $this->employee->delete($id);
        if($result['status'] == true){
            return back()->with('success', $result['message']);
        }else{
            return back()->with('success', 'This User Can not be deleted');
        }

    }
    public function status($id){
        $result = $this->employee->status($id);
        return back()->with('success', $result['message']);
    }
}
