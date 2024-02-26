<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssetAssigned extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id',
        'asset_type_id',
        'assigned_by',
        'created_by',
        'asset_id',
        'assigned_date',
        'return_date',
        'return_condition',
        'return_reason',
        'location',
        'approval_note',
        'description',
        'status',
    ];

    public function employee(){
        return $this->belongsTo(User::class,'employee_id');
    }
    public function createdby(){
        return $this->belongsTo(User::class,'created_by');
    }
    public function assignedby(){
        return $this->belongsTo(User::class,'assigned_by');
    }
    public function company(){
        return $this->belongsTo(Company::class,'company_id');
    }
    public function assettype(){
        return $this->belongsTo(AssetType::class,'asset_type_id');
    }
    public function asset(){
        return $this->belongsTo(Asset::class,'asset_id');
    }
}
