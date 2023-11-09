<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeaveRegister extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'user_id',
        'leave_id',
        'leave_year',
        'leave_eligible',
        'leave_enjoyed',
        'leave_balance',
        'last_leave',
        'status',
        'created_by'
    ];

    public function leavecategory(){
        return $this->belongsTo(LeaveCategory::class,'leave_id');
    }
    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }
}
