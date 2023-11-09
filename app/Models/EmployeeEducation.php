<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeEducation extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'name',
        'description',
        'institution',
        'passing_year',
        'result',
        'degree_type',
        'achievement_date',
        'status',
    ];

    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }
}
