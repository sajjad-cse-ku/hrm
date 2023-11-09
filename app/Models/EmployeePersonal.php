<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeePersonal extends Model
{
    use HasFactory;
    protected $fillable = [
        'company_id','user_id','title_id',
        'religion_id','signature',
        'pr_address','pr_district','pr_police_station','pr_post_code',
        'pm_address','pm_district','pm_police_station','pm_post_code',
        'm_address','m_district','m_police_station','m_post_code',
        'biography','father_name','mother_name','spouse_name','blood_group',
        'last_education','prof_speciality','national_id','is_printed',
    ];
}
