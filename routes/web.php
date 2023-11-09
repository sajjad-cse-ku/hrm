<?php

use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\BangladeshController;
use App\Http\Controllers\BankController;
use App\Http\Controllers\CommonController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\DesignationController;
use App\Http\Controllers\DutyLocationController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\EmployeeEducationController;
use App\Http\Controllers\EmployeePostingController;
use App\Http\Controllers\LateApplyController;
use App\Http\Controllers\LeaveApplicationController;
use App\Http\Controllers\LeaveCategoryController;
use App\Http\Controllers\LeaveRegisterController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GroupCompanyController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\NoticeController;
use App\Http\Controllers\OrgCalenderController;
use App\Http\Controllers\PdfReportController;
use App\Http\Controllers\PermissionsController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\PublicHolidayController;
use App\Http\Controllers\PunchDetailsController;
use App\Http\Controllers\ReligionsController;
use App\Http\Controllers\RolesController;
use App\Http\Controllers\RosterController;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\ShiftController;
use App\Http\Controllers\SiteSettingsController;
use App\Http\Controllers\SmsController;
use App\Http\Controllers\TaskManagementController;
use App\Http\Controllers\TitleController;
use App\Http\Controllers\UserProfileController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\WorkingStatusController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Models\Permission;
use App\Models\User;


use Illuminate\Http\Request;
Route::get('/', function () {
//    return $current_time = date('Y-m-d H:i:s');
    return redirect()->route('login');
});
Route::get('/test-table',[\App\Http\Controllers\TestController::class,'testTable'])->name('test.table');
Route::get('/test-table-data',[\App\Http\Controllers\TestController::class,'testTableData'])->name('test.table.data');

Route::get('/demo',[\App\Http\Controllers\TestController::class,'demoTable'])->name('demo.table');

Route::get('/login',[LoginController::class,'login'])->name('login');
Route::post('/login',[LoginController::class,'loginPost'])->name('login.post');

Route::group(['prefix' => 'admin','middleware' => ['auth'],'as' =>'admin.'],function() {

    Route::get('dashboard', [DashboardController::class, 'adminDashboard'])->name('dashboard');
    Route::get('logout', [LoginController::class, 'logout'])->name('logout');
    Route::get('get-punch-details', [PunchDetailsController::class, 'getPunchedData'])->name('get.punch.machine.date');
    Route::get('get-thana/{district}', [CommonController::class, 'getThana'])->name('get.thana');
    Route::get('get-post-code/{post_code}', [CommonController::class, 'getPostCode'])->name('get.post.code');

    Route::get('section-select/{id}', [CommonController::class, 'sectionSelect'])->name('section.select');
    Route::get('get-leave-data/{id}', [CommonController::class, 'getLeaveData'])->name('get.leave.data');
    Route::get('get-eligibility-leave-balance/{leave_id}/{id}', [CommonController::class, 'getEligibilityLeaveBalance'])->name('get.leave.data');

    Route::get('set-today-attendance/{date}', [CommonController::class, 'setTodayAttendance'])->name('set.today.attendance');

    Route::get('attendance', [AttendanceController::class, 'attendance'])->name('attendance');


    Route::group(['prefix' => 'site-settings' ],function (){
        Route::get('', [SiteSettingsController::class, 'siteSettings'])->name('site.settings');
        Route::post('/update', [SiteSettingsController::class, 'siteSettingsUpdate'])->name('site.settings.update');
    });

    Route::group(['prefix' => 'user' ],function (){
        Route::get('/profile', [UserProfileController::class, 'userProfile'])->name('user.profile');
        Route::post('/profile/update', [UserProfileController::class, 'userProfileUpdate'])->name('user.profile.update');
        Route::post('/profile/change-password', [UserProfileController::class, 'userProfileChangePassword'])->name('user.profile.update');

    });


    // Users
    Route::group(['prefix' => 'users' ],function (){
        Route::get('/', [UsersController::class, 'index'])->name('users.index');
        Route::get('/create', [UsersController::class, 'create'])->name('users.create');
        Route::post('/store', [UsersController::class, 'store'])->name('users.store');
        Route::get('/{userid}/edit', [UsersController::class, 'edit'])->name('users.edit');
        Route::post('/update', [UsersController::class, 'update'])->name('users.update');
        Route::get('/{userid}/delete', [UsersController::class, 'delete'])->name('users.delete');
    });
    // Roles
    // admin/roles/store
    Route::group(['prefix' => 'roles' ],function (){
        Route::get('/', [RolesController::class, 'index'])->name('roles.index');
        Route::get('/create', [RolesController::class, 'create'])->name('roles.create');
        Route::post('/store', [RolesController::class, 'store'])->name('roles.store');
        Route::get('/{userid}/edit', [RolesController::class, 'edit'])->name('roles.edit');
        Route::post('/update', [RolesController::class, 'update'])->name('roles.update');
        Route::get('/{id}/delete', [RolesController::class, 'delete'])->name('users.delete');
    });
    // Permission
    Route::group(['prefix' => 'permissions' ],function (){
        Route::get('/', [PermissionsController::class, 'index'])->name('permissions.index');
        Route::get('/create', [PermissionsController::class, 'create'])->name('permissions.create');
        Route::post('/store', [PermissionsController::class, 'store'])->name('permissions.store');
        Route::get('/{id}/edit', [PermissionsController::class, 'edit'])->name('permissions.edit');
        Route::post('/update', [PermissionsController::class, 'update'])->name('permissions.update');
        Route::get('/{id}/delete', [PermissionsController::class, 'delete'])->name('permissions.delete');
    });


    Route::group(['prefix' => 'modules' ],function (){
        Route::get('', [ModuleController::class, 'index'])->name('modules');
        Route::get('/create', [ModuleController::class, 'create'])->name('modules.create');
        Route::post('/store', [ModuleController::class, 'store'])->name('modules.store');
        Route::get('/edit/{id}', [ModuleController::class, 'edit'])->name('modules.edit');
        Route::post('/update', [ModuleController::class, 'update'])->name('modules.update');
        Route::get('/delete/{id}', [ModuleController::class, 'delete'])->name('modules.delete');
        Route::get('/status/{id}', [ModuleController::class, 'status'])->name('modules.status');
    });

    Route::group(['prefix' => 'project' ],function (){
        Route::get('', [ProjectController::class, 'index'])->name('project');
        Route::get('/create', [ProjectController::class, 'create'])->name('project.create');
        Route::post('/store', [ProjectController::class, 'store'])->name('project.store');
        Route::get('/edit/{id}', [ProjectController::class, 'edit'])->name('project.edit');
        Route::post('/update', [ProjectController::class, 'update'])->name('project.update');
        Route::get('/delete/{id}', [ProjectController::class, 'delete'])->name('project.delete');
        Route::get('/status/{id}', [ProjectController::class, 'status'])->name('project.status');
    });


    Route::group(['prefix' => 'group-companies' ],function (){
        Route::get('', [GroupCompanyController::class, 'index'])->name('group.company');
        Route::get('/create', [GroupCompanyController::class, 'create'])->name('group.company.create');
        Route::post('/store', [GroupCompanyController::class, 'store'])->name('group.company.store');
        Route::get('/edit/{id}', [GroupCompanyController::class, 'edit'])->name('group.company.edit');
        Route::post('/update', [GroupCompanyController::class, 'update'])->name('group.company.update');
        Route::get('/delete/{id}', [GroupCompanyController::class, 'delete'])->name('group.company.delete');
        Route::get('/status/{id}', [GroupCompanyController::class, 'status'])->name('group.company.status');
    });

    Route::group(['prefix' => 'companies' ],function (){
        Route::get('', [CompanyController::class, 'index'])->name('company');
        Route::get('/create', [CompanyController::class, 'create'])->name('company.create');
        Route::post('/store', [CompanyController::class, 'store'])->name('company.store');
        Route::get('/edit/{id}', [CompanyController::class, 'edit'])->name('company.edit');
        Route::post('/update', [CompanyController::class, 'update'])->name('company.update');
        Route::get('/delete/{id}', [CompanyController::class, 'delete'])->name('company.delete');
        Route::get('/status/{id}', [CompanyController::class, 'status'])->name('company.status');
    });

    Route::group(['prefix' => 'religions' ],function (){
        Route::get('', [ReligionsController::class, 'index'])->name('religions');
        Route::get('/create', [ReligionsController::class, 'create'])->name('religions.create');
        Route::post('/store', [ReligionsController::class, 'store'])->name('religions.store');
        Route::get('/edit/{id}', [ReligionsController::class, 'edit'])->name('religions.edit');
        Route::post('/update', [ReligionsController::class, 'update'])->name('religions.update');
        Route::get('/delete/{id}', [ReligionsController::class, 'delete'])->name('religions.delete');
        Route::get('/status/{id}', [ReligionsController::class, 'status'])->name('religions.status');
    });
    Route::group(['prefix' => 'title' ],function (){
        Route::get('', [TitleController::class, 'index'])->name('title');
        Route::get('/create', [TitleController::class, 'create'])->name('title.create');
        Route::post('/store', [TitleController::class, 'store'])->name('title.store');
        Route::get('/edit/{id}', [TitleController::class, 'edit'])->name('title.edit');
        Route::post('/update', [TitleController::class, 'update'])->name('title.update');
        Route::get('/delete/{id}', [TitleController::class, 'delete'])->name('title.delete');
        Route::get('/status/{id}', [TitleController::class, 'status'])->name('title.status');
    });
    Route::group(['prefix' => 'bank' ],function (){
        Route::get('', [BankController::class, 'index'])->name('bank');
        Route::get('/create', [BankController::class, 'create'])->name('bank.create');
        Route::post('/store', [BankController::class, 'store'])->name('bank.store');
        Route::get('/edit/{id}', [BankController::class, 'edit'])->name('bank.edit');
        Route::post('/update', [BankController::class, 'update'])->name('bank.update');
        Route::get('/delete/{id}', [BankController::class, 'delete'])->name('bank.delete');
        Route::get('/status/{id}', [BankController::class, 'status'])->name('bank.status');
    });
    Route::group(['prefix' => 'working_status' ],function (){
        Route::get('', [WorkingStatusController::class, 'index'])->name('working_status');
        Route::get('/create', [WorkingStatusController::class, 'create'])->name('working_status.create');
        Route::post('/store', [WorkingStatusController::class, 'store'])->name('working_status.store');
        Route::get('/edit/{id}', [WorkingStatusController::class, 'edit'])->name('working_status.edit');
        Route::post('/update', [WorkingStatusController::class, 'update'])->name('working_status.update');
        Route::get('/delete/{id}', [WorkingStatusController::class, 'delete'])->name('working_status.delete');
        Route::get('/status/{id}', [WorkingStatusController::class, 'status'])->name('working_status.status');
    });

    Route::group(['prefix' => 'bangladesh' ],function (){
        Route::get('', [BangladeshController::class, 'index'])->name('bangladesh');
        Route::get('/create', [BangladeshController::class, 'create'])->name('bangladesh.create');
        Route::post('/store', [BangladeshController::class, 'store'])->name('bangladesh.store');
        Route::get('/edit/{id}', [BangladeshController::class, 'edit'])->name('bangladesh.edit');
        Route::post('/update', [BangladeshController::class, 'update'])->name('bangladesh.update');
        Route::get('/delete/{id}', [BangladeshController::class, 'delete'])->name('bangladesh.delete');
        Route::get('/status/{id}', [BangladeshController::class, 'status'])->name('bangladesh.status');
    });

    Route::group(['prefix' => 'duty_locations' ],function (){
        Route::get('', [DutyLocationController::class, 'index'])->name('duty_locations');
        Route::get('/create', [DutyLocationController::class, 'create'])->name('duty_locations.create');
        Route::post('/store', [DutyLocationController::class, 'store'])->name('duty_locations.store');
        Route::get('/edit/{id}', [DutyLocationController::class, 'edit'])->name('duty_locations.edit');
        Route::post('/update', [DutyLocationController::class, 'update'])->name('duty_locations.update');
        Route::get('/delete/{id}', [DutyLocationController::class, 'delete'])->name('duty_locations.delete');
        Route::get('/status/{id}', [DutyLocationController::class, 'status'])->name('duty_locations.status');
    });

    Route::group(['prefix' => 'public_holiday' ],function (){
        Route::get('', [PublicHolidayController::class, 'index'])->name('public_holiday');
        Route::get('/create', [PublicHolidayController::class, 'create'])->name('public_holiday.create');
        Route::post('/store', [PublicHolidayController::class, 'store'])->name('public_holiday.store');
        Route::get('/edit/{id}', [PublicHolidayController::class, 'edit'])->name('public_holiday.edit');
        Route::post('/update', [PublicHolidayController::class, 'update'])->name('public_holiday.update');
        Route::get('/delete/{id}', [PublicHolidayController::class, 'delete'])->name('public_holiday.delete');
        Route::get('/status/{id}', [DepartmentController::class, 'status'])->name('public_holiday.status');
    });

    Route::group(['prefix' => 'designation' ],function (){
        Route::get('', [DesignationController::class, 'index'])->name('designation');
        Route::get('/create', [DesignationController::class, 'create'])->name('designation.create');
        Route::post('/store', [DesignationController::class, 'store'])->name('designation.store');
        Route::get('/edit/{id}', [DesignationController::class, 'edit'])->name('designation.edit');
        Route::post('/update', [DesignationController::class, 'update'])->name('designation.update');
        Route::get('/delete/{id}', [DesignationController::class, 'delete'])->name('designation.delete');
        Route::get('/status/{id}', [DepartmentController::class, 'status'])->name('designation.status');
    });

    Route::group(['prefix' => 'department' ],function (){
        Route::get('', [DepartmentController::class, 'index'])->name('department');
        Route::get('/create', [DepartmentController::class, 'create'])->name('department.create');
        Route::post('/store', [DepartmentController::class, 'store'])->name('department.store');
        Route::get('/edit/{id}', [DepartmentController::class, 'edit'])->name('department.edit');
        Route::post('/update', [DepartmentController::class, 'update'])->name('department.update');
        Route::get('/delete/{id}', [DepartmentController::class, 'delete'])->name('department.delete');
        Route::get('/status/{id}', [DepartmentController::class, 'status'])->name('department.status');
    });

    Route::group(['prefix' => 'section' ],function (){
        Route::get('', [SectionController::class, 'index'])->name('section');
        Route::get('/create', [SectionController::class, 'create'])->name('section.create');
        Route::post('/store', [SectionController::class, 'store'])->name('section.store');
        Route::get('/edit/{id}', [SectionController::class, 'edit'])->name('section.edit');
        Route::post('/update', [SectionController::class, 'update'])->name('section.update');
        Route::get('/delete/{id}', [SectionController::class, 'delete'])->name('section.delete');
        Route::get('/status/{id}', [SectionController::class, 'status'])->name('section.status');
    });

    Route::group(['prefix' => 'notice' ],function (){
        Route::get('', [NoticeController::class, 'index'])->name('notice');
        Route::get('view/{id}', [NoticeController::class, 'view'])->name('view');
        Route::get('/create', [NoticeController::class, 'create'])->name('notice.create');
        Route::post('/store', [NoticeController::class, 'store'])->name('notice.store');
        Route::get('/edit/{id}', [NoticeController::class, 'edit'])->name('notice.edit');
        Route::post('/update', [NoticeController::class, 'update'])->name('notice.update');
        Route::get('/delete/{id}', [NoticeController::class, 'delete'])->name('notice.delete');
        Route::get('/status/{id}', [NoticeController::class, 'status'])->name('notice.status');
    });

    Route::group(['prefix' => 'employee' ],function (){
        Route::get('', [EmployeeController::class, 'index'])->name('employee');
        Route::get('/create', [EmployeeController::class, 'create'])->name('employee.create');
        Route::post('/store', [EmployeeController::class, 'store'])->name('employee.store');
        Route::get('/edit/{id}', [EmployeeController::class, 'edit'])->name('employee.edit');
        Route::post('/update', [EmployeeController::class, 'update'])->name('employee.update');
        Route::get('/delete/{id}', [EmployeeController::class, 'delete'])->name('employee.delete');
        Route::get('/status/{id}', [EmployeeController::class, 'status'])->name('employee.status');
    });
    Route::group(['prefix' => 'leave_category' ],function (){
        Route::get('', [LeaveCategoryController::class, 'index'])->name('leave_category');
        Route::get('/create', [LeaveCategoryController::class, 'create'])->name('leave_category.create');
        Route::post('/store', [LeaveCategoryController::class, 'store'])->name('leave_category.store');
        Route::get('/edit/{id}', [LeaveCategoryController::class, 'edit'])->name('leave_category.edit');
        Route::post('/update', [LeaveCategoryController::class, 'update'])->name('leave_category.update');
        Route::get('/delete/{id}', [LeaveCategoryController::class, 'delete'])->name('leave_category.delete');
        Route::get('/status/{id}', [LeaveCategoryController::class, 'status'])->name('leave_category.status');
    });

    Route::group(['prefix' => 'leave_application' ],function (){
        Route::get('', [LeaveApplicationController::class, 'index'])->name('leave_application');
        Route::get('/approved/{id}', [LeaveApplicationController::class, 'approved'])->name('leave_application.approved.user');
        Route::get('/rejected/{id}', [LeaveApplicationController::class, 'rejected'])->name('leave_application.rejected.user');


        Route::get('/approved-by-alternate/{id}', [LeaveApplicationController::class, 'approvedByAlternate'])->name('leave_application.approved.by.alternate');
        Route::get('/rejected-by-alternate/{id}', [LeaveApplicationController::class, 'rejectedByAlternate'])->name('leave_application.rejected.by.alternate');

        Route::get('/approved-by-report/{id}', [LeaveApplicationController::class, 'approvedByReportTo'])->name('leave_application.approved.by.report');
        Route::get('/rejected-by-report/{id}', [LeaveApplicationController::class, 'rejectedByReportTo'])->name('leave_application.rejected.by.report');

        Route::get('/create', [LeaveApplicationController::class, 'create'])->name('leave_application.create');
        Route::post('/store', [LeaveApplicationController::class, 'store'])->name('leave_application.store');
        Route::get('/edit/{id}', [LeaveApplicationController::class, 'edit'])->name('leave_application.edit');
        Route::post('/update', [LeaveApplicationController::class, 'update'])->name('leave_application.update');
        Route::get('/delete/{id}', [LeaveApplicationController::class, 'delete'])->name('leave_application.delete');
        Route::get('/status/{id}', [LeaveApplicationController::class, 'status'])->name('leave_application.status');
        Route::get('/apply/{id}/{leaveId?}', [LeaveApplicationController::class, 'apply'])->name('leave_application.apply');
        Route::post('/apply/process', [LeaveApplicationController::class, 'applyProcess'])->name('leave_application.apply.process');

        Route::get('/requested-user', [LeaveApplicationController::class, 'requestedUser'])->name('leave_application.requested.user');
        Route::get('/leave-acknowledge', [LeaveApplicationController::class, 'leaveAcknowledge'])->name('leave_application.leave.acknowledge');
        Route::get('/leave-report-to', [LeaveApplicationController::class, 'leaveReportTo'])->name('leave_application.leave.report.to');

        Route::get('/direct-leave-approve', [LeaveApplicationController::class, 'directLeaveApprove'])->name('direct.leave.approve');
        Route::post('/direct-leave-approve/apply', [LeaveApplicationController::class, 'directLeaveApproveApply'])->name('direct.leave.approve.apply');

    });
    Route::get('/get-user/leave-date/{id}', [LeaveApplicationController::class, 'getUserLeaveDate'])->name('uu.leave.application');
    Route::group(['prefix' => 'employee_education' ],function (){
        Route::get('{id}', [EmployeeEducationController::class, 'index'])->name('employee_education');
        Route::get('/create/{id}', [EmployeeEducationController::class, 'create'])->name('employee_education.create');
        Route::post('/store', [EmployeeEducationController::class, 'store'])->name('employee_education.store');
        Route::get('/edit/{id}', [EmployeeEducationController::class, 'edit'])->name('employee_education.edit');
        Route::post('/update', [EmployeeEducationController::class, 'update'])->name('employee_education.update');
        Route::get('/delete/{id}', [EmployeeEducationController::class, 'delete'])->name('employee_education.delete');
        Route::get('/status/{id}', [EmployeeEducationController::class, 'status'])->name('employee_education.status');
    });

    Route::group(['prefix' => 'employee_posting' ],function (){
        Route::get('{id}', [EmployeePostingController::class, 'index'])->name('employee_posting');
        Route::get('/create/{id}', [EmployeePostingController::class, 'create'])->name('employee_posting.create');
        Route::post('/store', [EmployeePostingController::class, 'store'])->name('employee_posting.store');
        Route::get('/edit/{id}', [EmployeePostingController::class, 'edit'])->name('employee_posting.edit');
        Route::post('/update', [EmployeePostingController::class, 'update'])->name('employee_posting.update');
        Route::get('/delete/{id}', [EmployeePostingController::class, 'delete'])->name('employee_posting.delete');
        Route::get('/status/{id}', [EmployeePostingController::class, 'status'])->name('employee_posting.status');
    });

    Route::group(['prefix' => 'org_calender' ],function (){
        Route::get('', [OrgCalenderController::class, 'index'])->name('org_calender');
        Route::get('/create/', [OrgCalenderController::class, 'create'])->name('org_calender.create');
        Route::post('/store', [OrgCalenderController::class, 'store'])->name('org_calender.store');
        Route::get('/edit/{id}', [OrgCalenderController::class, 'edit'])->name('org_calender.edit');
        Route::post('/update', [OrgCalenderController::class, 'update'])->name('org_calender.update');
        Route::get('/delete/{id}', [OrgCalenderController::class, 'delete'])->name('org_calender.delete');
        Route::get('/status/{id}', [OrgCalenderController::class, 'status'])->name('org_calender.status');
    });


    Route::group(['prefix' => 'shift' ],function (){
        Route::get('', [ShiftController::class, 'index'])->name('shift');
        Route::get('/create', [ShiftController::class, 'create'])->name('shift.create');
        Route::post('/store', [ShiftController::class, 'store'])->name('shift.store');
        Route::get('/edit/{id}', [ShiftController::class, 'edit'])->name('shift.edit');
        Route::post('/update', [ShiftController::class, 'update'])->name('shift.update');
        Route::get('/delete/{id}', [ShiftController::class, 'delete'])->name('shift.delete');
        Route::get('/status/{id}', [ShiftController::class, 'status'])->name('shift.status');
    });

    Route::group(['prefix' => 'sms' ],function (){
        Route::get('', [SmsController::class, 'index'])->name('sms');
        Route::get('/create', [SmsController::class, 'create'])->name('sms.create');
        Route::post('/store', [SmsController::class, 'store'])->name('sms.store');
        Route::get('/edit/{id}', [SmsController::class, 'edit'])->name('sms.edit');
        Route::post('/update', [SmsController::class, 'update'])->name('sms.update');
        Route::get('/delete/{id}', [SmsController::class, 'delete'])->name('sms.delete');
        Route::get('/status/{id}', [SmsController::class, 'status'])->name('sms.status');
    });

    Route::get('roster', [RosterController::class, 'index'])->name('roster');
    Route::get('roster/update', [RosterController::class, 'update'])->name('roster.update');
    Route::get('roster/approved', [RosterController::class, 'approved'])->name('roster.approved');
    Route::post('roster/approved-by-id', [RosterController::class, 'approvedById'])->name('roster.approved.by.id');
    Route::post('all-roster', [RosterController::class, 'allRoster'])->name('all.roster');
    Route::post('single-roster', [RosterController::class, 'singleRoster'])->name('single.roster');

    Route::get('today-attendance', [AttendanceController::class, 'todayAttendance'])->name('today.attendance');

    Route::group(['prefix' => 'attendance' ],function (){
        Route::get('/report', [AttendanceController::class, 'attendanceReport'])->name('report');
    });

    Route::get('all-or-department-wise/attendance-report', [AttendanceController::class, 'allOrDepartWise'])->name('all.or.depart.wise');
    Route::get('get-date-wise-attendance', [AttendanceController::class, 'getDateWiseAttendance'])->name('get.date.wise.attendance');


    Route::get('manual-attendance', [AttendanceController::class, 'manualAttendance'])->name('manual.attendance');
    Route::post('manual-attendance/update', [AttendanceController::class, 'manualAttendanceUpdate'])->name('manual.attendance');

    Route::get('home-office', [AttendanceController::class, 'homeOffice'])->name('home.office');
    Route::get('home-office-attendance', [AttendanceController::class, 'homeOfficeAttendance'])->name('home.office.attendance');
    Route::post('home-office-attendance/save', [AttendanceController::class, 'homeOfficeAttendanceSave'])->name('home.office.attendance.save');
    Route::get('my-attendance-report/{id}', [AttendanceController::class, 'myAttendanceReport'])->name('my.attendance.report');

    Route::get('manual-comment', [AttendanceController::class, 'manualComment'])->name('manual.comment');
    Route::post('manual-comment/update', [AttendanceController::class, 'manualCommentUpdate'])->name('manual.comment.update');

    Route::get('late-apply', [lateApplyController::class, 'lateApply'])->name('late.apply');
    Route::get('apply-list', [lateApplyController::class, 'applyList'])->name('apply.list');
    Route::post('late-apply/send', [lateApplyController::class, 'lateApplySend'])->name('late.apply.send');
    Route::get('late-list', [lateApplyController::class, 'lateList'])->name('late.list');
    Route::get('get-late-user-data/{id}', [lateApplyController::class, 'getLateUserData'])->name('get.late.user.data');
    Route::get('late-approved/{id}', [lateApplyController::class, 'lateApproved'])->name('late.approve');
    Route::get('late-declined/{id}', [lateApplyController::class, 'lateDeclined'])->name('late.declined');
    Route::get('late-apply/another-person/{id}', [LateApplyController::class, 'getUserLateApply'])->name('uu.late.apply');
    Route::get('custom-late-allow', [lateApplyController::class, 'customLateAllow'])->name('custom.late.allow');
    Route::get('custom-late-allow-send', [lateApplyController::class, 'customLateAllowSend'])->name('custom.late.allow.send');


    Route::group(['prefix' => 'task' ],function (){
        Route::get('', [TaskManagementController::class, 'index'])->name('task');
        Route::get('/create', [TaskManagementController::class, 'create'])->name('task.create');
        Route::post('/store', [TaskManagementController::class, 'store'])->name('task.store');
        Route::get('/edit/{id}', [TaskManagementController::class, 'edit'])->name('task.edit');
        Route::post('/update', [TaskManagementController::class, 'update'])->name('task.update');
        Route::get('/view_my_task/{id}', [TaskManagementController::class, 'viewMyTask'])->name('view_my_task.update');
        Route::post('/update_my_task', [TaskManagementController::class, 'updateMyTask'])->name('task.update_my_task');
        Route::get('/review/{id}', [TaskManagementController::class, 'review'])->name('task.review');
        Route::post('/update_review_task', [TaskManagementController::class, 'update_review_task'])->name('task.update_review_task');

        Route::get('/assign-task', [TaskManagementController::class, 'assignTask'])->name('task.assign');
        Route::get('/my-task', [TaskManagementController::class, 'myTask'])->name('my.task');

        Route::get('/get-created-task', [TaskManagementController::class, 'getCreatedTask'])->name('get.created.task');
        Route::get('/get-processing-task', [TaskManagementController::class, 'getProcessingTask'])->name('get.processing.task');
        Route::get('/get-review-task', [TaskManagementController::class, 'getReviewTask'])->name('get.review.task');
        Route::get('/get-done-task', [TaskManagementController::class, 'getDoneTask'])->name('get.done.task');

        Route::get('/get-created-myTask', [TaskManagementController::class, 'getCreatedMyTask'])->name('get.created.myTask');
        Route::get('/get-processing-myTask', [TaskManagementController::class, 'getProcessingMyTask'])->name('get.processing.myTask');
        Route::get('/get-review-myTask', [TaskManagementController::class, 'getReviewMyTask'])->name('get.review.myTask');
        Route::get('/get-done-myTask', [TaskManagementController::class, 'getDoneMyTask'])->name('get.done.myTask');

    });



    //    Report Generate
    Route::get('/employee-attendance/date-range-wise', [PdfReportController::class, 'employeeAttendanceDateRangeWise'])->name('employee.attendance.date.range.wise');
    Route::get('/employee-attendance/date-range-wise-report', [PdfReportController::class, 'employeeAttendanceDateRangeWiseReport'])->name('employee.attendance.date.range.wise.report');

    Route::get('/department-attendance/date-range-wise', [PdfReportController::class, 'departmentAttendanceDateRangeWise'])->name('department.attendance.date.range.wise');
    Route::get('/department-attendance/date-range-wise-report', [PdfReportController::class, 'departmentAttendanceDateRangeWiseReport'])->name('department.attendance.date.range.wise.report');

    Route::get('/all-emp-attendance/date-range-wise', [PdfReportController::class, 'allEmployeetAttendanceDateRangeWise'])->name('all.emp.attendance.date.range.wise');
    Route::get('/all-emp-attendance/date-range-wise-report', [PdfReportController::class, 'allEmployeeAttendanceDateRangeWiseReport'])->name('all.emp.attendance.date.range.wise.report');

    Route::get('/punch-details/date-range-wise', [PdfReportController::class, 'punchDetailsDateRangeWise'])->name('punch.details.attendance.date.range.wise');
    Route::get('/punch-details/date-range-wise-report', [PdfReportController::class, 'punchDetailsDateRangeWiseReport'])->name('punch.details.attendance.date.range.wise.report');

    Route::get('/late-flag-report', [PdfReportController::class, 'lateFlagReport'])->name('late.flag.report');

    Route::get('/all-type-employee', [PdfReportController::class, 'allTypeEmployee'])->name('all.type.employee');
    Route::get('/all-type-employee-report', [PdfReportController::class, 'allTypeEmployeeReport'])->name('all.type.employee.report');

    Route::get('/emp-leave', [PdfReportController::class, 'employeeLeaveApplication'])->name('employee.leave');
    Route::get('/emp-leave-report', [PdfReportController::class, 'employeeLeaveApplicationReport'])->name('employee.leave.report');

    Route::get('/all-or-dept-leave', [PdfReportController::class, 'allOrDeptLeaveApplication'])->name('all.or.dept.leave');
    Route::get('/all-or-dept-leave-report', [PdfReportController::class, 'allOrDeptLeaveApplicationReport'])->name('all.or.dept.leave.report');

    Route::get('/employee-leave-details-month-year', [PdfReportController::class, 'employeeLeaveDetailsMonthYear'])->name('employee.leave.details.month.year');
    Route::get('/employee-leave-details-month-year-report', [PdfReportController::class, 'employeeLeaveDetailsMonthYearReport'])->name('employee.leave.details.month.year.report');

});

