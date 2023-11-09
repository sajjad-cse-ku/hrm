<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    use HasFactory;
    protected $fillable = [
        'company_id','created_by','department_id',
        'section_code','name','short_name',
        'description','started_from','report_to',
        'approval_authority','headed_by','second_man',
        'email','status','emp_count',
        'approved_manpower','top_rank','status'
    ];
}
