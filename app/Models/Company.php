<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;
    protected $fillable = [
        'group_company_id','name','address','city',
        'state','post_code',
        'email','country','phone_no',
        'website','currency','status'
    ];

    public function user(){
        return $this->hasMany(User::class,'company_id');
    }
    public function groupcompany(){
        return $this->belongsTo(GroupCompany::class,'group_company_id');
    }

}