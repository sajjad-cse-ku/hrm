<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use App\Classes\ZKLibrary;
use Illuminate\Console\Command;

class AttendanceCronController extends Controller
{

    public function handle()
    {
        Log::info("punch details execution");
        date_default_timezone_set('Asia/Dhaka');
        $zk = new ZKLibrary(SiteSettings()->ip, SiteSettings()->port, SiteSettings()->protocol);
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
                        'company_id' => 1,
                        'device_id' => 1,
                        'access_id' => $record["access_id"],
                    ];
                }
            }
            \App\Models\PunchDetails::upsert(
                $dataToInsertOrUpdate,
                ['employee_id', 'attendance_datetime','access_id'],
                ['employee_id','attendance_datetime','company_id', 'device_id', 'access_id']
            );
        }
        Log::info('User login', ['panch_data' => $dataToInsertOrUpdate]);

    }

}
