<?php

namespace App\Http\Controllers;

use App\Http\Requests\SalarySetupRequest;
use App\Models\Bank;
use App\Models\Company;
use App\Models\Department;
use App\Models\Designation;
use App\Models\EmployeeProfessional;
use App\Models\SalarySetup;
use App\Models\User;
use App\Repositories\SalarySetupRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SalarySetupController extends Controller
{
    protected $salary_setup;

    public function __construct(SalarySetupRepository $salary_setup)
    {
        $this->salary_setup = $salary_setup;
    }

    public function index(){
        $result = $this->salary_setup->getAll();
        return Inertia::render('Module/SalarySetup/Index',['result' => $result]);
    }

    public function create($id){
        $hasId = SalarySetup::where('user_id', $id)->latest('created_at')->first();
        if (isset($hasId))
        {
            $id = $hasId->id;
            $result = $this->salary_setup->edit($id);
            // $users = User::select('id','first_name','last_name')->where('status',1)->get();
            $company = Company::select('id','name')->get();
            $EmpProf = EmployeeProfessional::where('user_id',$result->user_id)->first();
            $bankDetails = Bank::where('id',$EmpProf->bank_id)->first();
            return Inertia::render('Module/SalarySetup/Edit',[
                'result'=>$result,
                // 'users'=>$users,
                'companies'=>$company,
                'bank'=>$bankDetails,
            ]);
        }else{
            $userInfo = User::with('professionaldata')->find($id);
            $department = Department::find($userInfo->professionaldata->department_id);
            $designation = Designation::find($userInfo->professionaldata->designation_id);;

            $companyId = $userInfo->company_id;
            $companyDetails = Company::find($companyId);

            $EmpProf = EmployeeProfessional::where('user_id',$id)->first();

            $bankDetails = Bank::where('id',$EmpProf->bank_id)->first();
            return Inertia::render('Module/SalarySetup/Add',[
                'user'=>$userInfo,
                'department'=>$department,
                'designation'=>$designation,
                'company'=>$companyDetails,
                'bank'=>$bankDetails,
                'empProf'=>$EmpProf,
            ]);
        }

    }

    public function store(Request $request){
//        dd($request->all());
        $result = $this->salary_setup->store($request);
        if($result['status']== true){
            return back()->with('success', $result['message']);
        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }

//    public function edit($id){
//        $result = $this->salary_setup->edit($id);
//        $users = User::select('id','first_name','last_name')->where('status',1)->get();
//        $company = Company::select('id','name')->get();
//        $EmpProf = EmployeeProfessional::where('user_id',$result->user_id)->first();
//        $bankDetails = Bank::where('id',$EmpProf->bank_id)->first();
//        return Inertia::render('Module/SalarySetup/Edit',[
//            'result'=>$result,
//            'users'=>$users,
//            'companies'=>$company,
//            'bank'=>$bankDetails,
//        ]);
//    }

    public function update(Request $request){
//        dd($request->all());
        $result=$this->salary_setup->update($request);
        if($result['status']== true){
            return back()->with('success', $result['message']);
        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }

    public function delete($id){
        $result= $this->salary_setup->delete($id);
        return back()->with('success', $result['message']);
    }

    public function status($id){
        $result = $this->salary_setup->status($id);
        return back()->with('success', $result['message']);
    }

    public function salarySetupDeptOrAll(){
        $departments = Department::where('status',1)->select('name','id')->get();
        return Inertia::render('Module/SalarySetup/SalarySetupAllOrDept',[
            'departments'=>$departments
        ]);
    }

    public function getSalariedEmployee($dept_id){
        // Check if $dept_id is "all" or a specific department ID
        if ($dept_id == "all") {
            $result = User::with('personaldata','professionaldata','professionaldata.designation','professionaldata.department','professionaldata.working', 'salary')
                ->where('is_show', 1)
                ->where('status', 1)
                ->orderBy('first_name','ASC')
                ->get();
        } else {
            $result = User::with('personaldata','professionaldata','professionaldata.designation','professionaldata.department','professionaldata.working', 'salary')
                ->where('is_show', 1)
                ->where('status', 1)
                ->whereHas('professionaldata.department', function ($subquery) use ($dept_id) {
                    $subquery->where('id', $dept_id);
                })
                ->orderBy('first_name', 'ASC')
                ->get();
        }
        return response()->json($result);
    }

}
