<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SiteSettings extends Model
{
    use HasFactory;
    protected $fillable = [
        'sick',
        'casual',
        'extra_time',
        'ip',
        'port',
        'protocol',
        'general_shift',
        'night_shift',
        'start_day_first_time',
        'start_day_second_time',
        'end_day_first_time',
        'end_day_second_time',
    ];
}
