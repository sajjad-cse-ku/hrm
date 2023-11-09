<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Roster extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }
    public function shift_day_1(){
        return $this->belongsTo(Shift::class,'day_01');
    }
    public function shift_day_2(){
        return $this->belongsTo(Shift::class,'day_02');
    }
    public function shift_day_3(){
        return $this->belongsTo(Shift::class,'day_03');
    }
    public function shift_day_4(){
        return $this->belongsTo(Shift::class,'day_04');
    }
    public function shift_day_5(){
        return $this->belongsTo(Shift::class,'day_05');
    }
    public function shift_day_6(){
        return $this->belongsTo(Shift::class,'day_06');
    }
    public function shift_day_7(){
        return $this->belongsTo(Shift::class,'day_07');
    }
    public function shift_day_8(){
        return $this->belongsTo(Shift::class,'day_08');
    }
    public function shift_day_9(){
        return $this->belongsTo(Shift::class,'day_09');
    }
    public function shift_day_10(){
        return $this->belongsTo(Shift::class,'day_10');
    }
    public function shift_day_11(){
        return $this->belongsTo(Shift::class,'day_11');
    }
    public function shift_day_12(){
        return $this->belongsTo(Shift::class,'day_12');
    }
    public function shift_day_13(){
        return $this->belongsTo(Shift::class,'day_13');
    }
    public function shift_day_14(){
        return $this->belongsTo(Shift::class,'day_14');
    }
    public function shift_day_15(){
        return $this->belongsTo(Shift::class,'day_15');
    }
    public function shift_day_16(){
        return $this->belongsTo(Shift::class,'day_16');
    }
    public function shift_day_17(){
        return $this->belongsTo(Shift::class,'day_17');
    }
    public function shift_day_18(){
        return $this->belongsTo(Shift::class,'day_18');
    }
    public function shift_day_19(){
        return $this->belongsTo(Shift::class,'day_19');
    }
    public function shift_day_20(){
        return $this->belongsTo(Shift::class,'day_20');
    }
    public function shift_day_21(){
        return $this->belongsTo(Shift::class,'day_21');
    }
    public function shift_day_22(){
        return $this->belongsTo(Shift::class,'day_22');
    }
    public function shift_day_23(){
        return $this->belongsTo(Shift::class,'day_23');
    }
    public function shift_day_24(){
        return $this->belongsTo(Shift::class,'day_24');
    }
    public function shift_day_25(){
        return $this->belongsTo(Shift::class,'day_25');
    }
    public function shift_day_26(){
        return $this->belongsTo(Shift::class,'day_26');
    }
    public function shift_day_27(){
        return $this->belongsTo(Shift::class,'day_27');
    }
    public function shift_day_28(){
        return $this->belongsTo(Shift::class,'day_28');
    }
    public function shift_day_29(){
        return $this->belongsTo(Shift::class,'day_29');
    }
    public function shift_day_30(){
        return $this->belongsTo(Shift::class,'day_30');
    }
    public function shift_day_31(){
        return $this->belongsTo(Shift::class,'day_31');
    }
    public function loc_1(){
        return $this->belongsTo(DutyLocations::class,'loc_01');
    }
    public function loc_2(){
        return $this->belongsTo(DutyLocations::class,'loc_02');
    }
    public function loc_3(){
        return $this->belongsTo(DutyLocations::class,'loc_03');
    }
    public function loc_4(){
        return $this->belongsTo(DutyLocations::class,'loc_04');
    }
    public function loc_5(){
        return $this->belongsTo(DutyLocations::class,'loc_05');
    }

}
