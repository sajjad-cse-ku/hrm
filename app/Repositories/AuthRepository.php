<?php
namespace App\Repositories;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;

class AuthRepository {
    protected $model;

    public function __construct(User $model)
    {
        $this->model=$model;
    }
    public function login($request){
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){
            Session::put('adminLogin', 'user_log_in');
            $user = Auth::user();
            $response['message']="Logging Successfully";
            $response['status']=true;
            $response['user']=$user;
            DB::commit();
            return $response;
        }else{
            $response['status']=false;
            $response['message']="Wrong username or password";
            return $response;
        }
    }
}