<?php
namespace App\Repositories;


use App\Models\Shift;
use App\Models\TaskManagement;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class TaskManagementRepository {
    protected $model;

    public function __construct(TaskManagement $model)
    {
        $this->model=$model;
    }

    public function getAll(){
        return $this->model::all();
    }
    public function store($request){



        $assignUserIDs = [];

        foreach ($request->selectedAssignedUser as $assignedUser) {
            if ($request->task_type == "my_task"){
                $assignUserIDs[] = $assignedUser;
            }
            else{
                $assignUserIDs[] = $assignedUser['value'];
            }
        }

        $user = User::with('professionaldata')->where('id', Auth::user()->id)->first();
        $departmentId = $user->professionaldata->department_id;

        $task = TaskManagement::create([
            'task_creator_id' => Auth::user()->id,
            'department_id' => $departmentId,
            'submit_date' => now(),
            'project_id' => $request->project_id,
            'task_title' => $request->task_title,
            'task_author_comment' => $request->task_author_comment,
            'task_priority' => $request->task_priority,
        ]);

        if ($task) {
            $userIds = $assignUserIDs;
            $task->taskuser()->sync($userIds);
            return ['status' => true, 'message' => 'Task created successfully'];
        }
    }

    public function edit(int $id){
        return $this->model::find($id);
    }

    public function viewMyTask(int $id)
    {
        return $this->model::find($id);
    }
}