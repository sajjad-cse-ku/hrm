<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SiteSettings extends Model
{
    use HasFactory;
    protected $fillable = [
        'sick',
        'casual',
        'extra_time',
        'ip',
        'port',
        'protocol',
    ];
}
