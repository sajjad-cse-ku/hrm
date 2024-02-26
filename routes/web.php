<?php

use App\Http\Controllers\ArearsController;
use App\Http\Controllers\AssetAssignedController;
use App\Http\Controllers\AssetController;
use App\Http\Controllers\AssetTypeController;
use App\Http\Controllers\AssignedRosterEmployeeController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\BangladeshController;
use App\Http\Controllers\BankController;
use App\Http\Controllers\BreakTimeController;
use App\Http\Controllers\CommonController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\DesignationController;
use App\Http\Controllers\DutyLocationController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\EmployeeEducationController;
use App\Http\Controllers\EmployeePostingController;
use App\Http\Controllers\EmployeePromotionController;
use App\Http\Controllers\LateApplyController;
use App\Http\Controllers\LeaveApplicationController;
use App\Http\Controllers\LeaveCategoryController;
use App\Http\Controllers\LeaveRegisterController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GroupCompanyController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\MonthlySalaryController;
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
use App\Http\Controllers\SalarySetupController;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\ShiftController;
use App\Http\Controllers\SiteSettingsController;
use App\Http\Controllers\SmsController;
use App\Http\Controllers\TaskManagementController;
use App\Http\Controllers\TitleController;
use App\Http\Controllers\UserProfileController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\WorkingStatusController;
use Illuminate\Support\Facades\Route;
use Carbon\Carbon;
use Inertia\Inertia;

//4361ee
Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/taskdemo', function () {
    return Inertia::render('Module/TaskDemo/App');
});

Route::get('/test-chat-bot', function () {
    $products = [
        ["id" => 1, "name" => "Product 1", "price" => 19.99, "category" => "Electronics"],
        ["id" => 2, "name" => "Product 2", "price" => 29.99, "category" => "Clothing"],
        ["id" => 3, "name" => "Product 3", "price" => 39.99, "category" => "Home & Kitchen"],
        ["id" => 4, "name" => "Product 4", "price" => 49.99, "category" => "Sports"],
        ["id" => 5, "name" => "Product 5", "price" => 59.99, "category" => "Beauty"],
        ["id" => 6, "name" => "Product 6", "price" => 69.99, "category" => "Toys"],
        ["id" => 7, "name" => "Product 7", "price" => 79.99, "category" => "Books"],
        ["id" => 8, "name" => "Product 8", "price" => 89.99, "category" => "Furniture"],
        ["id" => 9, "name" => "Product 9", "price" => 99.99, "category" => "Jewelry"],
        ["id" => 10, "name" => "Product 10", "price" => 109.99, "category" => "Health & Wellness"],
    ];

    return $products;
});


Route::get('/get-punch-data-cron-ll',[\App\Http\Controllers\AttendanceCronController::class,'handle']);

Route::get('/test-table',[\App\Http\Controllers\TestController::class,'testTable'])->name('test.table');
Route::get('/test-table-data',[\App\Http\Controllers\TestController::class,'testTableData'])->name('test.table.data');
Route::get('/demo',[\App\Http\Controllers\TestController::class,'demoTable'])->name('demo.table');
Route::get('/login',[LoginController::class,'login'])->name('login');
Route::post('/login',[LoginController::class,'loginPost'])->name('login.post');

Route::group(['prefix' => 'admin','middleware' => ['auth'],'as' =>'admin.'],function() {

    Route::get('/error',[DashboardController::class,'error'])->name('error');
    Route::get('dashboard', [DashboardController::class, 'adminDashboard'])->name('dashboard');
    Route::get('logout', [LoginController::class, 'logout'])->name('logout');
    Route::get('get-punch-details', [PunchDetailsController::class, 'getPunchedData'])->name('get.punch.machine.date');
    Route::get('get-breaking-time/{id}', [BreakTimeController::class, 'getBreakingTime'])->name('get.breaking.time');
    Route::get('get-thana/{district}', [CommonController::class, 'getThana'])->name('get.thana');
    Route::get('get-post-code/{post_code}', [CommonController::class, 'getPostCode'])->name('get.post.code');

    Route::get('section-select/{id}', [CommonController::class, 'sectionSelect'])->name('section.select');
    Route::get('get-leave-data/{id}', [CommonController::class, 'getLeaveData'])->name('get.leave.data');
    Route::get('get-eligibility-leave-balance/{leave_id}/{id}', [CommonController::class, 'getEligibilityLeaveBalance'])->name('get.leave.data');

    Route::get('set-today-attendance/{date}', [CommonController::class, 'setTodayAttendance'])->name('set.today.attendance');

    Route::get('attendance', [AttendanceController::class, 'attendance'])->name('attendance');

    Route::get('generate-monthly-salary', [MonthlySalaryController::class, 'monthlySalaryForm'])->name('monthly.salary.form');
    Route::get('generate-monthly-salary-data', [MonthlySalaryController::class, 'monthlySalary'])->name('monthly.salary');
    Route::get('month-salary', [MonthlySalaryController::class, 'monthSalary'])->name('month.salary');
    Route::get('/edit-monthly-salary/{id}', [MonthlySalaryController::class, 'editMonthSalary'])->name('edit.month.salary');
    Route::post('/edit-monthly-salary-update', [MonthlySalaryController::class, 'editMonthSalaryUpdate'])->name('edit.month.salary');

    Route::get('/salary-held-report', [MonthlySalaryController::class, 'salaryHeldReport'])->name('salary.held.report');
    Route::get('/get-salary-held-data/{year}/{month}', [MonthlySalaryController::class, 'getSalaryHeldData'])->name('salary.held.report.data');
    Route::get('/salary-held-export/{year}/{month}',[MonthlySalaryController::class, 'salaryHeldExport'])->name('salary.held.export');
    Route::get('/salary-held-pdf/{year}/{month}', [PdfReportController::class, 'salaryHeldPdf'])->name('salary-held-pdf');




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
        Route::get('/', [UsersController::class, 'index'])->name('users.index')->middleware('permissions:user-view|super-admin');
        Route::get('/create', [UsersController::class, 'create'])->name('users.create')->middleware('permissions:user-create|super-admin');
        Route::post('/store', [UsersController::class, 'store'])->name('users.store')->middleware('permissions:user-create|super-admin');
        Route::get('/{userid}/edit', [UsersController::class, 'edit'])->name('users.edit')->middleware('permissions:user-edit|super-admin');
        Route::post('/update', [UsersController::class, 'update'])->name('users.update')->middleware('permissions:user-edit|super-admin');
        Route::get('/{userid}/delete', [UsersController::class, 'delete'])->name('users.delete')->middleware('permissions:user-delete|super-admin');
    });
    // Roles
    // admin/roles/store
    Route::group(['prefix' => 'roles' ],function (){
        Route::get('/', [RolesController::class, 'index'])->name('roles.index')->middleware('permissions:role-view|super-admin');
        Route::get('/create', [RolesController::class, 'create'])->name('roles.create')->middleware('permissions:role-create|super-admin');
        Route::post('/store', [RolesController::class, 'store'])->name('roles.store')->middleware('permissions:role-create|super-admin');
        Route::get('/{userid}/edit', [RolesController::class, 'edit'])->name('roles.edit')->middleware('permissions:role-edit|super-admin');
        Route::post('/update', [RolesController::class, 'update'])->name('roles.update')->middleware('permissions:role-edit|super-admin');
        Route::get('/{id}/delete', [RolesController::class, 'delete'])->name('users.delete')->middleware('permissions:role-delete|super-admin');
    });
    // Permission
    Route::group(['prefix' => 'permissions' ],function (){
        Route::get('/', [PermissionsController::class, 'index'])->name('permissions.index')->middleware('permissions:permission-view|super-admin');
        Route::get('/create', [PermissionsController::class, 'create'])->name('permissions.create')->middleware('permissions:permission-create|super-admin');
        Route::post('/store', [PermissionsController::class, 'store'])->name('permissions.store')->middleware('permissions:permission-create|super-admin');
        Route::get('/{id}/edit', [PermissionsController::class, 'edit'])->name('permissions.edit')->middleware('permissions:permission-edit|super-admin');
        Route::post('/update', [PermissionsController::class, 'update'])->name('permissions.update')->middleware('permissions:permission-edit|super-admin');
        Route::get('/{id}/delete', [PermissionsController::class, 'delete'])->name('permissions.delete')->middleware('permissions:permission-delete|super-admin');
    });


    Route::group(['prefix' => 'modules' ],function (){
        Route::get('', [ModuleController::class, 'index'])->name('modules')->middleware('permissions:permission-view|super-admin');
        Route::get('/create', [ModuleController::class, 'create'])->name('modules.create')->middleware('permissions:permission-create|super-admin');
        Route::post('/store', [ModuleController::class, 'store'])->name('modules.store')->middleware('permissions:permission-create|super-admin');
        Route::get('/edit/{id}', [ModuleController::class, 'edit'])->name('modules.edit')->middleware('permissions:permission-edit|super-admin');
        Route::post('/update', [ModuleController::class, 'update'])->name('modules.update')->middleware('permissions:permission-edit|super-admin');
        Route::get('/delete/{id}', [ModuleController::class, 'delete'])->name('modules.delete')->middleware('permissions:permission-delete|super-admin');
        Route::get('/status/{id}', [ModuleController::class, 'status'])->name('modules.status')->middleware('permissions:permission-edit|super-admin');
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
        Route::get('', [GroupCompanyController::class, 'index'])->name('group.company')->middleware('permissions:g-company-view|super-admin');
        Route::get('/create', [GroupCompanyController::class, 'create'])->name('group.company.create')->middleware('permissions:g-company-create|super-admin');
        Route::post('/store', [GroupCompanyController::class, 'store'])->name('group.company.store')->middleware('permissions:g-company-create|super-admin');
        Route::get('/edit/{id}', [GroupCompanyController::class, 'edit'])->name('group.company.edit')->middleware('permissions:g-company-edit|super-admin');
        Route::post('/update', [GroupCompanyController::class, 'update'])->name('group.company.update')->middleware('permissions:g-company-edit|super-admin');
        Route::get('/delete/{id}', [GroupCompanyController::class, 'delete'])->name('group.company.delete')->middleware('permissions:g-company-delete|super-admin');
        Route::get('/status/{id}', [GroupCompanyController::class, 'status'])->name('group.company.status')->middleware('permissions:g-company-edit|super-admin');
    });

    Route::group(['prefix' => 'companies' ],function (){
        Route::get('', [CompanyController::class, 'index'])->name('company')->middleware('permissions:company-view|super-admin');
        Route::get('/create', [CompanyController::class, 'create'])->name('company.create')->middleware('permissions:company-create|super-admin');
        Route::post('/store', [CompanyController::class, 'store'])->name('company.store')->middleware('permissions:company-create|super-admin');
        Route::get('/edit/{id}', [CompanyController::class, 'edit'])->name('company.edit')->middleware('permissions:company-edit|super-admin');
        Route::post('/update', [CompanyController::class, 'update'])->name('company.update')->middleware('permissions:company-edit|super-admin');
        Route::get('/delete/{id}', [CompanyController::class, 'delete'])->name('company.delete')->middleware('permissions:company-delete|super-admin');
        Route::get('/status/{id}', [CompanyController::class, 'status'])->name('company.status')->middleware('permissions:company-edit|super-admin');
    });

    Route::group(['prefix' => 'religions' ],function (){
        Route::get('', [ReligionsController::class, 'index'])->name('religions')->middleware('permissions:religion-view|super-admin');
        Route::get('/create', [ReligionsController::class, 'create'])->name('religions.create')->middleware('permissions:religion-create|super-admin');
        Route::post('/store', [ReligionsController::class, 'store'])->name('religions.store')->middleware('permissions:religion-create|super-admin');
        Route::get('/edit/{id}', [ReligionsController::class, 'edit'])->name('religions.edit')->middleware('permissions:religion-edit|super-admin');
        Route::post('/update', [ReligionsController::class, 'update'])->name('religions.update')->middleware('permissions:religion-edit|super-admin');
        Route::get('/delete/{id}', [ReligionsController::class, 'delete'])->name('religions.delete')->middleware('permissions:religion-delete|super-admin');
        Route::get('/status/{id}', [ReligionsController::class, 'status'])->name('religions.status')->middleware('permissions:religion-edit|super-admin');
    });
    Route::group(['prefix' => 'title' ],function (){
        Route::get('', [TitleController::class, 'index'])->name('title')->middleware('permissions:title-view|super-admin');
        Route::get('/create', [TitleController::class, 'create'])->name('title.create')->middleware('permissions:title-create|super-admin');
        Route::post('/store', [TitleController::class, 'store'])->name('title.store')->middleware('permissions:title-create|super-admin');
        Route::get('/edit/{id}', [TitleController::class, 'edit'])->name('title.edit')->middleware('permissions:title-edit|super-admin');
        Route::post('/update', [TitleController::class, 'update'])->name('title.update')->middleware('permissions:title-edit|super-admin');
        Route::get('/delete/{id}', [TitleController::class, 'delete'])->name('title.delete')->middleware('permissions:title-delete|super-admin');
        Route::get('/status/{id}', [TitleController::class, 'status'])->name('title.status')->middleware('permissions:title-edit|super-admin');
    });
    Route::group(['prefix' => 'bank' ],function (){
        Route::get('', [BankController::class, 'index'])->name('bank')->middleware('permissions:bank-view|super-admin');
        Route::get('/create', [BankController::class, 'create'])->name('bank.create')->middleware('permissions:bank-create|super-admin');
        Route::post('/store', [BankController::class, 'store'])->name('bank.store')->middleware('permissions:bank-create|super-admin');
        Route::get('/edit/{id}', [BankController::class, 'edit'])->name('bank.edit')->middleware('permissions:bank-edit|super-admin');
        Route::post('/update', [BankController::class, 'update'])->name('bank.update')->middleware('permissions:bank-edit|super-admin');
        Route::get('/delete/{id}', [BankController::class, 'delete'])->name('bank.delete')->middleware('permissions:bank-delete|super-admin');
        Route::get('/status/{id}', [BankController::class, 'status'])->name('bank.status')->middleware('permissions:bank-edit|super-admin');
    });
    Route::group(['prefix' => 'working_status' ],function (){
        Route::get('', [WorkingStatusController::class, 'index'])->name('working_status')->middleware('permissions:working-status-view|super-admin');
        Route::get('/create', [WorkingStatusController::class, 'create'])->name('working_status.create')->middleware('permissions:working-status-create|super-admin');
        Route::post('/store', [WorkingStatusController::class, 'store'])->name('working_status.store')->middleware('permissions:working-status-create|super-admin');
        Route::get('/edit/{id}', [WorkingStatusController::class, 'edit'])->name('working_status.edit')->middleware('permissions:working-status-edit|super-admin');
        Route::post('/update', [WorkingStatusController::class, 'update'])->name('working_status.update')->middleware('permissions:working-status-edit|super-admin');
        Route::get('/delete/{id}', [WorkingStatusController::class, 'delete'])->name('working_status.delete')->middleware('permissions:working-status-delete|super-admin');
        Route::get('/status/{id}', [WorkingStatusController::class, 'status'])->name('working_status.status')->middleware('permissions:working-status-edit|super-admin');
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
        Route::get('', [PublicHolidayController::class, 'index'])->name('public_holiday')->middleware('permissions:public-holiday-view|super-admin');
        Route::get('/create', [PublicHolidayController::class, 'create'])->name('public_holiday.create')->middleware('permissions:public-holiday-create|super-admin');
        Route::post('/store', [PublicHolidayController::class, 'store'])->name('public_holiday.store')->middleware('permissions:public-holiday-create|super-admin');
        Route::get('/edit/{id}', [PublicHolidayController::class, 'edit'])->name('public_holiday.edit')->middleware('permissions:public-holiday-edit|super-admin');
        Route::post('/update', [PublicHolidayController::class, 'update'])->name('public_holiday.update')->middleware('permissions:public-holiday-edit|super-admin');
        Route::get('/delete/{id}', [PublicHolidayController::class, 'delete'])->name('public_holiday.delete')->middleware('permissions:public-holiday-delete|super-admin');
        Route::get('/status/{id}', [DepartmentController::class, 'status'])->name('public_holiday.status')->middleware('permissions:public-holiday-edit|super-admin');
    });

    Route::group(['prefix' => 'designation' ],function (){
        Route::get('', [DesignationController::class, 'index'])->name('designation')->middleware('permissions:designation-view|super-admin');
        Route::get('/create', [DesignationController::class, 'create'])->name('designation.create')->middleware('permissions:designation-create|super-admin');
        Route::post('/store', [DesignationController::class, 'store'])->name('designation.store')->middleware('permissions:designation-create|super-admin');
        Route::get('/edit/{id}', [DesignationController::class, 'edit'])->name('designation.edit')->middleware('permissions:designation-edit|super-admin');
        Route::post('/update', [DesignationController::class, 'update'])->name('designation.update')->middleware('permissions:designation-edit|super-admin');
        Route::get('/delete/{id}', [DesignationController::class, 'delete'])->name('designation.delete')->middleware('permissions:designation-delete|super-admin');
        Route::get('/status/{id}', [DepartmentController::class, 'status'])->name('designation.status')->middleware('permissions:designation-edit|super-admin');
    });

    Route::group(['prefix' => 'salary-setups' ],function (){
        Route::get('', [SalarySetupController::class, 'index'])->name('salary.setup');
        Route::get('/create/{id}', [SalarySetupController::class, 'create'])->name('salary.setup.create');
        Route::post('/store', [SalarySetupController::class, 'store'])->name('salary.setup.store');
        Route::get('/edit/{id}', [SalarySetupController::class, 'edit'])->name('salary.setup.edit');
        Route::post('/update', [SalarySetupController::class, 'update'])->name('salary.setup.update');
        Route::get('/delete/{id}', [SalarySetupController::class, 'delete'])->name('salary.setup.delete');
        Route::get('/status/{id}', [SalarySetupController::class, 'status'])->name('salary.setup.status');


        Route::get('/dept-or-all', [SalarySetupController::class, 'salarySetupDeptOrAll'])->name('salary.setup.dept.or.all');

        Route::get('/get-salaried-employee/{dept_id}', [SalarySetupController::class, 'getSalariedEmployee'])->name('get.salaried.employee');
    });

    Route::group(['prefix' => 'asset-type' ],function (){
        Route::get('', [AssetTypeController::class, 'index'])->name('asset.type');
        Route::get('/create', [AssetTypeController::class, 'create'])->name('asset.type.create');
        Route::post('/store', [AssetTypeController::class, 'store'])->name('asset.type.store');
        Route::get('/edit/{id}', [AssetTypeController::class, 'edit'])->name('asset.type.edit');
        Route::post('/update', [AssetTypeController::class, 'update'])->name('asset.type.update');
        Route::get('/delete/{id}', [AssetTypeController::class, 'delete'])->name('asset.type.delete');
        Route::get('/status/{id}', [AssetTypeController::class, 'status'])->name('asset.type.status');
    });

    Route::group(['prefix' => 'asset' ],function (){
        Route::get('', [AssetController::class, 'index'])->name('asset');
        Route::get('/create', [AssetController::class, 'create'])->name('asset.create');
        Route::post('/store', [AssetController::class, 'store'])->name('asset.store');
        Route::get('/edit/{id}', [AssetController::class, 'edit'])->name('asset.edit');
        Route::post('/update', [AssetController::class, 'update'])->name('asset.update');
        Route::get('/delete/{id}', [AssetController::class, 'delete'])->name('asset.delete');
        Route::get('/status/{id}', [AssetController::class, 'status'])->name('asset.status');
    });

    Route::group(['prefix' => 'asset-assigned' ],function (){
        Route::get('', [AssetAssignedController::class, 'index'])->name('asset.assigned');
        Route::get('/create', [AssetAssignedController::class, 'create'])->name('asset.assigned.create');
        Route::post('/store', [AssetAssignedController::class, 'store'])->name('asset.assigned.store');
        Route::get('/edit/{id}', [AssetAssignedController::class, 'edit'])->name('asset.assigned.edit');
        Route::post('/update', [AssetAssignedController::class, 'update'])->name('asset.assigned.update');
        Route::get('/delete/{id}', [AssetAssignedController::class, 'delete'])->name('asset.assigned.delete');
        Route::get('/status/{id}', [AssetAssignedController::class, 'status'])->name('asset.assigned.status');
    });

    Route::group(['prefix' => 'department' ],function (){
        Route::get('', [DepartmentController::class, 'index'])->name('department')->middleware('permissions:department-view|super-admin');;
        Route::get('/create', [DepartmentController::class, 'create'])->name('department.create')->middleware('permissions:department-create|super-admin');
        Route::post('/store', [DepartmentController::class, 'store'])->name('department.store')->middleware('permissions:department-create|super-admin');
        Route::get('/edit/{id}', [DepartmentController::class, 'edit'])->name('department.edit')->middleware('permissions:department-edit|super-admin');
        Route::post('/update', [DepartmentController::class, 'update'])->name('department.update')->middleware('permissions:department-edit|super-admin');
        Route::get('/delete/{id}', [DepartmentController::class, 'delete'])->name('department.delete')->middleware('permissions:department-delete|super-admin');
        Route::get('/status/{id}', [DepartmentController::class, 'status'])->name('department.status')->middleware('permissions:department-edit|super-admin');
    });

    Route::group(['prefix' => 'section' ],function (){
        Route::get('', [SectionController::class, 'index'])->name('section')->middleware('permissions:sub-department-view|super-admin');
        Route::get('/create', [SectionController::class, 'create'])->name('section.create')->middleware('permissions:sub-department-create|super-admin');
        Route::post('/store', [SectionController::class, 'store'])->name('section.store')->middleware('permissions:sub-department-create|super-admin');
        Route::get('/edit/{id}', [SectionController::class, 'edit'])->name('section.edit')->middleware('permissions:sub-department-edit|super-admin');
        Route::post('/update', [SectionController::class, 'update'])->name('section.update')->middleware('permissions:sub-department-edit|super-admin');
        Route::get('/delete/{id}', [SectionController::class, 'delete'])->name('section.delete')->middleware('permissions:sub-department-delete|super-admin');
        Route::get('/status/{id}', [SectionController::class, 'status'])->name('section.status')->middleware('permissions:sub-department-edit|super-admin');
    });

    Route::group(['prefix' => 'notice' ],function (){
        Route::get('', [NoticeController::class, 'index'])->name('notice')->middleware('permissions:notice-view|super-admin');
        Route::get('view/{id}', [NoticeController::class, 'view'])->name('view');
        Route::get('/create', [NoticeController::class, 'create'])->name('notice.create')->middleware('permissions:notice-create|super-admin');
        Route::post('/store', [NoticeController::class, 'store'])->name('notice.store')->middleware('permissions:notice-create|super-admin');
        Route::get('/edit/{id}', [NoticeController::class, 'edit'])->name('notice.edit')->middleware('permissions:notice-edit|super-admin');
        Route::post('/update', [NoticeController::class, 'update'])->name('notice.update')->middleware('permissions:notice-edit|super-admin');
        Route::get('/delete/{id}', [NoticeController::class, 'delete'])->name('notice.delete')->middleware('permissions:notice-delete|super-admin');
        Route::get('/status/{id}', [NoticeController::class, 'status'])->name('notice.status')->middleware('permissions:notice-edit|super-admin');
    });

    Route::group(['prefix' => 'employee' ],function (){
        Route::get('', [EmployeeController::class, 'index'])->name('employee')->middleware('permissions:employee-view|super-admin');
        Route::get('/create', [EmployeeController::class, 'create'])->name('employee.create')->middleware('permissions:employee-create|super-admin');
        Route::post('/store', [EmployeeController::class, 'store'])->name('employee.store')->middleware('permissions:employee-create|super-admin');
        Route::get('/edit/{id}', [EmployeeController::class, 'edit'])->name('employee.edit')->middleware('permissions:employee-edit|super-admin');
        Route::post('/update', [EmployeeController::class, 'update'])->name('employee.update')->middleware('permissions:employee-edit|super-admin');
        Route::get('/delete/{id}', [EmployeeController::class, 'delete'])->name('employee.delete')->middleware('permissions:employee-delete|super-admin');
        Route::get('/status/{id}', [EmployeeController::class, 'status'])->name('employee.status')->middleware('permissions:employee-edit|super-admin');
        Route::get('/export-all-employee', [EmployeeController::class, 'exportAllEmployee'])->name('employee.employee-export')->middleware('permissions:super-admin');
    });
    Route::group(['prefix' => 'leave_category' ],function (){
        Route::get('', [LeaveCategoryController::class, 'index'])->name('leave_category')->middleware('permissions:leave-category-view|super-admin');
        Route::get('/create', [LeaveCategoryController::class, 'create'])->name('leave_category.create')->middleware('permissions:leave-category-create|super-admin');
        Route::post('/store', [LeaveCategoryController::class, 'store'])->name('leave_category.store')->middleware('permissions:leave-category-create|super-admin');
        Route::get('/edit/{id}', [LeaveCategoryController::class, 'edit'])->name('leave_category.edit')->middleware('permissions:leave-category-edit|super-admin');
        Route::post('/update', [LeaveCategoryController::class, 'update'])->name('leave_category.update')->middleware('permissions:leave-category-edit|super-admin');
        Route::get('/delete/{id}', [LeaveCategoryController::class, 'delete'])->name('leave_category.delete')->middleware('permissions:leave-category-delete|super-admin');
        Route::get('/status/{id}', [LeaveCategoryController::class, 'status'])->name('leave_category.status')->middleware('permissions:leave-category-edit|super-admin');
    });

    Route::group(['prefix' => 'leave_application' ],function (){
        Route::get('', [LeaveApplicationController::class, 'index'])->name('leave_application')->middleware('permissions:leave-personal-view|super-admin');
        Route::get('/approved/{id}', [LeaveApplicationController::class, 'approved'])->name('leave_application.approved.user')->middleware('permissions:leave-approve-update|super-admin');
        Route::get('/rejected/{id}', [LeaveApplicationController::class, 'rejected'])->name('leave_application.rejected.user')->middleware('permissions:leave-approve-update|super-admin');


        Route::get('/approved-by-alternate/{id}', [LeaveApplicationController::class, 'approvedByAlternate'])->name('leave_application.approved.by.alternate')->middleware('permissions:leave-acknowledge-update|super-admin');
        Route::get('/rejected-by-alternate/{id}', [LeaveApplicationController::class, 'rejectedByAlternate'])->name('leave_application.rejected.by.alternate')->middleware('permissions:leave-acknowledge-update|super-admin');;

        Route::get('/approved-by-report/{id}', [LeaveApplicationController::class, 'approvedByReportTo'])->name('leave_application.approved.by.report')->middleware('permissions:leave-recommend-update|super-admin');
        Route::get('/rejected-by-report/{id}', [LeaveApplicationController::class, 'rejectedByReportTo'])->name('leave_application.rejected.by.report')->middleware('permissions:leave-recommend-update|super-admin');

        Route::get('/create', [LeaveApplicationController::class, 'create'])->name('leave_application.create')->middleware('permissions:leave-personal-create|super-admin');
        Route::post('/store', [LeaveApplicationController::class, 'store'])->name('leave_application.store')->middleware('permissions:leave-personal-create|super-admin');
        Route::get('/edit/{id}/{leaveId?}', [LeaveApplicationController::class, 'edit'])->name('leave_application.edit')->middleware('permissions:leave-personal-edit|super-admin');
        Route::post('/update', [LeaveApplicationController::class, 'update'])->name('leave_application.update')->middleware('permissions:leave-personal-edit|super-admin');
        Route::get('/delete/{id}', [LeaveApplicationController::class, 'delete'])->name('leave_application.delete')->middleware('permissions:leave-personal-delete|super-admin');
        Route::get('/status/{id}', [LeaveApplicationController::class, 'status'])->name('leave_application.status')->middleware('permissions:leave-personal-edit|super-admin');
        Route::get('/apply/{id}/{leaveId?}', [LeaveApplicationController::class, 'apply'])->name('leave_application.apply')->middleware('permissions:leave-personal-create|super-admin');
        Route::post('/apply/process', [LeaveApplicationController::class, 'applyProcess'])->name('leave_application.apply.process')->middleware('permissions:leave-personal-create|super-admin');

        Route::get('/requested-user', [LeaveApplicationController::class, 'requestedUser'])->name('leave_application.requested.user')->middleware('permissions:leave-personal-create|super-admin');
        Route::get('/leave-acknowledge', [LeaveApplicationController::class, 'leaveAcknowledge'])->name('leave_application.leave.acknowledge')->middleware('permissions:leave-acknowledge-view|super-admin');;
        Route::get('/leave-report-to', [LeaveApplicationController::class, 'leaveReportTo'])->name('leave_application.leave.report.to')->middleware('permissions:leave-recommend-view|super-admin');;

        Route::get('/direct-leave-approve', [LeaveApplicationController::class, 'directLeaveApprove'])->name('direct.leave.approve')->middleware('permissions:leave-approve-update|super-admin');
        Route::post('/direct-leave-approve/apply', [LeaveApplicationController::class, 'directLeaveApproveApply'])->name('direct.leave.approve.apply')->middleware('permissions:leave-personal-create|super-admin');
    });
    Route::get('/leave-list', [LeaveApplicationController::class, 'leaveList'])->name('leave.list')->middleware('permissions:super-admin');
    Route::get('/get-user/leave-date/{id}', [LeaveApplicationController::class, 'getUserLeaveDate'])->name('uu.leave.application')->middleware('permissions:leave-report-view|leave-other-view|leave-report-download|super-admin');
    Route::group(['prefix' => 'employee_education' ],function (){
        Route::get('{id}', [EmployeeEducationController::class, 'index'])->name('employee_education')->middleware('permissions:emp-education-view|super-admin');
        Route::get('/create/{id}', [EmployeeEducationController::class, 'create'])->name('employee_education.create')->middleware('permissions:emp-education-create|super-admin');
        Route::post('/store', [EmployeeEducationController::class, 'store'])->name('employee_education.store')->middleware('permissions:emp-education-create|super-admin');
        Route::get('/edit/{id}', [EmployeeEducationController::class, 'edit'])->name('employee_education.edit')->middleware('permissions:emp-education-edit|super-admin');
        Route::post('/update', [EmployeeEducationController::class, 'update'])->name('employee_education.update')->middleware('permissions:emp-education-edit|super-admin');
        Route::get('/delete/{id}', [EmployeeEducationController::class, 'delete'])->name('employee_education.delete')->middleware('permissions:emp-education-delete|super-admin');
        Route::get('/status/{id}', [EmployeeEducationController::class, 'status'])->name('employee_education.status')->middleware('permissions:emp-education-edit|super-admin');
    });

    Route::group(['prefix' => 'employee_posting' ],function (){
        Route::get('{id}', [EmployeePostingController::class, 'index'])->name('employee_posting')->middleware('permissions:emp-posting-view|super-admin');
        Route::get('/create/{id}', [EmployeePostingController::class, 'create'])->name('employee_posting.create')->middleware('permissions:emp-posting-create|super-admin');
        Route::post('/store', [EmployeePostingController::class, 'store'])->name('employee_posting.store')->middleware('permissions:emp-posting-create|super-admin');
        Route::get('/edit/{id}', [EmployeePostingController::class, 'edit'])->name('employee_posting.edit')->middleware('permissions:emp-posting-edit|super-admin');
        Route::post('/update', [EmployeePostingController::class, 'update'])->name('employee_posting.update')->middleware('permissions:emp-posting-edit|super-admin');
        Route::get('/delete/{id}', [EmployeePostingController::class, 'delete'])->name('employee_posting.delete')->middleware('permissions:emp-posting-delete|super-admin');
        Route::get('/status/{id}', [EmployeePostingController::class, 'status'])->name('employee_posting.status')->middleware('permissions:emp-posting-edit|super-admin');
    });

    Route::group(['prefix' => 'emp_promotion'],function(){
        Route::get('{id}',[EmployeePromotionController::class,'index'])->name('emp_promotion');
        Route::get('/create/{id}',[EmployeePromotionController::class,'create'])->name('emp_promotion.create');
        Route::post('/store',[EmployeePromotionController::class,'store'])->name('emp_promotion.store');
        Route::get('/edit/{id}', [EmployeePromotionController::class, 'edit'])->name('emp_promotion.edit');
        Route::post('/update', [EmployeePromotionController::class, 'update'])->name('emp_promotion.update');
        Route::get('/delete/{id}', [EmployeePromotionController::class, 'delete'])->name('emp_promotion.delete');
        Route::get('/status/{id}', [EmployeePromotionController::class, 'status'])->name('emp_promotion.status');
    });


    Route::group(['prefix' => 'assign-roster'],function(){
        Route::get('/create/{id}',[AssignedRosterEmployeeController::class,'create'])->name('assign-roster.create');
        Route::post('/store/{id}',[AssignedRosterEmployeeController::class,'store'])->name('assign-roster.store');
        Route::get('/edit/{id}', [AssignedRosterEmployeeController::class, 'edit'])->name('assign-roster.edit');
        Route::post('/update', [AssignedRosterEmployeeController::class, 'update'])->name('assign-roster.update');
        Route::get('/delete/{id}', [AssignedRosterEmployeeController::class, 'delete'])->name('assign-roster.delete');
        Route::get('/status/{id}', [AssignedRosterEmployeeController::class, 'status'])->name('assign-roster.status');
    });



    Route::group(['prefix' => 'org_calender' ],function (){
        Route::get('', [OrgCalenderController::class, 'index'])->name('org_calender')->middleware('permissions:org-calendar-view|super-admin');
        Route::get('/create/', [OrgCalenderController::class, 'create'])->name('org_calender.create')->middleware('permissions:org-calendar-create|super-admin');
        Route::post('/store', [OrgCalenderController::class, 'store'])->name('org_calender.store')->middleware('permissions:org-calendar-create|super-admin');
        Route::get('/edit/{id}', [OrgCalenderController::class, 'edit'])->name('org_calender.edit')->middleware('permissions:org-calendar-edit|super-admin');
        Route::post('/update', [OrgCalenderController::class, 'update'])->name('org_calender.update')->middleware('permissions:org-calendar-edit|super-admin');
        Route::get('/delete/{id}', [OrgCalenderController::class, 'delete'])->name('org_calender.delete')->middleware('permissions:org-calendar-delete|super-admin');
        Route::get('/status/{id}', [OrgCalenderController::class, 'status'])->name('org_calender.status')->middleware('permissions:org-calendar-edit|super-admin');
    });


    Route::group(['prefix' => 'shift' ],function (){
        Route::get('', [ShiftController::class, 'index'])->name('shift')->middleware('permissions:shift-view|super-admin');
        Route::get('/create', [ShiftController::class, 'create'])->name('shift.create')->middleware('permissions:shift-create|super-admin');
        Route::post('/store', [ShiftController::class, 'store'])->name('shift.store')->middleware('permissions:shift-create|super-admin');
        Route::get('/edit/{id}', [ShiftController::class, 'edit'])->name('shift.edit')->middleware('permissions:shift-edit|super-admin');
        Route::post('/update', [ShiftController::class, 'update'])->name('shift.update')->middleware('permissions:shift-edit|super-admin');
        Route::get('/delete/{id}', [ShiftController::class, 'delete'])->name('shift.delete')->middleware('permissions:shift-delete|super-admin');
        Route::get('/status/{id}', [ShiftController::class, 'status'])->name('shift.status')->middleware('permissions:shift-edit|super-admin');
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

    Route::get('roster', [RosterController::class, 'index'])->name('roster')->middleware('permissions:roster-view|roster-insert|super-admin');
    Route::get('roster/update', [RosterController::class, 'update'])->name('roster.update')->middleware('permissions:roster-update|roster-insert|super-admin');
    Route::get('roster/approved', [RosterController::class, 'approved'])->name('roster.approved')->middleware('permissions:roster-approve|super-admin');
    Route::post('roster/approved-by-id', [RosterController::class, 'approvedById'])->name('roster.approved.by.id')->middleware('permissions:roster-approve|super-admin');
    Route::post('all-roster', [RosterController::class, 'allRoster'])->name('all.roster')->middleware('permissions:roster-view|super-admin');
    Route::post('single-roster', [RosterController::class, 'singleRoster'])->name('single.roster')->middleware('permissions:roster-report|super-admin');

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
        Route::get('/my_create', [TaskManagementController::class, 'MyTaskCreate'])->name('my.task.create');
        Route::post('/store', [TaskManagementController::class, 'store'])->name('task.store');
        Route::post('/my_task_store', [TaskManagementController::class, 'myStore'])->name('my.task.store');
        Route::get('/edit/{id}', [TaskManagementController::class, 'edit'])->name('task.edit');
        Route::post('/update', [TaskManagementController::class, 'update'])->name('task.update');
        Route::get('/view_my_task/{id}', [TaskManagementController::class, 'viewMyTask'])->name('view_my_task.update');
        Route::post('/update_my_task', [TaskManagementController::class, 'updateMyTask'])->name('task.update_my_task');
        Route::get('/complete_view/{id}', [TaskManagementController::class, 'CompleteView'])->name('task.complete.view');
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

    Route::get('/task-details-report', [PdfReportController::class, 'taskDetailsReport'])->name('task.details.report');
    Route::get('/task-details-report-save', [PdfReportController::class, 'taskDetailsReportSave'])->name('task.details.report.save');

    Route::get('/asset-details-report', [PdfReportController::class, 'assetDetailsReport'])->name('asset.details.report');
    Route::get('/asset-details-report-save', [PdfReportController::class, 'assetDetailsReportSave'])->name('asset.details.report.save');


    Route::get('/salary-generate-pdf', [PdfReportController::class, 'salaryGeneratePdf'])->name('salary-generate-pdf');


    Route::group(['prefix' => 'arears' ],function (){
        Route::get('', [ArearsController::class, 'index'])->name('arears')->middleware('permissions:super-admin');
        Route::get('/create', [ArearsController::class, 'create'])->name('arears.create')->middleware('permissions:super-admin');
        Route::post('/store', [ArearsController::class, 'store'])->name('arears.store')->middleware('permissions:super-admin');
        Route::get('/edit/{id}', [ArearsController::class, 'edit'])->name('arears.edit')->middleware('permissions:super-admin');
        Route::post('/update', [ArearsController::class, 'update'])->name('arears.update')->middleware('permissions:super-admin');
        Route::get('/delete/{id}', [ArearsController::class, 'delete'])->name('arears.delete')->middleware('permissions:super-admin');
        Route::get('/status/{id}', [ArearsController::class, 'status'])->name('arears.status')->middleware('permissions:super-admin');
    });

});




