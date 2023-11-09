<?php

namespace App\Http\Controllers;

use App\Http\Requests\BankRequest;
use App\Http\Requests\TitleRequest;
use App\Repositories\TitleRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TitleController extends Controller
{
    protected $title;
    public function __construct(TitleRepository $religions)
    {
        $this->title = $religions;
    }


    public function index(){
        $result = $this->title->getAll();
        return Inertia::render('Module/Title/Index',['result' => $result]);
    }
    public function create(){
        return Inertia::render('Module/Title/Add');
    }
    public function store(TitleRequest $request){
        $result = $this->title->store($request);
        if($result['status']== true){
            // return back()->with('success', $result['message']);
            return to_route('admin.title')->with('success', $result['message']);
        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }
    public function edit($id){
        $result = $this->title->edit($id);
        return Inertia::render('Module/Title/Edit',['result'=>$result]);
    }
    public function update(Request $request){
        $result=$this->title->update($request);
        if($result['status']== true){
            // return back()->with('success', $result['message']);
            return to_route('admin.title')->with('success', $result['message']);
        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }
    public function delete($id){
        $result= $this->title->delete($id);
        return back()->with('success', $result['message']);
    }
    public function status($id){
        $result = $this->title->status($id);
        return back()->with('success', $result['message']);
    }
}
