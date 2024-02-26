<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeePromotion extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'user_id',
        'created_by',
        'designation_id',
        'effective_date',
        'descriptions',
        'status',
        ];
    public function company(){
        return $this->belongsTo(Company::class,'company_id');
    }
    public function designation(){
        return $this->belongsTo(Designation::class,'designation_id');
    }

    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }

}
