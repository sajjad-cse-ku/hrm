<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Arears extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'period_id',
        'amount',
        'description',
    ];

    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }
    public function org(){
        return $this->belongsTo(OrgCalender::class,'period_id');
    }
}
