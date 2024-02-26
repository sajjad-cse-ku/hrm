<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Yajra\DataTables\DataTables;

class TestController extends Controller
{
    public function testTable(){
//        $users = User::paginate(10);
        return Inertia::render('Module/Test/PaginateTable');
    }

    public function testTableData(Request $request)
    {
        $query = User::query();



        $page = request()->input('page');
        if(request()->input('search')) {
            $page = 1;
            $query->where('username', 'like', '%' . request()->input('search') . '%');
        }
        $perPage = $request->input('per_page', 10); // Default to 10 if 'per_page' is not provided
        return $query->paginate($perPage,['username','email'],'User Lists',$page);

    }

    public function demoTable(){
        $users = User::paginate(10);
        return Inertia::render('Module/Test/Demo',[
            'users'=>$users
        ]);
    }

}
