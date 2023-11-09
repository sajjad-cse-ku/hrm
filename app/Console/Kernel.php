<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        {

            $schedule->command('punchdetails:cron')
                ->dailyAt('09:50')
                ->timezone('Asia/Dhaka');

            $schedule->command('attendance:cron')
                ->dailyAt('09:55')
                ->timezone('Asia/Dhaka');

            $schedule->command('punchdetails:cron')
                ->dailyAt('10:05')
                ->timezone('Asia/Dhaka');

            $schedule->command('attendance:cron')
                ->dailyAt('10:10')
                ->timezone('Asia/Dhaka');

            $schedule->command('punchdetails:cron')
                ->dailyAt('10:15')
                ->timezone('Asia/Dhaka');

            $schedule->command('attendance:cron')
                ->dailyAt('10:20')
                ->timezone('Asia/Dhaka');

            $schedule->command('punchdetails:cron')
                ->dailyAt('11:00')
                ->timezone('Asia/Dhaka');

            $schedule->command('attendance:cron')
                ->dailyAt('11:05')
                ->timezone('Asia/Dhaka');

            $schedule->command('punchdetails:cron')
                ->dailyAt('18:10')
                ->timezone('Asia/Dhaka');

            $schedule->command('attendance:cron')
                ->dailyAt('18:20')
                ->timezone('Asia/Dhaka');

            $schedule->command('punchdetails:cron')
                ->dailyAt('18:55')
                ->timezone('Asia/Dhaka');

            $schedule->command('attendance:cron')
                ->dailyAt('19:00')
                ->timezone('Asia/Dhaka');

            $schedule->command('punchdetails:cron')
                ->dailyAt('22:25')
                ->timezone('Asia/Dhaka');

            $schedule->command('attendance:cron')
                ->dailyAt('22:30')
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
