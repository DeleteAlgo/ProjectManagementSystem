<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $departments = [
            ['name' => 'Human Resources', 'description' => 'Handles HR tasks'],
            ['name' => 'Development', 'description' => 'Software development team'],
            ['name' => 'Marketing', 'description' => 'Marketing and promotions'],
            ['name' => 'Finance', 'description' => 'Manages company finances'],
        ];

        foreach ($departments as $dept) {
            Department::create($dept);
        }
    }
}
