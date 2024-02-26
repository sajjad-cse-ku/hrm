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

class RolesController extends Controller
{
    public function index(){
        $roles = DB::table('roles')->get();

        $result = [];
        foreach ($roles as $role) {
            // Query the role_permissions table to check if the role has associated permissions
            $permissionsForRole = DB::table('role_permissions')
                ->where('role_id', $role->id)
                ->get();
            // If the role has associated permissions, retrieve their names and IDs
            $permissions = [];
            foreach ($permissionsForRole as $permission) {
                $permission_name = DB::table('permissions')
                    ->where('id', $permission->permission_id)
                    ->value('permission_name');

                $permissions[] = [
                    'id' => $permission->permission_id,
                    'permission_name' => $permission_name,
                ];
            }

            // Add the role data to the result array, along with associated permissions (IDs and names)
            $result[] = [
                'id' => $role->id,
                'role_name' => $role->role_name,
                'Permissions' => $permissions,
            ];
        }

        $rolesData = $result;

        return Inertia::render('Module/Role/Rolelist', [
            'roles' => $rolesData
        ]);

    }


    public function create(){
        $allPermissions = Permission::with('module:id,name')->get();
        return Inertia::render('Module/Role/Createrole', [
            'allPermissions' => $allPermissions
        ]);
    }




    public function store(Request $request){

        $request->validate([
            'role_name' => 'required|string|max:255|unique:roles', // Assuming 'roles' is the table name.
            'selectedPermissions' => 'required|array',
            'selectedPermissions.*' => 'required|integer',
        ]);

        // dd($request->all());

        $role_name = $request->input('role_name');

        $roleId = DB::table('roles')->insertGetId([
            'role_name' => $role_name,
            'created_at' => now(),
            'updated_at' => now(),
        ]);


        // Step 3: Insert the Role ID along with selected permissions into the 'role_permissions' pivot table
        $selectedPermissions = $request->input('selectedPermissions');


        $data = [];

        foreach ($selectedPermissions as $permissionId) {
            $data[] = [
                'role_id' => $roleId,
                'permission_id' => $permissionId,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Insert data into the 'role_permissions' pivot table
        DB::table('role_permissions')->insert($data);

        // Redirect back or to a success page
        return redirect()->intended('/admin/roles')->with('success', 'Roles created successfully');
    }


    public function edit($id){
        $permissionIDs = []; // Initialize an array to store the ids
        $role= DB::table('roles')->where('id', $id)->first();

        $allPermissions = Permission::with('module:id,name')->get();

        $currentPermissions = DB::table('role_permissions')
                        ->where('role_id', $role->id)
                        ->get();
        foreach ($currentPermissions as $permission) {
            $permissionIDs[] = $permission->permission_id; // Add each id to the array
        }

        return Inertia::render('Module/Role/Editrole', [
            'role' => $role,
            'allPermissions' => $allPermissions,
            'currentpermission' => $permissionIDs
        ]);


    }


    public function update(Request $request){

        // Step 2: Update the role's name in the 'roles' table
        $id = $request->id;
        $role_name = $request->role_name;

        // dd($id);

        DB::table('roles')
            ->where('id', $id) // Use 'id' instead of 'id'
            ->update([
                'role_name' => $role_name,
                'updated_at' => now(),
            ]);

        // Step 3: Sync the selected permissions in the 'role_permissions' pivot table
        $selectedPermissions = $request->input('selectedPermissions');

        DB::table('role_permissions')
            ->where('role_id', $id)
            ->delete(); // Remove existing permissions for the role

        $data = [];

        foreach ($selectedPermissions as $permissionId) {
            $data[] = [
                'role_id' => $id,
                'permission_id' => $permissionId,
                'created_at' => now(),
                'updated_at' => now(),
            ];


        }

        // Insert data into the 'role_permissions' pivot table
        DB::table('role_permissions')->insert($data);

        // Redirect back or to a success page
        return redirect()->intended('/admin/roles')->with('success', 'Role updated successfully');
    }





    public function delete($id){
        $deletedRolesHasPermission = DB::table('role_permissions')->where('role_id', $id)->delete();
        $deleted = DB::table('roles')->where('id', $id)->delete();
        if ($deleted) {
            return redirect()->back()->with('success', 'Role deleted successfully');
        } else {
            return redirect()->back()->with('error', 'Failed to delete role');
        }
    }


}
