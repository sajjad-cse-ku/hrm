<?php

namespace App\Http\Controllers;

use App\Http\Requests\PermissionRequest;
use App\Models\Module;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use App\Models\Permission;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class PermissionsController extends Controller
{
    public function index(){

        $allPermissions = Permission::with('module')->get();

        return Inertia::render('Module/Permission/Permissionlist', [
            'allPermissions' => $allPermissions,
        ]);

    }


    public function create(){
        $modules = Module::all();
        return Inertia::render('Module/Permission/Createpermission',[
            'modules' => $modules,
        ]);
    }



    // add_employee
    public function store(Request $request){
        // dd($request->all());
         // Validate the incoming request data


        $request->validate([
            'permission_name' => 'required|string|max:255|unique:permissions',
        ]);

        // Create a new permission record
        $permission = new Permission();
        $permission->permission_name = $request->input('permission_name');
        $permission->module_id = $request->input('module_id');
        $permission->save();

        // Redirect back or to a success page
        return redirect()->intended('/admin/permissions')->with('success', 'Permission created successfully');
    }


    public function edit($id){

        // Validate the incoming request data
        $permission = DB::table('permissions')->where('id', $id)->first();
        $modules = Module::all();
        $allPermissions = Permission::all();
        return Inertia::render('Module/Permission/Editpermission', [
            'permission' => $permission,
            'allPermissions' => $allPermissions,
            'modules' => $modules,
        ]);


    }


    public function update(Request $request){
        $permissionId = $request->permissionID;
        $permission_name = $request->permission_name;
        $module_id = $request->module_id;


        DB::table('permissions')
        ->where('id', $permissionId)
        ->update([
            'permission_name' => $permission_name,
            'module_id' => $module_id, // Add the module_id field
        ]);

        return redirect()->intended('/admin/permissions')->with('success', 'Permission edited successfully');
    }





    public function delete($id){
        $deleted = DB::table('permissions')->where('id', $id)->delete();
        if ($deleted) {
            return redirect()->back()->with('success', 'Permission deleted successfully');
        } else {
            return redirect()->back()->with('error', 'Failed to delete permission');
        }
    }





    // Permission Test Controller
    public function testpermission(){
        // dd('Hello');

        $allPermissions = User::with('permission')->where('id',Auth::id())->get();


        foreach ($allPermissions->first()->permission as $item) {
            $allPermissions[] = $item->pivot->permission_id;
        }

        // if(in_array(1,permissisonsId) || in_array(2,$permissionIds)){
        //     Insert/Update
        // }

        if (in_array(15, $allPermissions)) {
            return Inertia::render('Permission/Rolelist', [
                'allPermissions' => $allPermissions
            ]);
        } else {
            dd('Permission Denied');
        }
    }
}
