<?php

namespace App\Http\Controllers;

use App\Http\Requests\NoticeRequest;
use App\Models\Company;
use App\Models\Notice;
use App\Repositories\NoticeRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NoticeController extends Controller
{
    protected $notice;

    public function __construct(NoticeRepository $notice)
    {
        $this->notice = $notice;
    }

    public function index(){
        $result = $this->notice->getAll();
        return Inertia::render('Module/Notice/Index',['result' => $result]);
    }
    public function create(){
        return Inertia::render('Module/Notice/Add');
    }
    public function store(NoticeRequest $request){
        $result = $this->notice->store($request);
        if($result['status']== true){
            // return back()->with('success', $result['message']);
            return to_route('admin.notice')->with('success', $result['message']);
        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }
    public function edit($id){
        $result = $this->notice->edit($id);
        return Inertia::render('Module/Notice/Edit',['result'=>$result]);
    }
    public function update(Request $request){
        $result=$this->notice->update($request);
        if($result['status']== true){
            // return back()->with('success', $result['message']);
            return to_route('admin.notice')->with('success', $result['message']);
        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }
    public function delete($id){
        $result= $this->notice->delete($id);
        return back()->with('success', $result['message']);
    }
    public function status($id){
        $result = $this->notice->status($id);
        return back()->with('success', $result['message']);
    }

    public function view($id){
        $notice = Notice::where('id', $id)->first();
        return Inertia::render('Module/Notice/View',['notice'=>$notice]);
    }
}
