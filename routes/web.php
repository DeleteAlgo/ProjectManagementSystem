<?php
use Inertia\Inertia;
use App\Models\User;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return Inertia::render('index');
});

Route::get('/dashboard', function () {
    return Inertia::render('dashboard');
});

Route::get('/login', fn() => response()->json(['message' => 'Please login'], 401))
    ->name('login');