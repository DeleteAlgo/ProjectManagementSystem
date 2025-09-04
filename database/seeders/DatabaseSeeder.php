<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Department;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            DepartmentSeeder::class,
        ]);

        $departments = Department::all();

        // Create users for each department
        foreach ($departments as $department) {
            $users = User::factory(3)->create([
                'department_id' => $department->id,
            ]);

            // Assign a random user as manager for this department
            $department->manager_id = $users->random()->id;
            $department->save();
        }       
    }
}
