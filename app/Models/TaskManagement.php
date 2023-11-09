<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskManagement extends Model
{
    use HasFactory;
    protected  $fillable = [
        'task_assigned_emp_id',
        'task_creator_id',
        'department_id',
        'task_title',
        'project_id',
        'task_author_comment',
        'task_assigned_user_comment',
        'submit_date',
        'task_priority',
        'task_approximate_start_date',
        'task_approximate_end_date',
        'task_start_date_time',
        'task_end_date_time',
        'task_total_hours',
        'task_status',
        'task_remarks',
        'task_marking',
        'task_link',
    ];
    public function taskuser()
    {
        return $this->belongsToMany(User::class, 'user_task', 'task_id', 'user_id');
    }
    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id');
    }
    public function users()
    {
        return $this->belongsToMany(User::class, 'user_task', 'task_id', 'user_id');
    }
}