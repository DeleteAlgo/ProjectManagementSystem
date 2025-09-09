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
            'bio' => 'nullable|string|max:500',
            'profile_photo_path' => 'nullable|string|max:2048',
            'location' => 'nullable|string|max:255',
        ]);
        $validated['password'] = Hash::make($validated['password']);
        
        $user = User::create($validated);
        
        return $this->userMapped($user);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'first_name'    => 'sometimes|required|string|max:255',
            'last_name'     => 'sometimes|required|string|max:255',
            'email'         => 'sometimes|required|email',
            'bio'           => 'sometimes|nullable|string',
            'phone'         => 'sometimes|nullable|string',
            'location'      => 'sometimes|nullable|string',
            'profile_photo' => 'sometimes|nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
        ]);

        $user = User::findOrFail($id);

        if ($request->hasFile('profile_photo')) {
            $path = $request->file('profile_photo')->store('profile_photos', 'public');
            $user->profile_photo_path = $path;
        }

        // Only update fields if present in the request
        foreach (['first_name', 'last_name', 'email', 'bio', 'phone', 'location'] as $field) {
            if ($request->has($field)) {
                $user->$field = $request->input($field);
            }
        }

        $user->save();

        return response()->json(['message' => 'Profile updated!', 'user' => $this->userMapped($user)]);
    }

    public function userMapped($user)
    {
        $department = Department::find($user->department_id);
        $role = Role::find($user->role_id);

        $department = ['id' => $department->id, 'name' => $department->name];
        $role = ['id' => $role->id, 'name' => $role->name];

        $user->profile_photo_path = $user->profile_photo_path
        ? asset('storage/' . $user->profile_photo_path)
        :  asset('storage/' . 'profile_photos/h1inrPlkDuME4KT1NhXaaGAbz8BX6Mju6ryjehrI.jpg');

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
            'bio' => $user->bio,
            'profile_photo_path' => $user->profile_photo_path,
            'location' => $user->location,
        ]);
    }

    public function teamMemberMapped($user)
    {
        $department = Department::find($user->department_id);
        $role = Role::find($user->role_id);

        $department = ['id' => $department->id, 'name' => $department->name];
        $role = ['id' => $role->id, 'name' => $role->name];

        $user->profile_photo_path = $user->profile_photo_path
        ? asset('storage/' . $user->profile_photo_path)
        : asset('storage/' . 'profile_photos/h1inrPlkDuME4KT1NhXaaGAbz8BX6Mju6ryjehrI.jpg');

        unset($user->department_id, $user->role_id, $user->password, $user->remember_token);

        return [
            'id' => $user->id,
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'full_name' => $user->first_name . ' ' . $user->last_name,
            'email' => $user->email,
            'age' => $user->age,
            'phone' => $user->phone,
            'address' => $user->address,
            'date_of_birth' => $user->date_of_birth,
            'department' => $department,
            'role' => $role,
            'bio' => $user->bio,
            'profile_photo_path' => $user->profile_photo_path,
            'location' => $user->location,
        ];
    }

    public function getTeamMembers($user_id)
    {
        $user = User::findOrFail($user_id);
        $department_id = $user->department_id;
        $teamMembers = User::where('department_id', $department_id)
            ->get();
        $mapped_teamMembers = [];
        $manager = User::find(Department::find($department_id)->manager_id);
        $manager = $this->teamMemberMapped($manager);
        
        foreach ($teamMembers as $member) {
            if($member->id !== $manager['id']) {
                array_push($mapped_teamMembers, $this->teamMemberMapped($member));
            }
        }
        
        return response()->json([
            'team_members' => $mapped_teamMembers,
            'manager' => $manager
        ]);
    }
}
