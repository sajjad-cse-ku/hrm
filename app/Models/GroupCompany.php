<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GroupCompany extends Model
{
    use HasFactory;

    protected $fillable = [
        'name','address','city',
        'state','post_code',
        'email','country','phone_no',
        'website','currency','status'
    ];
}