<?php

namespace App\Http\Controllers;

use App\Http\Requests\EmployeePromotionRequest;
use App\Models\Company;
use App\Models\Designation;
use App\Models\EmployeeProfessional;
use App\Models\User;
use App\Repositories\EmployeePromotionRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use function Symfony\Component\Mime\Header\all;

class EmployeePromotionController extends Controller
{
    protected $employee_promotion;

    public function __construct(EmployeePromotionRepository $employee_promotion)
    {
        $this->employee_promotion = $employee_promotion;
    }

    public function index($id) {
        $user = User::with('professionaldata','personaldata','professionaldata.department','professionaldata.designation')
            ->where('id',$id)
            ->first();
        $results = $this->employee_promotion->getAll($id);

        return Inertia::render('Module/EmployeePromotion/Index', [
            'results' => $results,
            'user' => $user,
        ]);
    }
    public function create($id)
    {
        $user = User::find($id);
        $companyID = $user->value('company_id');
        $designation = Designation::where('company_id', $companyID)->get();
        $users = User::select('id', 'username')->get();

        return Inertia::render('Module/EmployeePromotion/Add', [
            'company' => $companyID,
            'designations' => $designation,
            'users' => $users,
            'user_id'=>$id,
        ]);
    }

    public function store(EmployeePromotionRequest $request){
        $result = $this->employee_promotion->store($request);
        if ($result['status'] == true){
            return to_route('admin.emp_promotion',$request->user_id)->with('success',$result['message']);
        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }

    public function edit($id)
    {
        $result = $this->employee_promotion->edit($id);
        $user = User::find($result->user_id);
        $companyId = $user->value('company_id');


        $designations = Designation::where('company_id', $companyId)->get();

        return Inertia::render('Module/EmployeePromotion/Edit', [
            'result' => $result,
            'designations' => $designations,
        ]);
    }

    public function update(Request $request){
//        dd($request->all());
        $result = $this->employee_promotion->update($request);
//        dd($result);
        if ($result['status'] == true){
            return to_route('admin.emp_promotion',$request->user_id)->with('success',$result['message']);
        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }

    public function delete($id){
        $result= $this->employee_promotion->delete($id);
        return back()->with('success', $result['message']);
    }

    public function status($id){
        $result = $this->employee_promotion->status($id);
        return back()->with('success',$result['message']);
    }
}
