<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [

            //Admin Users
            'super-admin',

            'user-view',
            'user-create',
            'user-edit',
            'user-delete', 

            'role-view',
            'role-create',
            'role-edit',
            'role-delete', 

            'permission-view',
            'permission-create',
            'permission-edit',
            'permission-delete', 

            

            // Group Companies
            'g-company-view',
            'g-company-create',
            'g-company-edit',
            'g-company-delete',
            'g-company-report',
            
            // Company
            'company-view',
            'company-create',
            'company-edit',
            'company-delete',
            'company-report', 
            
            // Religion
            'religion-view',
            'religion-create',
            'religion-edit',
            'religion-delete',
            
            // Title
            'title-view',
            'title-create',
            'title-edit',
            'title-delete',
            
            // Bank
            'bank-view',
            'bank-create',
            'bank-edit',
            'bank-delete',
            
            // Working Status
            'working-status-view',
            'working-status-create',
            'working-status-edit',
            'working-status-delete',
            
            // Public holiday
            'public-holiday-view',
            'public-holiday-create',
            'public-holiday-edit',
            'public-holiday-delete',
            
            // Designation
            'designation-view',
            'designation-create',
            'designation-edit',
            'designation-delete',
            
            // Department
            'department-view',
            'department-create',
            'department-edit',
            'department-delete',
            
            // Subdepartment
            'sub-department-view',
            'sub-department-create',
            'sub-department-edit',
            'sub-department-delete',
            
            // Notice
            'notice-view',
            'notice-create',
            'notice-edit',
            'notice-delete',
            
            // Org Calendar
            'org-calendar-view',
            'org-calendar-create',
            'org-calendar-edit',
            'org-calendar-delete',
            
            // Manage Employee
            'employee-view',
            'employee-create',
            'employee-edit',
            'employee-delete',
            
            // Education
            'emp-education-create',
            'emp-education-edit',
            'emp-education-delete',
            'emp-education-view',
            
            // Posting
            'emp-posting-view',
            'emp-posting-create',
            'emp-posting-edit',
            'emp-posting-delete',
            
            // Leave Category
            'leave-category-view',
            'leave-category-create',
            'leave-category-edit',
            'leave-category-delete',
            
            // Leave Application
            'leave-personal-view',
            'leave-personal-create',
            'leave-personal-edit',
            'leave-personal-delete',
            
            'leave-other-view',
            'leave-other-create',
            'leave-other-edit',
            'leave-other-delete',
            
            // Leave Acknowledge
            'leave-acknowledge-view',
            'leave-acknowledge-update',
            
            // Leave Recommend
            'leave-recommend-view',
            'leave-recommend-update',
            
            // Leave Approve
            'leave-approve-view',
            'leave-approve-update',
             
            // Leave Report
            'leave-report-view',
            'leave-report-download',
            
            // Manage Shift
            'shift-view',
            'shift-create',
            'shift-edit',
            'shift-delete',
            
            // Roster Entry
            'roster-view',
            'roster-insert', 
            'roster-update',
            'roster-approve',
            'roster-report',
        ];

        foreach ($permissions as $permission) {
            DB::table('permissions')->insert([
                'permission_name' => $permission,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
