<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Asset extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'product_name',
        'asset_type_id',
        'model',
        'serial_no',
        'office_tag_number',
        'purchase_date',
        'purchase_quantity',
        'total_quantity',
        'purchase_price',
        'purchase_by',
        'warranty_info',
        'purchase_condition',
        'destroy_date',
        'destroy_note',
        'details',
        'created_by',
        'status',
    ];

    public function user(){
        return $this->belongsTo(User::class,'created_by');
    }
    public function company(){
        return $this->belongsTo(Company::class,'company_id');
    }
    public function assettype(){
        return $this->belongsTo(AssetType::class,'asset_type_id');
    }
}
