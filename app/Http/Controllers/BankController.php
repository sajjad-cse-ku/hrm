<?php

namespace App\Http\Controllers;

use App\Http\Requests\BankRequest;
use App\Repositories\BankRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BankController extends Controller
{
    protected $bank;
    public function __construct(BankRepository $bank)
    {
        $this->bank = $bank;
    }


    public function index(){
        $result = $this->bank->getAll();
        return Inertia::render('Module/Bank/Index',[
            'result'=>$result
            ]);
    }





    public function create(){
        return Inertia::render('Module/Bank/Add');
    }
    public function store(BankRequest $request){
        $result = $this->bank->store($request);
        if($result['status']== true){
            // return back()->with('success', $result['message']);
            return to_route('admin.bank')->with('success', $result['message']);
        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }
    public function edit($id){
        $result = $this->bank->edit($id);
        return Inertia::render('Module/Bank/Edit',['result'=>$result]);
    }
    public function update(Request $request){
        $result=$this->bank->update($request);
        if($result['status']== true){
            // return back()->with('success', $result['message']);
            return to_route('admin.bank')->with('success', $result['message']);
        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }
    public function delete($id){
        dd($id);
        $result= $this->bank->delete($id);
        return back()->with('success', $result['message']);
    }
    public function status($id){
        $result = $this->bank->status($id);
        return back()->with('success', $result['message']);
    }
}
