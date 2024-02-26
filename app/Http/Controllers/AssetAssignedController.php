<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use App\Models\AssetType;
use App\Models\Company;
use App\Models\User;
use App\Repositories\AssetAssignedRepository;
use App\Repositories\AssetRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AssetAssignedController extends Controller
{
    protected $asset_assigned;
    public function __construct(AssetAssignedRepository $asset_assigned)
    {
        $this->asset_assigned = $asset_assigned;
    }

    public function index(){
        $result = $this->asset_assigned->getAll();
//        dd($result);
        return Inertia::render('Module/AssetAssigned/Index',['result' => $result]);
    }

    public function create(){
        $asset_type = AssetType::get();
        $asset = Asset::get();
        $users = User::select('id','first_name','last_name')->where('status',1)->get();
        return Inertia::render('Module/AssetAssigned/Add',[
            'asset_type'=> $asset_type,
            'asset'=> $asset,
            'users'=> $users,
        ]);
    }

    public function store(Request $request){
        $request->validate([
            'employee_id' => 'required',
            'asset_id' => 'required',
            'assigned_by' => 'required',
            'assigned_date' => 'required',
            'location' => 'required',
            'description' => 'required',
        ]);

        $result = $this->asset_assigned->store($request);
        if($result['status']== true){
            return to_route('admin.asset.assigned')->with('success', $result['message']);
        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }

    public function edit($id){
        $result = $this->asset_assigned->edit($id);
        $users = User::select('id','first_name','last_name')->where('status',1)->get();
        $company = Company::select('id','name')->get();
        $assetType = AssetType::select('id','name')->get();
        $asset = Asset::select('id','product_name')->get();
        return Inertia::render('Module/AssetAssigned/Edit',[
            'result'=>$result,
            'users'=>$users,
            'companies'=>$company,
            'asset_type'=>$assetType,
            'asset'=>$asset,
        ]);
    }

    public function update(Request $request){
        $result=$this->asset_assigned->update($request);
        if($result['status']== true){
            return to_route('admin.asset.assigned')->with('success', $result['message']);
        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }

    public function delete($id){
        $result= $this->asset_assigned->delete($id);
        return back()->with('success', $result['message']);
    }

    public function status($id){
        $result = $this->asset_assigned->status($id);
        return back()->with('success', $result['message']);
    }
}
