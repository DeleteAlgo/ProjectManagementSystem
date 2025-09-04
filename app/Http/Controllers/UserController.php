<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use App\Models\Department;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

    public function show()
    {
       return UserResource::collection(User::all());
    }

    public function store(Request $request)
    {   
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'date_of_birth' => 'required|date',
            'address' => 'required|string|max:500',
            'phone' => 'required|string|max:20',
            'age' => 'required|integer|min:0',
            'department_id' => 'required|exists:departments,id',
            'role_id' => 'required|exists:roles,id',
        ]);
        $validated['password'] = Hash::make($validated['password']);
        
        $user = User::create($validated);
        
        return $this->userMapped($user);
    }

    public function update(Request $request, $id)
    {
        $user = User::find($id);
        if(!$user && $id == auth()->id()){
           autg()->logout();
           return response()->json(['message' => 'Unauthorized'], 401);
        }

        $validator = $request->validate([
            'first_name' => 'sometimes|required|string|max:255',
            'last_name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|string|email|max:255|unique:users',
            'password' => 'sometimes|required|string|min:8',
            'role_id' => 'sometimes|required|exists:roles,id',
            'date_of_birth' => 'sometimes|required|date',
            'address' => 'sometimes|required|string|max:500',
            'phone' => 'sometimes|required|string|max:20',
            'age' => 'sometimes|required|integer|min:0',
            'department_id' => 'sometimes|required|exists:departments,id',
        ]);

        if($request->has('password')){
            $request->merge(['password' => Hash::make($request->password)]);
        }

        $user->update($request->all());

        return new UserResource($user);
    }

    public function userMapped($user)
    {
        $department = Department::find($user->department_id);
        $role = Role::find($user->role_id);

        $department = ['id' => $department->id, 'name' => $department->name];
        $role = ['id' => $role->id, 'name' => $role->name];

        return response()->json([
            'id' => $user->id,
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'email' => $user->email,
            'age' => $user->age,
            'phone' => $user->phone,
            'address' => $user->address,
            'date_of_birth' => $user->date_of_birth,
            'department' => $department,
            'role' => $role,
        ]);
    }
}
