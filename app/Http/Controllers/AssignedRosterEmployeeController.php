<?php

namespace App\Http\Controllers;

use App\Models\RosterAssign;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AssignedRosterEmployeeController extends Controller
{
    public function create($user_id)
    {
        $days_name = RosterAssign::where('user_id', $user_id)->pluck('name');
        $days_name_array = $days_name->toArray();

        if($days_name_array){
            return Inertia::render('Module/Employee/AssignRoster', [
                'user_id' => $user_id,
                'days_name_array'=>$days_name_array,
            ]);
        }else{
            return Inertia::render('Module/Employee/AssignRoster', [
                'user_id' => $user_id,
            ]);
        }

    }
    public function store($user_id , Request $request)
    {
        $users = RosterAssign::where('user_id', $user_id)->get();
        if ($users->count() > 0) {
            RosterAssign::where('user_id', $user_id)->delete();
        }
        foreach ($request->days as $userData) {
            RosterAssign::create([
                'user_id' => $user_id,
                'name' => $userData
            ]);
        }

        return to_route('admin.employee')->with('success','Roster Assign Successfully Added');
    }
}
