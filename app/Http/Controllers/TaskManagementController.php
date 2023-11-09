<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskManagementRequest;
use App\Models\Project;
use App\Models\TaskManagement;
use App\Models\User;
use App\Repositories\TaskManagementRepository;
use Illuminate\Console\View\Components\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Carbon;

class TaskManagementController extends Controller
{
    protected $task_management;
    public function __construct(TaskManagementRepository $task_management)
    {
        $this->task_management = $task_management;
    }


    public function index(){

        $result = $this->task_management->getAll();
        return Inertia::render('Module/TaskManagement/Index',[
            'result' => $result,
        ]);
    }
    public function create(){

        $user = User::with('professionaldata')->where('id',Auth::user()->id)->first();
        $departmentId = $user->professionaldata->department_id;
        $users =User::whereHas('professionaldata', function ($query) use ($departmentId) {
            $query->where('department_id', $departmentId);
        })->get();
//        $users =User::whereHas('professionaldata', function ($query) use ($departmentId) {
//            $query->where('department_id', $departmentId);
//        })->where('id','!=',Auth::id())->get();
        $projects = Project::select('id','name')->where('status',1)->get();
        return Inertia::render('Module/TaskManagement/Add',[
            'users'=>$users,
            'projects'=>$projects,
        ]);
    }
    public function store(TaskManagementRequest $request){
        $result = $this->task_management->store($request);
        if($result['status']== true){
            // return back()->with('success', $result['message']);
            return to_route('admin.dashboard')->with('success', $result['message']);
        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }
    public function edit(int $id){
        $user = User::with('professionaldata')->where('id',Auth::user()->id)->first();
        $departmentId = $user->professionaldata->department_id;
        $users =User::whereHas('professionaldata', function ($query) use ($departmentId) {
            $query->where('department_id', $departmentId);
        })->get();
        $projects = Project::select('id','name')->where('status',1)->get();
        $result = TaskManagement::with('users','project')
            ->where('id',$id)
            ->first();
        return Inertia::render('Module/TaskManagement/EditAssignTask',['result' => $result, 'users'=>$users,
            'projects'=>$projects]);
    }
    public function update(Request $request){

        $user = User::with('professionaldata')->where('id',Auth::user()->id)->first();
        $departmentId = $user->professionaldata->department_id;

        $task = TaskManagement::findOrFail($request->id);

        $task->update([
            'task_creator_id' => Auth::user()->id,
            'department_id' => $departmentId,
            'submit_date' => now(),
            'project_id' => $request->project_id,
            'task_title' => $request->task_title,
            'task_author_comment' => $request->task_author_comment,
            'task_priority' => $request->task_priority,
        ]);
        if ($task) {
            $task_list = DB::table('user_task')->where('task_id', $request->id)->get();

            foreach ($task_list as $record) {
                // Delete each record individually
                DB::table('user_task')->where('id', $record->id)->delete();
            }

            $userIds = $request->selectedAssignedUser;
            $task->taskuser()->sync($userIds);

//            return ['status' => true, 'message' => 'Update successfully'];
            return back()->with('success', 'Update successfully');
        }
    }
    public function review($id)
    {
        $user = User::with('professionaldata')->where('id',Auth::user()->id)->first();
        $departmentId = $user->professionaldata->department_id;
        $users =User::whereHas('professionaldata', function ($query) use ($departmentId) {
            $query->where('department_id', $departmentId);
        })->get();
        $projects = Project::select('id','name')->where('status',1)->get();
        $result = TaskManagement::with('users','project')
            ->where('id',$id)
            ->first();
        return Inertia::render('Module/TaskManagement/ReviewTask',['result' => $result, 'users'=>$users,
            'projects'=>$projects]);
    }
    public function update_review_task(Request $request){
        $task = TaskManagement::findOrFail($request->id);
        $task->update([
            'task_remarks' => $request->task_remarks,
            'task_marking' => $request->task_marking,
            'task_status' => $request->task_status != null ? $request->task_status :'C',
        ]);
        if ($task) {
            if ($task->task_status === "P") {
                return to_route('admin.my.task')->with('success', 'Back To Progress');
            }
            else if ($task->task_status === "C") {
                return to_route('admin.my.task')->with('success', 'Back To Assign Again');
            }
            else if ($task->task_status === "A") {
                return to_route('admin.my.task')->with('success', 'Task Complete');
            }
        }
    }
    public function updateMyTask(Request $request)
    {
        $task = TaskManagement::findOrFail($request->id);

        if ($task->task_status == "C")
        {
            $task->update([
                'task_approximate_start_date' => now('Asia/Dhaka'),
                'task_start_date_time' => now('Asia/Dhaka')->toTimeString(),
                'task_assigned_user_comment' => $request->task_assigned_user_comment,
                'task_status' => 'P',
            ]);
            if ($task) {
                return to_route('admin.my.task')->with('success', 'Task In Progress');

            }
        }else if($task->task_status == "P"){
            $task->update([
                'task_link' => $request->task_link,
                'task_approximate_end_date' => now('Asia/Dhaka'),
                'task_end_date_time' => now('Asia/Dhaka')->toTimeString(),
                'task_assigned_user_comment' => $request->task_assigned_user_comment,
                'task_status' => 'R',
            ]);
            if ($task->task_start_date_time && $task->task_end_date_time) {
                $start = Carbon::createFromFormat('H:i:s', $task->task_start_date_time);
                $end = Carbon::createFromFormat('H:i:s', $task->task_end_date_time);

                $duration = $end->diff($start);
                $formattedDuration = $duration->format('%H:%I:%S');
            } else {
                $formattedDuration = null;
            }

            $task->update(['task_total_hours' => $formattedDuration]);

            if ($task) {
                return to_route('admin.my.task')->with('success', 'Task In Review');

            }
        }
        else if($task->task_status == "R"){
            $task->update([
                'task_link' => $request->task_link,
                'task_approximate_start_date' => $request->task_approximate_start_date,
                'task_approximate_end_date' => $request->task_approximate_end_date,
                'task_assigned_user_comment' => $request->task_assigned_user_comment,
                'task_status' => 'A',
            ]);
            if ($task) {
                return to_route('admin.my.task')->with('success', 'Task Approved');

            }
        }
    }
    public function viewMyTask(int $id)
    {
        $user = User::with('professionaldata')->where('id',Auth::user()->id)->first();
        $departmentId = $user->professionaldata->department_id;
        $users =User::whereHas('professionaldata', function ($query) use ($departmentId) {
            $query->where('department_id', $departmentId);
        })->get();
        $projects = Project::select('id','name')->where('status',1)->get();
        $result = TaskManagement::with('users','project')
            ->where('id',$id)
            ->first();
        return Inertia::render('Module/TaskManagement/ViewMyTask',['result' => $result,'users'=>$users,
            'projects'=>$projects]);
    }

    public function assignTask(){
        $tasks = TaskManagement::with('users','project')->
        where('task_creator_id',Auth::id())
            ->where('task_status','C')
                ->get();
        if(isset($tasks)){
            return Inertia::render('Module/TaskManagement/AssignTask',[
                'tasks'=>$tasks,
            ]);
        }
    }

    public function myTask() {
        $userId = Auth::id();
        $tasks = TaskManagement::whereHas('users', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })->where('task_status', 'C')->with('project')->get();

        if(isset($tasks)){
            return Inertia::render('Module/TaskManagement/MyTask',[
                'tasks'=>$tasks,
            ]);
        }
    }

    public function getCreatedTask(){
        $tasks = TaskManagement::with('users','project')->
        where('task_creator_id',Auth::id())
            ->where('task_status','C')
            ->get();
         return response()->json($tasks);
    }
    public function getProcessingTask(){
        $tasks = TaskManagement::with('users','project')->
        where('task_creator_id',Auth::id())
            ->where('task_status','P')
            ->get();
        return response()->json($tasks);
    }
    public function getReviewTask(){
        $tasks = TaskManagement::with('users','project')->
        where('task_creator_id',Auth::id())
            ->where('task_status','R')
            ->get();
        return response()->json($tasks);
    }
    public function getDoneTask(){
        $tasks = TaskManagement::with('users','project')->
        where('task_creator_id',Auth::id())
            ->where('task_status','A')
            ->get();
        return response()->json($tasks);
    }

    public function getCreatedMyTask(){
        $userId = Auth::id();
        $tasks = TaskManagement::whereHas('users', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })
            ->where('task_status', 'C')
            ->with('project')
            ->get();
        return response()->json($tasks);
    }
    public function getProcessingMyTask(){
        $userId = Auth::id();
        $tasks = TaskManagement::whereHas('users', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })
            ->where('task_status', 'P')
            ->with('project')
            ->get();
        return response()->json($tasks);
    }
    public function getReviewMyTask(){
        $userId = Auth::id();
        $tasks = TaskManagement::whereHas('users', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })
            ->where('task_status', 'R')
            ->with('project')
            ->get();
        return response()->json($tasks);
    }
    public function getDoneMyTask(){
        $userId = Auth::id();
        $tasks = TaskManagement::whereHas('users', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })
            ->where('task_status', 'A')
            ->with('project')
            ->get();
        return response()->json($tasks);
    }

}
