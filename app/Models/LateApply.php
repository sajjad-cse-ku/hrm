<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LateApply extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'subject',
        'message',
        'late_date',
        'status',
    ];
    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }
}
