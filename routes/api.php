<?php
use Inertia\Inertia;
use App\Models\User;
use App\Http\Controllers\UserController;
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
            Route::post('/users', [UserController::class, 'store']);
            Route::patch('/users/{id}', [UserController::class, 'update']);
            Route::post('/logout/{id}', [AuthController::class, 'logout']);
});