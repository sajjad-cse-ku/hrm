<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notice extends Model
{
    use HasFactory;
    protected $fillable =[
        'company_id','created_by', 'notice_date',
        'expiry_date','title','description',
        'sender','type',
        'confidentiality','receiver',
        'file_path','status',
    ];

    public function company(){
        return $this->belongsTo(Company::class,'company_id');
    }
}
