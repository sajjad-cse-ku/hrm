<?php

namespace App\Http\Controllers;

use App\Models\AssetType;
use App\Models\Company;
use App\Models\User;
use App\Repositories\AssetRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AssetController extends Controller
{
    protected $asset;
    public function __construct(AssetRepository $asset)
    {
        $this->asset = $asset;
    }

    public function index(){
        $result = $this->asset->getAll();
        return Inertia::render('Module/Asset/Index',['result' => $result]);
    }

    public function create(){
        $asset_type = AssetType::get();
        $users = User::select('id','first_name','last_name')->where('status',1)->get();
        return Inertia::render('Module/Asset/Add',[
            'asset_type'=> $asset_type,
            'users'=> $users,
        ]);
    }

    public function store(Request $request){
        $request->validate([
            'product_name' => 'required',
            'asset_type_id' => 'required',
            'model' => 'required',
            'office_tag_number' => 'required',
            'purchase_by' => 'required',
        ]);

        $result = $this->asset->store($request);
        if($result['status']== true){
            return to_route('admin.asset')->with('success', $result['message']);
        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }

    public function edit($id){
        $result = $this->asset->edit($id);
        $users = User::select('id','first_name','last_name')->where('status',1)->get();
        $company = Company::select('id','name')->get();
        $assetType = AssetType::select('id','name')->get();
        return Inertia::render('Module/Asset/Edit',[
            'result'=>$result,
            'users'=>$users,
            'companies'=>$company,
            'asset_type'=>$assetType,
        ]);
    }

    public function update(Request $request){
        $result=$this->asset->update($request);
        if($result['status']== true){
            return to_route('admin.asset')->with('success', $result['message']);
        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }

    public function delete($id){
        $result= $this->asset->delete($id);
        if($result['status']== true){
            return back()->with('success', $result['message']);
        }else{
            return back()->with('error', 'You Can`t Delete This Item.');
        }

    }

    public function status($id){
        $result = $this->asset->status($id);
        return back()->with('success', $result['message']);
    }
}
