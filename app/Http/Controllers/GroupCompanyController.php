<?php

namespace App\Http\Controllers;

use App\Http\Requests\GroupCompanyRequest;
use App\Repositories\GroupCompanyRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;


class GroupCompanyController extends Controller
{

    protected $groupCompanyRepository;

    public function __construct(GroupCompanyRepository $groupCompanyRepository)
    {
        $this->groupCompanyRepository = $groupCompanyRepository;
    }


    public function index(){
        $result = $this->groupCompanyRepository->getAll();
        return Inertia::render('Module/GroupCompany/Index',[
            'permissions' => checkPermissions(), 
            'result' => $result
        ]);
    }
    public function create(){
        return Inertia::render('Module/GroupCompany/Add');
    }
    public function store(GroupCompanyRequest $request){
        $result = $this->groupCompanyRepository->store($request);
        if($result['status']== true){
//            return to_route('admin.group.company')->with('success', $result['message']);
            // return back()->with('success', $result['message']); 
            return to_route('admin.group.company')->with('success', $result['message']);
        }else{
//            return to_route('admin.group.company')->with('error', 'Data Does not Insert');
             return back()->with('error', 'Data Does not Insert');
        }
    }
    public function edit($id){
        $result = $this->groupCompanyRepository->edit($id);
        return Inertia::render('Module/GroupCompany/Edit',['result' => $result]);
    }
    public function update(Request $request){
        $result=$this->groupCompanyRepository->update($request);
        if($result['status']== true){
//            return to_route('admin.group.company')->with('success', $result['message']);
            // return back()->with('success', $result['message']);
            return to_route('admin.group.company')->with('success', $result['message']);
        }else{
//            return to_route('admin.group.company')->with('error', 'Data Does not Insert');
             return back()->with('error', 'Data Does not Insert');
        }
    }
    public function delete($id){
        $result= $this->groupCompanyRepository->delete($id);
        return back()->with('success', $result['message']);

    }
    public function status($id){
        $result = $this->groupCompanyRepository->status($id);
        return back()->with('success', $result['message']);
    }
}