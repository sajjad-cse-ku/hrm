<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SalarySetup extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'user_id',
        'created_by',
        'basic',
        'ot_basic',
        'house_rent',
        'medical',
        'entertainment',
        'conveyance',
        'food',
        'special_allowance',
        'others_allowance',
        'gross_salary',
        'cash_salary',
        'pf_own',
        'income_tax',
        'salary_advance',
        'stamp_fee',
        'punishment',
        'other_deduction',
        'other_deduction_details',
        'bank_id',
        'account_no',
        'tds',
        'status',
    ];

    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }
    public function company(){
        return $this->belongsTo(Company::class,'company_id');
    }

}
