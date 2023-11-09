<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }
    public function leave(){
        return $this->belongsTo(LeaveCategory::class,'leave_id');
    }
    public function shift(){
        return $this->belongsTo(Shift::class,'shift_id');
    }
    public function department(){
        return $this->belongsTo(Department::class,'department_id');
    }
    public function scopeCurrentMonth($query)
    {
        return $query->whereMonth('attend_date', now()->month);
    }
}
