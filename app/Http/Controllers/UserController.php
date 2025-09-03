<?php

namespace App\Http\Controllers;

use App\Models\User;
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
        $validator = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        
        return new UserResource($user);
    }

    public function update(Request $request, $id)
    {
        $user = User::find($id);
        if(!$user && $id == auth()->id()){
           autg()->logout();
           return response()->json(['message' => 'Unauthorized'], 401);
        }

        $validator = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|string|email|max:255|unique:users,email,'.$id,
            'password' => 'sometimes|required|string|min:8',
        ]);

        if($request->has('password')){
            $request->merge(['password' => Hash::make($request->password)]);
        }

        $user->update($request->all());

        return new UserResource($user);
    }
}
