<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('permissions')->insert([
            ['name' => 'view_users', 'display_name' => 'View Users', 'description' => 'Permission to view user details'],
            ['name' => 'edit_users', 'display_name' => 'Edit Users', 'description' => 'Permission to edit user details'],
            ['name' => 'delete_users', 'display_name' => 'Delete Users', 'description' => 'Permission to delete users'],
            ['name' => 'create_users', 'display_name' => 'Create Users', 'description' => 'Permission to create new users'],
            ['name' => 'view_roles', 'display_name' => 'View Roles', 'description' => 'Permission to view roles'],
            ['name' => 'edit_roles', 'display_name' => 'Edit Roles', 'description' => 'Permission to edit roles'],
            ['name' => 'delete_roles', 'display_name' => 'Delete Roles', 'description' => 'Permission to delete roles'],
            ['name' => 'create_roles', 'display_name' => 'Create Roles', 'description' => 'Permission to create new roles'],
            ['name' => 'view_permissions', 'display_name' => 'View Permissions', 'description' => 'Permission to view permissions'],
            ['name' => 'edit_permissions', 'display_name' => 'Edit Permissions', 'description' => 'Permission to edit permissions'],
            ['name' => 'delete_permissions', 'display_name' => 'Delete Permissions', 'description' => 'Permission to delete permissions'],
            ['name' => 'create_permissions', 'display_name' => 'Create Permissions', 'description' => 'Permission to create new permissions'],
            ['name' => 'assign_roles', 'display_name' => 'Assign Roles to Users', 'description' => 'Permission to assign roles to users'],
            ['name' => 'assign_permissions', 'display_name' => 'Assign Permissions to Roles', 'description' => 'Permission to assign permissions to roles'],
            ['name' => 'view_departments', 'display_name' => 'View Departments', 'description' => 'Permission to view departments'],
            ['name' => 'edit_departments', 'display_name' => 'Edit Departments', 'description' => 'Permission to edit departments'],
            ['name' => 'delete_departments', 'display_name' => 'Delete Departments', 'description' => 'Permission to delete departments'],
            ['name' => 'create_departments', 'display_name' => 'Create Departments', 'description' => 'Permission to create new departments'],
            ['name' => 'manage_profile', 'display_name' => 'Manage Own Profile', 'description' => 'Permission to manage own profile'],
            ['name' => 'view_dashboard', 'display_name' => 'View Dashboard', 'description' => 'Permission to view dashboard'],
            ['name' => 'manage_settings', 'display_name' => 'Manage Application Settings', 'description' => 'Permission to manage application settings'],
            ['name' => 'view_audit_logs', 'display_name' => 'View Audit Logs', 'description' => 'Permission to view audit logs'],
            ['name' => 'manage_audit_logs', 'display_name' => 'Manage Audit Logs', 'description' => 'Permission to manage audit logs'],
            ['name' => 'view_reports', 'display_name' => 'View Reports', 'description' => 'Permission to view reports'],
            ['name' => 'generate_reports', 'display_name' => 'Generate Reports', 'description' => 'Permission to generate reports'],
            ['name' => 'access_reports', 'display_name' => 'Access Reports', 'description' => 'Permission to access reports'],
            ['name' => 'export_data', 'display_name' => 'Export Data', 'description' => 'Permission to export data'],
            ['name' => 'import_data', 'display_name' => 'Import Data', 'description' => 'Permission to import data'],
            ['name' => 'manage_notifications', 'display_name' => 'Manage Notifications', 'description' => 'Permission to manage notifications'],
            ['name' => 'send_notifications', 'display_name' => 'Send Notifications', 'description' => 'Permission to send notifications'],
            ['name' => 'view_activity_logs', 'display_name' => 'View Activity Logs', 'description' => 'Permission to view activity logs'],
            ['name' => 'manage_activity_logs', 'display_name' => 'Manage Activity Logs', 'description' => 'Permission to manage activity logs'],
            ['name' => 'view_requests', 'display_name' => 'View Requests', 'description' => 'Permission to view requests'],
            ['name' => 'create_requests', 'display_name' => 'Create Requests', 'description' => 'Permission to create requests'],
            ['name' => 'edit_requests', 'display_name' => 'Edit Requests', 'description' => 'Permission to edit requests'],
            ['name' => 'delete_requests', 'display_name' => 'Delete Requests', 'description' => 'Permission to delete requests'],
            ['name' => 'approve_requests', 'display_name' => 'Approve Requests', 'description' => 'Permission to approve requests'],
            ['name' => 'manage_projects', 'display_name' => 'Manage Projects', 'description' => 'Permission to manage projects'],
            ['name' => 'view_tasks', 'display_name' => 'View Tasks', 'description' => 'Permission to view tasks'],
            ['name' => 'edit_tasks', 'display_name' => 'Edit Tasks', 'description' => 'Permission to edit tasks'],
            ['name' => 'delete_tasks', 'display_name' => 'Delete Tasks', 'description' => 'Permission to delete tasks'],
            ['name' => 'create_tasks', 'display_name' => 'Create Tasks', 'description' => 'Permission to create tasks'],
            ['name' => 'assign_tasks', 'display_name' => 'Assign Tasks', 'description' => 'Permission to assign tasks'],
            ['name' => 'view_calendar', 'display_name' => 'View Calendar', 'description' => 'Permission to view calendar'],
            ['name' => 'manage_calendar', 'display_name' => 'Manage Calendar', 'description' => 'Permission to manage calendar'],
            ['name' => 'view_files', 'display_name' => 'View Files', 'description' => 'Permission to view files'],
            ['name' => 'upload_files', 'display_name' => 'Upload Files', 'description' => 'Permission to upload files'],
            ['name' => 'edit_files', 'display_name' => 'Edit Files', 'description' => 'Permission to edit files'],
            ['name' => 'delete_files', 'display_name' => 'Delete Files', 'description' => 'Permission to delete files'],
            ['name' => 'manage_files', 'display_name' => 'Manage Files', 'description' => 'Permission to manage files'],
            ['name' => 'view_documents', 'display_name' => 'View Documents', 'description' => 'Permission to view documents'],
            ['name' => 'upload_documents', 'display_name' => 'Upload Documents', 'description' => 'Permission to upload documents'],
            ['name' => 'edit_documents', 'display_name' => 'Edit Documents', 'description' => 'Permission to edit documents'],
            ['name' => 'delete_documents', 'display_name' => 'Delete Documents', 'description' => 'Permission to delete documents'],
            ['name' => 'manage_documents', 'display_name' => 'Manage Documents', 'description' => 'Permission to manage documents'],
        ]);
    }
}
