<?php

namespace App\Console;

use Carbon\Carbon;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Support\Facades\Log;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {

        $now = Carbon::now('Asia/Dhaka');
        Log::info($now);

            // Start Day First Time
            $startDayFirstTimeValue = SiteSettings()->value('start_day_first_time');
            $carbonStartDayFirstTime = Carbon::createFromFormat('H:i:s', $startDayFirstTimeValue);
            $startDayFirstHourComponent = $carbonStartDayFirstTime->format('H');

            // Start Day Second Time
            $startDaySecondTimeValue = SiteSettings()->value('start_day_second_time');
            $carbonStartDaySecondTime = Carbon::createFromFormat('H:i:s', $startDaySecondTimeValue);
            $startDaySecondHourComponent = $carbonStartDaySecondTime->format('H');

            // End Day First Time
            $endDayFirstTimeValue = SiteSettings()->value('end_day_first_time');
            $carbonEndDayFirstTime = Carbon::createFromFormat('H:i:s', $endDayFirstTimeValue);
            $endDayFirstHourComponent = $carbonEndDayFirstTime->format('H');

            // End Day Second Time
            $endDaySecondTimeValue = SiteSettings()->value('end_day_second_time');
            $carbonEndDaySecondTime = Carbon::createFromFormat('H:i:s', $endDaySecondTimeValue);
            $endDaySecondHourComponent = $carbonEndDaySecondTime->format('H');


        if( ( $now->hour >= $startDayFirstHourComponent && $now->hour < $startDaySecondHourComponent ) || ( $now->hour >= $endDayFirstHourComponent && $now->hour < $endDaySecondHourComponent ) )
        {
            Log::info("Inside If Condidtion");
           $schedule->command('punchdetails:cron')
               ->everyMinute()
               ->timezone('Asia/Dhaka');
            $schedule->command('attendance:cron')
                ->everyMinute()
                ->timezone('Asia/Dhaka');

        }

    }
    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
