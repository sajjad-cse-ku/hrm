<?php

namespace App\Http\Controllers;

use App\Models\BreakTime;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BreakTimeController extends Controller
{
    public function getBreakingTime($id){

        $data = User::with(['breaktime' => function ($query) use ($id) {
            $query->where('user_id', $id)->where('start_date', now()->format('Y-m-d'));
        }])->first();
//        $data = BreakTime::where('user_id', $id)->where('start_date', now()->format('Y-m-d'))->latest()->get();
        return response()->json($data);
    }
}
