<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeaveCategory extends Model
{
    use HasFactory;
    protected $fillable = [
        'company_id','created_by','name',
        'short_code','leave_type','leave_limit',
        'yearly_limit','is_carry_forward','show_roster',
        'particulars','status',
    ];

    public function leaveregister(){
        return $this->hasOne(LeaveRegister::class,'leave_id');
    }
}
