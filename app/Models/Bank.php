<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bank extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'created_by',
        'name',
        'branch_code',
        'branch_name',
        'status',
    ];
}
