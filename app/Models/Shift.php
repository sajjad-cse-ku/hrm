<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shift extends Model
{
    use HasFactory;
    protected $fillable = [
        'company_id','created_by','name','short_name',
        'from_time','to_time','duty_hour',
        'end_next_day','effective_date','description',
        'terminal','status',
    ];
}
