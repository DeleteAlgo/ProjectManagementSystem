<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use App\Models\Permission;

class PermissionRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::where('email', 'ronald.porras.rasco@gmail.com')->where('role_id', 1)
        ->first();
        $permissions = Permission::all();
        $roles = Role::where('id', 1)->first();
        $roles->permissions()->sync($permissions->pluck('id')->toArray());

    }
}
