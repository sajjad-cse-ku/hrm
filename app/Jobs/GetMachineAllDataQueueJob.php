<?php

namespace App\Jobs;

use App\Classes\ZKLibrary;
use App\Models\PunchDetails;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;

class GetMachineAllDataQueueJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $companyId;

    /**
     * Create a new job instance.
     */
    public function __construct($companyId)
    {
        $this->companyId = $companyId;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $zk = new ZKLibrary("103.203.94.204", "4370", "UDP");
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
                        'company_id' => $this->companyId,
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
    }
}
