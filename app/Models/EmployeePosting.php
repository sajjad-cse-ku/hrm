<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeePosting extends Model
{
    use HasFactory;
    protected $fillable =[
    'company_id',
    'user_id',
    'department_id',
    'section_id',
    'report_to',
    'posting_start_date',
    'posting_end_date',
    'posting_notes',
    'descriptions',
    'status',
    'created_by'
];

    public function company(){
        return $this->belongsTo(Company::class,'company_id');
    }
    public function department(){
        return $this->belongsTo(Department::class,'department_id');
    }

    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }
}
