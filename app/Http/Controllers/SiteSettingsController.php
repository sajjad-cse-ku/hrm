<?php

namespace App\Http\Controllers;

use App\Models\Shift;
use App\Models\SiteSettings;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SiteSettingsController extends Controller
{
    public function siteSettings(){
        $shifts = Shift::select('id','name')->where('status',1)->get();
        $result = SiteSettings::first();
        return Inertia::render('Module/SiteSettings/Index',[
            'result'=>$result,
            'shifts'=>$shifts,
        ]);
    }
//    public function siteSettingsUpdate(Request $request) {
//        $assignShiftIDs = [];
////        dd($request->all());
//        foreach ($request['data']['selectedAssignedShift'] as $assignShift) {
//            $assignShiftIDs[] = $assignShift['value'];
//        }
////        dd($assignShiftIDs);
//        $siteSettings = SiteSettings::first();
//
////        dd($siteSettings,$request->all());
//
//        if ($siteSettings) {
//            $siteSettings->update([
//                'sick' => (int) floor(365/$request['data']['sick']),
//                'casual' => (int) floor(365/$request['data']['casual']),
//                'extra_time' => $request['data']['extra_time'],
//                'ip' => $request['data']['ip'],
//                'port' => $request['data']['port'],
//                'protocol' => $request['data']['protocol'],
//                'general_shift' => $request['data']['general_shift'],
//                'night_shift' => $assignShiftIDs,
//                'start_day_first_time'=>$request['data']['start_day_first_time'],
//                'start_day_second_time'=>$request['data']['start_day_second_time'],
//                'end_day_first_time'=>$request['data']['end_day_first_time'],
//                'end_day_second_time'=>$request['data']['end_day_second_time'],
//            ]);
//
//            return back()->with('success', 'Site settings updated successfully');
//        } else {
//            return back()->with('error', 'Data Does not Insert');
//        }
//    }


    public function siteSettingsUpdate(Request $request) {
        if (isset($request['selectedAssignedShift'])) {
            if (is_array($request['selectedAssignedShift'])) {
                $selectedAssignedShiftArray = $request['selectedAssignedShift'];
            } else {
                $selectedAssignedShiftArray = json_decode($request['selectedAssignedShift'], true);
                if (!is_array($selectedAssignedShiftArray)) {
                    return back()->with('error', 'Invalid JSON format for selectedAssignedShift');
                }
            }

            // Process the array as needed
            $assignShiftIDs = [];
            foreach ($selectedAssignedShiftArray as $assignShift) {
                if (is_array($assignShift)) {
                    $assignShiftIDs[] = $assignShift['value'];
                } else {
                    $assignShiftIDs[] = $assignShift;
                }
            }

            $siteSettings = SiteSettings::first();

            if ($siteSettings) {
                $siteSettings->update([
                    'sick' => (int) floor(365/$request['sick']),
                    'casual' => (int) floor(365/$request['casual']),
                    'extra_time' => $request['extra_time'],
                    'ip' => $request['ip'],
                    'port' => $request['port'],
                    'protocol' => $request['protocol'],
                    'general_shift' => $request['general_shift'],
                    'night_shift' => $assignShiftIDs,
                    'start_day_first_time' => $request['start_day_first_time'],
                    'start_day_second_time' => $request['start_day_second_time'],
                    'end_day_first_time' => $request['end_day_first_time'],
                    'end_day_second_time' => $request['end_day_second_time'],
                ]);

                return back()->with('success', 'Site settings updated successfully');
            } else {
                return back()->with('error', 'Data Does not Insert');
            }
        } else {
            return back()->with('error', 'Invalid or missing data for selectedAssignedShift');
        }
    }
}
