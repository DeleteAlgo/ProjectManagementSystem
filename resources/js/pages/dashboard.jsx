import { useState, useEffect } from "react";
import { router } from '@inertiajs/react';

export default function Dashboard() {
  const [projects] = useState([
    { id: 1, name: "Website Redesign", status: "In Progress", owner: "Alice" },
    { id: 2, name: "Mobile App", status: "Completed", owner: "Bob" },
    { id: 3, name: "Marketing Campaign", status: "Pending", owner: "Charlie" },
  ]);

  // If using react-router v6+
  const user = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
    const token = localStorage.getItem("auth_token");
    
    
    if (!token) {
        router.visit('/');
    }
    }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-indigo-600 p-4 flex justify-between items-center">
        <div className="text-white font-bold text-xl">Project Management Dashboard</div>
        <div>
            <h1 className="text-white mr-4 inline-block">Welcome, {user.name || "User"}</h1>
          <button className="bg-white text-indigo-600 px-4 py-2 rounded hover:bg-indigo-100 font-semibold">
            Logout
          </button>
        </div>
      </nav>
      <main className="max-w-5xl mx-auto py-10">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Projects Overview</h1>
        <div className="bg-white shadow rounded-lg p-6">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="px-4 py-2 text-left">Project Name</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Owner</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b">
                  <td className="px-4 py-2">{project.name}</td>
                  <td className="px-4 py-2">
                    <span
                      className={
                        "px-2 py-1 rounded text-xs font-semibold " +
                        (project.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : project.status === "In Progress"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700")
                      }
                    >
                      {project.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">{project.owner}</td>
                  <td className="px-4 py-2">
                    <button className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600 text-sm">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}