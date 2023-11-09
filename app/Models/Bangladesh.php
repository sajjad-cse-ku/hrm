<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bangladesh extends Model
{
    use HasFactory;
    protected $fillable = [
        'lang',
        'division',
        'district',
        'thana',
        'post_office',
        'post_code',
        'status'
    ];
}
