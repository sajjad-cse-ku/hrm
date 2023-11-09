<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;
    protected $fillable = [
        'created_by',
        'company_id',
        'name',
        'department_id',
        'short_name',
        'department_code',
        'started_from',
        'top_rank',
        'report_to',
        'headed_by',
        'second_man',
        'roster_month_id',
        'status'
    ];

    public function sections(){
        return $this->hasMany(Section::class,'department_id');
    }
    public function headed(){
        return $this->belongsTo(User::class,'headed_by');
    }
    public function report(){
        return $this->belongsTo(User::class,'report_to');
    }
    public function company(){
        return $this->belongsTo(Company::class,'company_id');
    }
}
