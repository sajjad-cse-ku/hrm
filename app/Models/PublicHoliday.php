<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PublicHoliday extends Model
{
    use HasFactory;
    protected $fillable = [
        'company_id',
        'created_by',
        'hYear',
        'from_date',
        'nods',
        'to_date',
        'count',
        'title',
        'description',
        'status',
    ];
}
