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

        $projects = Project::select('id','name')->where('status',1)->get();
        return Inertia::render('Module/TaskManagement/Add',[
            'users'=>$users,
            'projects'=>$projects,
        ]);
    }
    public function MyTaskCreate(){

        $user = User::with('professionaldata')->where('id',Auth::user()->id)->first();
        $departmentId = $user->professionaldata->department_id;
        $users =User::whereHas('professionaldata', function ($query) use ($departmentId) {
            $query->where('department_id', $departmentId);
        })->get();
        $projects = Project::select('id','name')->where('status',1)->get();
        return Inertia::render('Module/TaskManagement/MyTaskAdd',[
            'users'=>$users,
            'projects'=>$projects,
        ]);
    }
    public function store(TaskManagementRequest $request){


        $result = $this->task_management->store($request);
        if($result['status']== true){
            // return back()->with('success', $result['message']);
            return to_route('admin.task.assign')->with('success', $result['message']);
        }else{
            return back()->with('error', 'Data Does not Insert');
        }
    }
    public function myStore(TaskManagementRequest $request){
        $result = $this->task_management->store($request);
        if($result['status']== true){
            // return back()->with('success', $result['message']);
            return to_route('admin.my.task')->with('success', $result['message']);
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
            return to_route('admin.task.assign')->with('success', 'Update successfully');
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
    public function CompleteView($id)
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
        return Inertia::render('Module/TaskManagement/ViewCompleteTask',['result' => $result, 'users'=>$users,
            'projects'=>$projects]);
    }
    public function update_review_task(Request $request){
        $request->validate([
            'task_remarks' => 'required',
            'task_marking' => 'required',
            'task_status' => 'required',

        ]);

        $task = TaskManagement::findOrFail($request->id);
        $task->update([
            'task_remarks' => $request->task_remarks,
            'task_marking' => $request->task_marking,
            'task_status' => $request->task_status != null ? $request->task_status :'C',
        ]);
        if ($task) {
            if ($task->task_status === "P") {
                return to_route('admin.task.assign')->with('success', 'Back To Progress');
            }
            else if ($task->task_status === "C") {
                return to_route('admin.task.assign')->with('success', 'Back To Assign Again');
            }
            else if ($task->task_status === "A") {
                return to_route('admin.task.assign')->with('success', 'Task Complete');
            }
        }
    }
    public function updateMyTask(Request $request)
    {
        $task = TaskManagement::findOrFail($request->id);

        if ($task->task_status == "C")
        {
            $task->update([
                'task_assigned_user_comment' => $request->task_assigned_user_comment,
                'task_status' => 'P',
            ]);
            if ($task) {
                return to_route('admin.my.task')->with('success', 'Task In Progress');

            }
        }else if ($task->task_status == "P") {
            $request->validate([
                'task_link' => 'required',
                'task_approximate_start_date' => 'required',
                'task_start_date_time' => 'required',
                'task_approximate_end_date' => 'required',
                'task_end_date_time' => 'required',
                'task_assigned_user_comment' => 'required',
            ]);

            $task->update([
                'task_link' => $request->task_link,
                'task_approximate_start_date' => $request->task_approximate_start_date,
                'task_start_date_time' => $request->task_start_date_time,
                'task_approximate_end_date' => $request->task_approximate_end_date,
                'task_end_date_time' => $request->task_end_date_time,
                'task_assigned_user_comment' => $request->task_assigned_user_comment,
                'task_status' => 'R',
            ]);

            if ($task->task_start_date_time && $task->task_end_date_time) {
                $startDateTime = Carbon::parse( $task->task_approximate_start_date . ' ' . $task->task_start_date_time);
                $endDateTime = Carbon::parse($task->task_approximate_end_date . ' ' . $task->task_end_date_time);

                if (!$startDateTime || !$endDateTime) {
                    // Handle the case where the parsing fails
                    return to_route('admin.my.task')->with('error', 'Invalid date/time format');
                }

                $duration = $endDateTime->diff($startDateTime);

                $totalSeconds = $duration->days * 24 * 60 * 60 + $duration->h * 60 * 60 + $duration->i * 60 + $duration->s;

                $formattedDuration = sprintf('%02d:%02d:%02d', floor($totalSeconds / 3600), floor(($totalSeconds % 3600) / 60), $totalSeconds % 60);
            } else {
                $formattedDuration = null;
            }

            $task->update(['task_total_hours' => $formattedDuration]);

            return to_route('admin.my.task')->with('success', 'Task In Review');
        }

    }
    public function viewMyTask(int $id)
    {
//        dd('ok');
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
            ->latest('created_at')
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
        })->where('task_status', 'P')->with('project')->latest('created_at')->get();

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
            ->latest('created_at')
            ->get();
         return response()->json($tasks);
    }
    public function getProcessingTask(){
        $tasks = TaskManagement::with('users','project')->
        where('task_creator_id',Auth::id())
            ->where('task_status','P')
            ->latest('created_at')
            ->get();
        return response()->json($tasks);
    }
    public function getReviewTask(){
        $user = User::with('professionaldata')->where('id', Auth::user()->id)->first();
        $departmentId = $user->professionaldata->department_id;

        $tasks = TaskManagement::with('users', 'project')
            ->where(function ($query) use ($departmentId) {
                $query->where('task_creator_id', Auth::id())
                    ->orWhere('department_id', $departmentId);
            })
            ->where('task_status', 'R')
            ->latest('created_at')
            ->get();
        return response()->json($tasks);
    }
    public function getDoneTask(){
        $user = User::with('professionaldata')->where('id', Auth::user()->id)->first();
        $departmentId = $user->professionaldata->department_id;
        $tasks = TaskManagement::with('users', 'project')
            ->where(function ($query) use ($departmentId) {
                $query->where('task_creator_id', Auth::id())
                    ->orWhere('department_id', $departmentId);
            })
            ->where('task_status', 'A')
            ->latest('created_at')
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
            ->latest('created_at')
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
            ->latest('created_at')
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
            ->latest('created_at')
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
            ->latest('created_at')
            ->get();
        return response()->json($tasks);
    }

}
