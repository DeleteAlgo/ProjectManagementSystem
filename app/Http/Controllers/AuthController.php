<?php
namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Department;
use App\Models\Role;
use App\Models\Permission;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function checkUser()
    {
        $authenticated_user = Auth::check();
        
        if(!$authenticated_user){
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        
        $user = Auth::user();
        $user = $this->userMapped($user);

        // Create a new token for the user
        $token = $user->createToken('auth_token')->plainTextToken;

         return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user
        ]);
        
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $user = $this->userMapped($user);

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'access_token' => $token,
                'token_type' => 'Bearer',
                'user' => $user
            ]);
        }

        return response()->json(['message' => 'Unauthorized'], 401);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }
    
    /**
     * Map user with department and role on user object
     */
    private function userMapped($user)
    {
        $department = Department::find($user->department_id);
        $role = Role::find($user->role_id);
        $permissions = Role::with('permissions')->find($user->role_id)?->permissions;

        // Assign before unsetting role_id
        $user->department = $department;
        $user->permissions = $permissions;
        $user->role = $role;

        unset($user->department_id, $user->role_id, $user->password, $user->remember_token);

        $user->profile_photo_path = $user->profile_photo_path
            ? asset('storage/' . $user->profile_photo_path)
            : null;

        return $user;
    }

    public function getRolePermissions($roleId)
    {
        $role = Role::with('permissions')->findOrFail($roleId);
        return response()->json([
            'role' => $role->name,
            'display_name' => $role->display_name,
            'description' => $role->description,
            'permissions' => $role->permissions
        ]);
    }
}
