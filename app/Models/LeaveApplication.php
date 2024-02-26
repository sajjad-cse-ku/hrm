<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeaveApplication extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id','user_id','leave_id','created_by',
        'recommend_id','approve_id',
        'leave_year','from_date','to_date',
        'nods','duty_date','application_time','reason',
        'leave_attachment','location','alternate_id',
        'alternate_submit','recommend_date','approve_date',
        'notes','status',
    ];




    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }

    public function leavecategory(){
        return $this->belongsTo(LeaveCategory::class,'leave_id');
    }

}
