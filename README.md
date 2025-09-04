# ArashLaw Project Management System

A Trello-like project management application built with Laravel (backend) and React (frontend).

## Features

- User authentication (login, registration)
- Role-based access (Admin, Project Manager, Team Lead, Team Member, Client, Viewer)
- Department and user management
- Boards for organizing projects
- Lists and cards (tasks) for workflow management
- Tagging, assignment, and comments on tasks
- API endpoints for CRUD operations
- Responsive UI with Tailwind CSS

## Tech Stack

- **Backend:** Laravel, MySQL
- **Frontend:** React, Tailwind CSS, Inertia.js
- **Auth:** Laravel Sanctum

## Database Schema Overview

- **Users:** Stores user info, roles, department assignment
- **Departments:** Organizational units
- **Roles:** User roles and permissions
- **Boards:** Project boards, linked to departments and users
- **BoardLists:** Lists within boards
- **Tasks:** Cards within lists, assignable to users
- **Tags:** Labels for tasks
- **Pivot Tables:** For many-to-many relations (task_members, task_tags)

## Getting Started

1. Clone the repository
2. Install dependencies (`composer install`, `npm install`)
3. Set up `.env` and database
4. Run migrations and seeders:
    ```
    php artisan migrate --seed
    ```
5. Start development servers:
    ```
    php artisan serve
    npm run dev
    ```

## Contributing

Pull requests are welcome. For major changes, open an issue first.

## License

MIT