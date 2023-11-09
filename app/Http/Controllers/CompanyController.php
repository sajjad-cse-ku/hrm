<?php

namespace App\Http\Controllers;

use App\Http\Requests\CompanyRequest;
use App\Models\GroupCompany;
use App\Repositories\CompanyRepository;
use Inertia\Inertia;
use Illuminate\Http\Request;

class CompanyController extends Controller
{

    protected $company;

    public function __construct(CompanyRepository $company)
    {
        $this->company = $company;
    }


    public function index(){
        $result = $this->company->getAll();
        return Inertia::render('Module/Company/Index',[
            'permissions' => checkPermissions(), 
            'result' => $result
        ]);
    }
    public function create(){
        $group_company_list = GroupCompany::select('id','name')->get();
        return Inertia::render('Module/Company/Add',['group_company_list'=>$group_company_list]);
    }
    public function store(CompanyRequest $request){
        $result = $this->company->store($request);
        if($result['status']== true){
//            return to_route('admin.company')->with('success', $result['message']);
            // return back()->with('success', $result['message']);
            // return redirect()->intended('/admin/companies');
            return to_route('admin.company')->with('success', $result['message']);
        }else{
//            return to_route('admin.company')->with('error', 'Data Does not Insert');
             return back()->with('error', 'Data Does not Insert');
        }
    }
    public function edit($id){
        $group_company_list = GroupCompany::select('id','name')->get();
        $result = $this->company->edit($id);
        return Inertia::render('Module/Company/Edit',['result' => $result,'group_company_list'=>$group_company_list]);
    }
    public function update(Request $request){
        $result=$this->company->update($request);
        if($result['status']== true){
           return to_route('admin.company')->with('success', $result['message']);
            // return back()->with('success', $result['message']);
        }else{
//            return to_route('admin.company')->with('error', 'Data Does not Insert');
             return back()->with('error', 'Data Does not Insert');
        }
    }
    public function delete($id){
        $result= $this->company->delete($id);
        return back()->with('success', $result['message']);
    }
    public function status($id){
        $result = $this->company->status($id);
        return back()->with('success', $result['message']);
    }
}