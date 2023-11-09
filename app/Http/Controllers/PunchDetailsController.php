<?php

namespace App\Http\Controllers;

use App\Classes\ZKLibrary;
use App\Jobs\GetMachineAllDataQueueJob;
use App\Models\PunchDetails;
use App\Models\User;
use Illuminate\Support\Facades\Auth;


class PunchDetailsController extends Controller
{
    public function getPunchedData(){

        $companyId = User::where('id',Auth::id())->value('company_id');
//        dispatch(new GetMachineAllDataQueueJob($companyId));
        $zk = new ZKLibrary(SiteSettings()->ip, SiteSettings()->port, SiteSettings()->protocol);
//        $zk = new ZKLibrary("103.203.94.204", "4370", "UDP");
        $zk->connect();
        $zk->disableDevice();
        $users = $zk->getUser();
        $attendance = $zk->getAttendance();

        if(isset($attendance)){
            $dataArray = $attendance;
            $groupedData = [];
            foreach ($dataArray as $record) {
                $date = substr($record[3], 0, 10);
                if (!isset($groupedData[$date])) {
                    $groupedData[$date] = [];
                }
                $groupedData[$date][] = [
                    "access_id" => $record[0],
                    "user_id" => $record[1],
                    "status" => $record[2],
                    "time" => $record[3]
                ];
            }

            $dataToInsertOrUpdate = [];

            foreach ($groupedData as $records) {
                foreach ($records as $record) {
                    $dataToInsertOrUpdate[] = [
                        'employee_id' => $record["user_id"],
                        'attendance_datetime' => $record["time"],
                        'company_id' => $companyId,
                        'device_id' => 1,
                        'access_id' => $record["access_id"],
                    ];
                }
            }
            PunchDetails::upsert(
                $dataToInsertOrUpdate,
                ['employee_id', 'attendance_datetime','access_id'],
                ['employee_id','attendance_datetime','company_id', 'device_id', 'access_id']
            );
        }
        return to_route('admin.dashboard')->with('success', 'Punch Data Get Successfully');
    }
}