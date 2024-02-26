<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\User;
use App\Repositories\AssetTypeRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AssetTypeController extends Controller
{
    protected $asset_type;
    public function __construct(AssetTypeRepository $asset_type)
    {
        $this->asset_type = $asset_type;
    }

    public function index(){
        $result = $this->asset_type->getAll();
        return Inertia::render('Module/AssetType/Index',['result' => $result]);
    }

    public function create(){
        $companies = Company::get();
        return Inertia::render('Module/AssetType/Add',[
            'companies'=>$companies,
        ]);
    }

    public function store(Request $request){
        $request->validate([
            'name' => 'required',
            'asset_type' => 'required',
        ]);

        $result = $this->asset_type->store($request);
        if($result['status']== true){
            return to_route('admin.asset.type')->with('success', $result['message']);
        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }

    public function edit($id){
        $result = $this->asset_type->edit($id);
        $users = User::select('id','first_name','last_name')->where('status',1)->get();
        $company = Company::select('id','name')->get();
        return Inertia::render('Module/AssetType/Edit',[
            'result'=>$result,
            'users'=>$users,
            'companies'=>$company,
        ]);
    }

    public function update(Request $request){
        $result=$this->asset_type->update($request);
        if($result['status']== true){
            return to_route('admin.asset')->with('success', $result['message']);
        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }

    public function delete($id){
        $result= $this->asset_type->delete($id);
        return back()->with('success', $result['message']);
    }

    public function status($id){
        $result = $this->asset_type->status($id);
        return back()->with('success', $result['message']);
    }
}
