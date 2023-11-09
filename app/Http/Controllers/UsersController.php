<?php

namespace App\Http\Controllers;

use App\Http\Requests\PermissionRequest;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use App\Models\Permission;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UsersController extends Controller
{
    public function index(){
        $users = User::all();

        // dd($users);
        return Inertia::render('Module/User/Userlist', [
            'permissions' => checkPermissions(),
            'users' => $users
        ]);

    }


    public function create(){
        $currentuser = Auth::id();
        $roles = Role::all();
        $permissions = Permission::all();

        $ids = [];
        foreach ($roles as $role) {
            $ids[] = $role->id;
        }



        $rolePermissionMap = [];
        foreach ($ids as $id) {
            $permissionIDs = DB::table('role_permissions')
                ->where('role_id', $id)
                ->pluck('permission_id')
                ->toArray();

            $rolePermissionMap[$id] = $permissionIDs;
        }

        $rolePermissionMapWithNames = $rolePermissionMap;

        foreach ($rolePermissionMap as $id => $permissionIDs) {
            $permissionsWithNames = [];

            foreach ($permissionIDs as $permissionID) {
                $permission_name = DB::table('permissions')
                    ->where('id', $permissionID)
                    ->value('permission_name');

                $permissionsWithNames[$permissionID] = $permission_name;
            }

            $rolePermissionMapWithNames[$id] = $permissionsWithNames;
        }
        return Inertia::render('Module/User/Createuser', [
            'currentuser' => $currentuser,
            'roles' => $roles,
            'permissions' => $permissions,
            'rolewisepermission' => $rolePermissionMapWithNames,
        ]);
    }




    public function store(Request $request){


        $roleIds = $request->roleBasedPermissions;
        $mergedPermissions = [];
        if ($request->filled('roleBasedPermissions')) {
            foreach ($roleIds as $key => $permission) {
                // Check if $permission is not null and is an array or object
                if (!is_null($permission) && (is_array($permission) || is_object($permission))) {
                    $mergedPermissions = array_merge($mergedPermissions, $permission);
                }
            }
        } else {
            // The 'roleBasedPermissions' key does not exist or is empty in the request
            // Handle the case where there is no data
        }

        $uniquePermissions = array_unique($mergedPermissions);
        $roleBasedPermissions = array_values($uniquePermissions);

        $individualPermissions = $request->selectedPermissions;

        // $allPermssions = array_merge($roleBasedPermissions, $individualPermissions);

        $allPermissions = [];

        if ($roleBasedPermissions !== null) {
            $allPermissions = $roleBasedPermissions;
        }

        if ($individualPermissions !== null) {
            if (empty($allPermissions)) {
                $allPermissions = $individualPermissions;
            } else {
                // Merge the two arrays if both are not empty
                $allPermissions = array_merge($allPermissions, $individualPermissions);
            }
        }



        $allUniquePermssions = array_unique($allPermissions);


        $finalPermissions = array_values($allUniquePermssions);


       if($request->avatar){
            $avatar =  fileUpload($request->avatar, "profile");
        }else{
            $avatar ="";
        }


        $createuser = DB::table('users')->insertGetId([
            'username' => $request->username,
            'first_name' => $request->firstName,
            'last_name' => $request->lastName,
            'email' => $request->email,
            'status' => $request->status,
            'mobile' => $request->mobile,
            'gender' => $request->gender,
            'date_of_birth' => $request->dateOfBirth,
            'avatar' => $avatar,
            'password' => Hash::make($request->password), // Hash the password
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $roleIdskey = [];
        foreach($roleIds as $key=>$roleItems){

            $roleIdskey[] = $key;
        }


        foreach($roleIdskey as $roleId){
            DB::table('user_roles')->insert([
                'user_id' => $createuser,
                'role_id' => $roleId
            ]);
        }


        foreach($finalPermissions as $permissionID){
            DB::table('user_permissions')->insert([
                'user_id' => $createuser,
                'permission_id' => $permissionID
            ]);
        }


        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Attempt to authenticate the user
        $credentials = $request->only('email', 'password');


        $currentuser = Auth::id();

        return redirect()->intended('/admin/users');
    }


    public function edit($userid){

        $user = DB::table('users')->where('id', $userid)->first();
        // $userroles = DB::table('user_roles')->where('user_id', $userid)->get();
        $userpermissions = DB::table('user_permissions')->where('user_id', $userid)->get();

        // Get user roles from the 'user_roles' table
        $userRoles = DB::table('user_roles')->where('user_id', $userid)->get();

        // Initialize an array to store role names


        $roleNames = [];

        // Iterate through the user roles
        foreach ($userRoles as $userRole) {
            // Get the role name from the 'roles' table using the 'role_id'
            $roleName = DB::table('roles')->where('id', $userRole->role_id)->value('role_name');

            // Add the role name and role id to the array
            $roleNames[] = [
                'role_name' => $roleName,
                'role_id' => $userRole->role_id,
            ];
        }

        $user->roleinfo = $roleNames;


        $permissionNames = [];

        // Iterate through the user roles
        foreach ($userpermissions as $userpermission) {
            // Get the role name from the 'roles' table using the 'role_id'
            $permissionName = DB::table('permissions')->where('id', $userpermission->permission_id)->value('permission_name');

            // Add the role name and role id to the array
            $permissionNames[] = [
                'permission_name' => $permissionName,
                'permission_id' => $userpermission->permission_id,
            ];
        }

        $user->permissioninfo = $permissionNames;


        $rolePermissions = DB::table('role_permissions')
            ->select('role_id', 'permission_id')
            ->get();

        $roleBasedPermissions = [];

        foreach ($rolePermissions as $row) {
            $roleId = $row->role_id;
            $permissionId = $row->permission_id;

            // Check if the role exists in the $roleBasedPermissions array, if not, initialize it.
            if (!isset($roleBasedPermissions[$roleId])) {
                $roleBasedPermissions[$roleId] = [];
            }

            // Add the permission_id to the corresponding role array.
            $roleBasedPermissions[$roleId][] = $permissionId;
        }

        $user->rolebasedpermissioninfo = $roleBasedPermissions;


        $usersroleids = DB::table('user_roles')
            ->where('user_id', $userid)
            ->get();
        $roleids = [];
        foreach ($usersroleids as $roleid) {
            $roleids[] = $roleid->role_id;
        }


        // Initialize an array to store the filtered permissions
        $filteredPermissions = [];

        // Iterate through the $roleids array and filter permissions
        foreach ($roleids as $roleId) {
            if (isset($roleBasedPermissions[$roleId])) {
                // Add the permissions for this role to the filteredPermissions array
                $filteredPermissions[$roleId] = $roleBasedPermissions[$roleId];
            }
        }
        $user->hasRoleBasedPermissions = $filteredPermissions;

        //  ================================================================================================

        $currentuser = Auth::id();
        $roles = Role::all();
        $permissions = Permission::all();

        $ids = [];
        foreach ($roles as $role) {
            $ids[] = $role->id;
        }



        $rolePermissionMap = [];
        foreach ($ids as $id) {
            $permissionIDs = DB::table('role_permissions')
                ->where('role_id', $id)
                ->pluck('permission_id')
                ->toArray();

            $rolePermissionMap[$id] = $permissionIDs;
        }

        $rolePermissionMapWithNames = $rolePermissionMap;

        foreach ($rolePermissionMap as $id => $permissionIDs) {
            $permissionsWithNames = [];

            foreach ($permissionIDs as $permissionID) {
                $permission_name = DB::table('permissions')
                    ->where('id', $permissionID)
                    ->value('permission_name');

                $permissionsWithNames[$permissionID] = $permission_name;
            }

            $rolePermissionMapWithNames[$id] = $permissionsWithNames;
        }



        // dd($user);


        return Inertia::render('Module/User/Edituser', [
            'currentuser' => $currentuser,
            'roles' => $roles,
            'permissions' => $permissions,
            'rolewisepermission' => $rolePermissionMapWithNames,
            'user' => $user,
        ]);

    }





    public function update(Request $request){
        // dd($request->all());
        $userid = $request->userid;

        $roleIds = $request->roleBasedPermissions;
        $mergedPermssions = [];
        foreach ($roleIds as $key => $permission) {
            $mergedPermssions = array_merge($mergedPermssions, $permission);
        }
        $uniquePermssions = array_unique($mergedPermssions);


        $roleBasedPermissions = array_values($uniquePermssions);
        $individualPermissions = $request->selectedPermissions;

        $allPermssions = array_merge($roleBasedPermissions, $individualPermissions);
        $allUniquePermssions = array_unique($allPermssions);


        $finalPermissions = array_values($allUniquePermssions);

        $updateuser = DB::table('users')
        ->where('id', $userid)
        ->update([
            'username' => $request->username,
            'first_name' => $request->firstName,
            'last_name' => $request->lastName,
            'email' => $request->email,
            'status' => $request->status,
            'mobile' => $request->mobile,
            'gender' => $request->gender,
            'date_of_birth' => $request->dateOfBirth,
            'avatar' => $request->avatar,
            'password' => Hash::make($request->password), // Hash the password
            'updated_at' => now(),
        ]);


        $roleIdskey = [];

        foreach($roleIds as $key=>$roleItems){
            if(count($roleItems)>0){
                $roleIdskey[] = $key;
            }

        }
        $userRoleExists = DB::table('user_roles')->where('user_id', $userid)->exists();


        if ($userRoleExists) {
            // If the user ID exists, delete old records
            DB::table('user_roles')->where('user_id', $userid)->delete();
        }

        // Insert new records based on the $roleIdskey array
        $newuserRoleRecords = [];
        foreach ($roleIdskey as $roleId) {
            $newuserRoleRecords[] = [
                'user_id' => $userid,
                'role_id' => $roleId,
            ];
        }

        DB::table('user_roles')->insert($newuserRoleRecords);


        $userPermissionExists = DB::table('user_permissions')->where('user_id', $userid)->exists();

        if ($userPermissionExists) {
            // If the user ID exists, delete old records
            DB::table('user_permissions')->where('user_id', $userid)->delete();
        }

        $newUserPermissionRecords = [];
        foreach ($finalPermissions as $permissionID) {
            $newUserPermissionRecords[] = [
                'user_id' => $userid,
                'permission_id' => $permissionID,
            ];
        }

        DB::table('user_permissions')->insert($newUserPermissionRecords);


        $credentials = $request->only('email', 'password');


        $currentuser = Auth::id();


        return redirect()->intended('/admin/users')->with('success', 'User edited successfully');
    }





    public function delete($userid){


        $deletedUserRoles = DB::table('user_roles')->where('user_id', $userid)->delete();

        $deletedUserHasPermission = DB::table('user_permissions')->where('user_id', $userid)->delete();
        $deleted = DB::table('users')->where('id', $userid)->delete();


        if ($deleted) {
            return redirect()->back()->with('success', 'User deleted successfully');
        } else {
            return redirect()->back()->with('error', 'Failed to delete user');
        }
    }





    // Permission Test Controller
    public function testpermission(){
        // dd('Hello');

        $permissions = User::with('permission')->where('id',Auth::id())->get();


        foreach ($permissions->first()->permission as $item) {
            $permissionIds[] = $item->pivot->permission_id;
        }

        // if(in_array(1,permissisonsId) || in_array(2,$permissionIds)){
        //     Insert/Update
        // }

        if (in_array(15, $permissionIds)) {
            return Inertia::render('Users/Rolelist', [
                'permissions' => $permissionIds
            ]);
        } else {
            dd('Permission Denied');
        }
    }



}