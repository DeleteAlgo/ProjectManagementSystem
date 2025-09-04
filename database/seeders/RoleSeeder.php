<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            ['name' => 'Admin', 'description' => 'Administrator with full access'],
            ['name' => 'Manager', 'description' => 'Project Manager with elevated permissions'],
            ['name' => 'Team Lead', 'description' => 'Team Lead responsible for a team'],
            ['name' => 'Team Member', 'description' => 'Regular team member with standard access'],
        ];

        foreach ($roles as $role) {
            Role::create([
                'name' => $role['name'], 
                'description' => $role['description']
            ]);
        }
    }
}
