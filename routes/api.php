<?php
use Inertia\Inertia;
use App\Models\User;
use App\Models\Department;
use App\Models\Role;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\http\Controllers\DepartmentController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::post('/login', [AuthController::class, 'login']);

Route::prefix('v1')
        ->middleware(['auth:sanctum'])
        ->group(function () {
            Route::get('/user', function (Request $request) {
                return $request->user();
            });

            Route::get('/users', [UserController::class, 'show']);
            Route::get('/departments', [DepartmentController::class, 'index']);
            Route::get('/roles', [RoleController::class, 'index']);
            Route::get('/boards', [BoardController::class, 'index']);
            Route::get('/checkuser', [AuthController::class, 'checkUser']);

            Route::post('/users', [UserController::class, 'store']);
            Route::post('/logout/{id}', [AuthController::class, 'logout']);
            Route::post('/departments', [DepartmentController::class, 'store']);
            Route::post('/roles', [RoleController::class, 'store']);
            Route::post('/boards', [BoardController::class, 'makeBoard']);

            Route::patch('/users/{id}', [UserController::class, 'update']);
});