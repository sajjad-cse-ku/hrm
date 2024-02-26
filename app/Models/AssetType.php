<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssetType extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'name',
        'asset_type',
        'created_by',
        'status',
    ];

    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }
    public function company(){
        return $this->belongsTo(Company::class,'company_id');
    }
}
