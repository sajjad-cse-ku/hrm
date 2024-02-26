<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'company_id',
        'username',
        'first_name',
        'last_name',
        'email',
        'status',
        'machine_user_id',
        'mobile',
        'gender',
        'date_of_birth',
        'avatar',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function personaldata(){
        return $this->hasOne(EmployeePersonal::class,'user_id');
    }
    public function company(){
        return $this->belongsTo(Company::class,'company_id');
    }

    public function professionaldata(){
        return $this->hasOne(EmployeeProfessional::class);
    }

    public function posting(){
        return $this->hasMany(EmployeePosting::class,'user_id');
    }

    public function leaveapplication(){
        return $this->hasMany(LeaveApplication::class,'user_id');
    }
    public function leaveregister(){
        return $this->hasMany(LeaveRegister::class,'user_id');
    }

    public function punches()
    {
        return $this->hasMany(PunchDetails::class, 'employee_id', 'machine_user_id');
    }

    public function roster(){
        return $this->hasMany(Roster::class,'user_id');
    }

    public function permission()
    {
        return $this->belongsToMany(Permission::class, 'user_permissions');
    }
    public function leaveapplications(){
        return $this->hasMany(LeaveApplication::class,'user_id');
    }

    public function attendance(){
        return $this->hasOne(Attendance::class,'user_id');
    }
    public function attendances(){
        return $this->hasMany(Attendance::class,'user_id');
    }
    public function education(){
        return $this->hasMany(EmployeeEducation::class,'user_id');
    }
    public function breaktime(){
        return $this->hasMany(BreakTime::class,'user_id');
    }

    public function task()
    {
        return $this->belongsToMany(TaskManagement::class, 'user_task', 'user_id', 'task_id');
    }
    public function salary(){
        return $this->hasOne(SalarySetup::class,'user_id');
    }
    public function arears(){
        return $this->hasOne(Arears::class,'user_id');
    }

    public function monthlysalary()
    {
           return $this->hasOne(MonthlySalary::class,'user_id');
    }

}
