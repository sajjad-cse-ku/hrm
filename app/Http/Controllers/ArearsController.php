<?php

namespace App\Http\Controllers;

use App\Http\Requests\ArearsRequest;
use App\Models\User;
use App\Repositories\ArearsRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArearsController extends Controller
{
    protected $arears;
    public function __construct(ArearsRepository $arears)
    {
        $this->arears = $arears;
    }

    public function index(){
        $result = $this->arears->getAll();
        return Inertia::render('Module/Arears/Index',['result' => $result]);
    }
    public function create(){
        $users =User::with('professionaldata.designation','professionaldata.department')->orderBy('first_name','asc')->get();
        return Inertia::render('Module/Arears/Add',[
            'users' => $users
        ]);
    }
    public function store(ArearsRequest $request){
        $result = $this->arears->store($request);
        if($result['status']== true){
            return to_route('admin.arears')->with('success', $result['message']);
        }elseif($result['status']== 'same'){
            return back()->with('error', $result['message']);
        }
        else{
            return back()->with('error', 'Data Does not Insert');
        }
    }
    public function edit($id){
        $result = $this->arears->edit($id);
        $users =User::with('professionaldata.designation','professionaldata.department')->orderBy('first_name','asc')->get();
        return Inertia::render('Module/Arears/Edit',[
            'users'=>$users,
            'result'=>$result,
        ]);
    }
    public function update(Request $request){

        $result=$this->arears->update($request);
        if($result['status']== true){
            return to_route('admin.arears')->with('success', $result['message']);
        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }
    public function delete($id){
        $result= $this->arears->delete($id);
        return back()->with('success', $result['message']);
    }
    public function status($id){
        $result = $this->arears->status($id);
        return back()->with('success', $result['message']);
    }
}
