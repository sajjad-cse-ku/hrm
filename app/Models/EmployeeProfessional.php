<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeProfessional extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id','department_id','section_id',
        'designation_id','working_status_id',
        'bank_id','pf_no','report_to',
        'joining_date','card_no','overtime',
        'overtime_note','transport','transport_note',
        'pay_schale','pay_grade','confirm_probation',
        'confirm_period','bank_acc_no','status_change_date','created_by'
    ];

    public function working(){
        return $this->belongsTo(WorkingStatus::class,'working_status_id');
    }
    public function designation(){
        return $this->belongsTo(Designation::class,'designation_id');
    }
    public function department(){
        return $this->belongsTo(Department::class,'department_id');
    }

}
