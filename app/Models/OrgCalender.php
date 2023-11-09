<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrgCalender extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'created_by',
        'calender_year',
        'month_id',
        'c_month_id',
//        'month_name',
        'start_from',
        'ends_on',
        'salary_open',
        'salary_update',
        'food_open',
        'status',
    ];
}
