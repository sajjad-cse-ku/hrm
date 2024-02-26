<?php

namespace App\Http\Controllers;


use App\Models\Department;
use App\Models\DutyLocations;
use App\Models\Roster;
use App\Models\Shift;
use App\Models\User;
use App\Repositories\RosterRepository;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RosterController extends Controller
{
    protected $roster;
    public function __construct(RosterRepository $roster)
    {
        $this->roster = $roster;
    }
    public function index(){

        $currentYear = Carbon::now()->year;
        $currentMonth = Carbon::now()->month;

        $user = User::with(['professionaldata.department:id,roster_month_id,roster_year'])
            ->where('id', Auth::user()->id)
            ->where('status',1)
            ->first();

        $rosterMonthId = $user->professionaldata->department->roster_month_id;
        $rosterYear = $user->professionaldata->department->roster_year;

        if( ($currentYear == $rosterYear ) && ( $currentMonth ==  $rosterMonthId ) ) {

            $startOfMonth = Carbon::createFromFormat('Y-m', $rosterYear . '-' .$rosterMonthId)->startOfMonth();
            $endOfMonth = Carbon::createFromFormat('Y-m', $rosterYear . '-' .$rosterMonthId)->endOfMonth();
            $weeks = [];
            $currentDay = $startOfMonth->copy();

            while ($currentDay <= $endOfMonth) {
                $weekNumber = $currentDay->weekOfMonth;
                $dayOfWeek = $currentDay->format('D');
                if (!isset($weeks[$weekNumber])) {
                    $weeks[$weekNumber] = [];
                }
                $dayNumber = $currentDay->format('d');
                $weeks[$weekNumber][$dayOfWeek] = $dayNumber;
                $currentDay->addDay();
            }

            $idsArray = $this->roster->getAll();

            $authUser = Auth::user();

            $users = User::with('professionaldata.designation')->whereHas('professionaldata', function ($query) use ($authUser) {
                $query->where('department_id', $authUser->professionaldata->department_id);
            })->whereNotIn('id', $idsArray)->get();

            $shifts = Shift::where('status',1)->get();
            $locations = DutyLocations::all();

            return Inertia::render('Module/Roster/Index',[
                'permissions' => checkPermissions(),
                'weeks'=>$weeks,
                'users'=>$users,
                'shifts'=>$shifts,
                'locations'=>$locations,
                'roster_status' => true
            ]);

        }
        else {
            return Inertia::render('Module/Roster/Index',[
                'roster_status' => false,
                'permissions' => checkPermissions(),
                'weeks'=> [],
                'users'=>[],
                'shifts'=>[],
                'locations'=>[]
            ]);
        }

    }

    public function update(Request $request){

        $currentYear = Carbon::now()->year;
        $currentMonth = Carbon::now()->month;

        $user = User::with(['professionaldata.department:id,name,roster_month_id,roster_year'])
            ->where('id', Auth::user()->id)
            ->first();
        $rosterMonthId = $user->professionaldata->department->roster_month_id;
        $rosterYear = $user->professionaldata->department->roster_year;

        if( ($currentYear == $rosterYear ) && ( $currentMonth ==  $rosterMonthId ) ) {
            $startOfMonth = Carbon::createFromFormat('Y-m', $rosterYear . '-' .$rosterMonthId)->startOfMonth();
            $endOfMonth = Carbon::createFromFormat('Y-m', $rosterYear . '-' .$rosterMonthId)->endOfMonth();
            $weeks = [];
            $currentDay = $startOfMonth->copy();

            while ($currentDay <= $endOfMonth) {
                $weekNumber = $currentDay->weekOfMonth;
                $dayOfWeek = $currentDay->format('D');

                if (!isset($weeks[$weekNumber])) {
                    $weeks[$weekNumber] = [];
                }

                $dayNumber = $currentDay->format('d');
                $weeks[$weekNumber][$dayOfWeek] = $dayNumber;

                $currentDay->addDay();
            }
            $rosters = Roster::with('user','loc_1','loc_2','loc_3','loc_4','loc_5')
                ->where('r_year', $currentYear)
                ->where('month_id', $currentMonth)
                ->where('status',0)
                ->get();

            $shifts = Shift::where('status',1)->get();
            $locations = DutyLocations::all();
            return Inertia::render('Module/Roster/Update',['weeks'=>$weeks,'rosters'=>$rosters,'shifts'=>$shifts,'locations'=>$locations,'roster_status' => true]);
        }
        else {
            return Inertia::render('Module/Roster/Update',
                [
                    'weeks'=>[],
                    'rosters'=>[],
                    'shifts'=>[],
                    'locations'=>[],
                    'roster_status' => false,
                ]);
        }
    }
    public function allRoster(Request $request){
        $data = $request->all();
        $user = User::with(['professionaldata.department:id,roster_month_id,roster_year'])
            ->where('id', Auth::user()->id)
            ->first();
        $rosterMonthId = $user->professionaldata->department->roster_month_id;
        $rosterYear = $user->professionaldata->department->roster_year;
        $companyId = \App\Models\User::where('id', auth()->user()->id)->value('company_id');

        foreach ($data as $item) {
            $user_id = $item["user_id"];
            $r_year = $rosterYear;
            $month_id = $rosterMonthId;

            $rosterDataTransformed = [];
            foreach ($item["roster"] as $key => $value) {
                $dayNumber = substr($key, -2);
                $databaseColumnName = "day_" . $dayNumber;
                $rosterDataTransformed[$databaseColumnName] = $value;
            }

            $locationDataTransformed = [];
            foreach ($item["location"] as $key => $value) {
                $lastInteger = (int) preg_replace('/\D/', '', $key);
                $databaseColumnName = "loc_" . str_pad($lastInteger, 2, '0', STR_PAD_LEFT);
                $locationDataTransformed[$databaseColumnName] = $value;
            }


            Roster::updateOrCreate(
                ['user_id' => $user_id, 'r_year' => $r_year, 'month_id' => $month_id],
                array_merge($rosterDataTransformed, $locationDataTransformed, ['company_id' => $companyId, 'created_by' => auth()->user()->id])
            );
        }
        return back()->with('success', "Roster Inserted Successfully");

    }
    public function singleRoster(Request $request){
        $data = $request->all();
        $user = User::with(['professionaldata.department:id,roster_month_id,roster_year'])
            ->where('id', Auth::user()->id)
            ->first();
        $rosterMonthId = $user->professionaldata->department->roster_month_id;
        $rosterYear = $user->professionaldata->department->roster_year;


        $user_id = $data["user_id"];
        $r_year = $rosterYear;
        $month_id = $rosterMonthId;

        $companyId = \App\Models\User::where('id', auth()->user()->id)->value('company_id');

        $rosterDataTransformed = [];
        foreach ($data["roster"] as $day => $dayData) {
            foreach ($dayData as $dayNumber => $value) {
                $formattedDayNumber = str_pad($dayNumber, 2, '0', STR_PAD_LEFT);
                $databaseColumnName = "day_" . $formattedDayNumber;
                $rosterDataTransformed[$databaseColumnName] = $value ?? 2;
            }
        }
        $locationDataTransformed = [];
        foreach ($data["location"] as $key => $value) {
            $lastInteger = (int) preg_replace('/\D/', '', $key); // Extract the last integer
            $databaseColumnName = "loc_" . str_pad($lastInteger, 2, '0', STR_PAD_LEFT);
            $locationDataTransformed[$databaseColumnName] = $value;
        }

        Roster::updateOrCreate(
            ['user_id' => $user_id, 'r_year' => $r_year, 'month_id' => $month_id],
            array_merge($rosterDataTransformed, $locationDataTransformed, ['company_id' => $companyId, 'created_by' => auth()->user()->id])
        );

        return back()->with('success', "Roster Inserted Successfully");

    }

    public function approved(){
        $currentYear = Carbon::now()->year;
        $currentMonth = Carbon::now()->month;


        $user = User::with(['professionaldata.department:id,roster_month_id,roster_year'])
            ->where('id', Auth::user()->id)
            ->first();
        $rosterMonthId = $user->professionaldata->department->roster_month_id;
        $rosterYear = $user->professionaldata->department->roster_year;

        if( ($currentYear == $rosterYear ) && ( $currentMonth ==  $rosterMonthId ) ) {
            $startOfMonth = Carbon::createFromFormat('Y-m', $rosterYear . '-' .$rosterMonthId)->startOfMonth();
            $endOfMonth = Carbon::createFromFormat('Y-m', $rosterYear . '-' .$rosterMonthId)->endOfMonth();
            $weeks = [];
            $currentDay = $startOfMonth->copy();

            while ($currentDay <= $endOfMonth) {
                $weekNumber = $currentDay->weekOfMonth;
                $dayOfWeek = $currentDay->format('D');

                if (!isset($weeks[$weekNumber])) {
                    $weeks[$weekNumber] = [];
                }

                $dayNumber = $currentDay->format('d');
                $weeks[$weekNumber][$dayOfWeek] = $dayNumber;

                $currentDay->addDay();
            }
            $rosters = Roster::with('user','loc_1','loc_2','loc_3','loc_4','loc_5')
                ->where('r_year', $currentYear)
                ->where('month_id', $currentMonth)
                ->where('status',0)
                ->get();

            $shifts = Shift::where('status',1)->get();
            $locations = DutyLocations::get();
            return Inertia::render('Module/Roster/Approved',['weeks'=>$weeks,'rosters'=>$rosters,'shifts'=>$shifts,'locations'=>$locations,'roster_status' => true]);

        }
        else {
            return Inertia::render('Module/Roster/Update',
                [
                    'weeks'=>[],
                    'rosters'=>[],
                    'shifts'=>[],
                    'locations'=>[],
                    'roster_status' => false,
                ]);
        }


    }

    public function approvedById(Request $request){

        $authUser = Auth::user();
        $users = User::whereHas('professionaldata', function ($query) use ($authUser) {
            $query->where('department_id', $authUser->professionaldata->department_id);
        })->count('id');

        if($users == count($request->all())){
            try {
                $user = User::with('professionaldata')->where('id', Auth::user()->id)->first();
                $departmentId = $user->professionaldata->department_id;


                $department = Department::where('id', $departmentId)->first(); // Retrieve the department

                if ($department) {
                    if ($department->roster_month_id === 12) {
                        $department->roster_month_id = 1;
                        $department->roster_year = $department->roster_year + 1;
                    } else {
                        $department->roster_month_id = $department->roster_month_id + 1;
                    }

                    $department->save();
                }
                $userIds = $request->all();
                $currentYear = Carbon::now()->year;
                $currentMonth = Carbon::now()->month;
                if (empty($userIds)) {
                    return back()->with('error', 'No user IDs provided');
                }
                foreach ($userIds as $userId) {
                    // Update the status for this user's rosters
                    Roster::where('user_id', $userId)
                        ->where('r_year', $currentYear)
                        ->where('month_id', $currentMonth)
                        ->update(['status' => 1]);
                }
                return back()->with('success', 'Rosters updated successfully');

            } catch (\Exception $e) {
                return back()->with('error', 'Error updating rosters');
            }
        }else{
            return back()->with('error', 'please insert at least all users off day roster');
        }
    }
}
