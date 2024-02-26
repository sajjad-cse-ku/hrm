<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MonthlySalary extends Model
{
    use HasFactory;
    protected $guarded = [
        'id'
    ];
    public function user()
    {
           return $this->belongsTo(User::class,'user_id');
    }
    public function bank()
    {
        return $this->belongsTo(Bank::class,'bank_id');
    }
    public function period()
    {
        return $this->belongsTo(OrgCalender::class,'period_id');
    }
    public function company()
    {
        return $this->belongsTo(Company::class,'company_id');
    }
}
