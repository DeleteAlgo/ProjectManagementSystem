import React, { useEffect, useState } from "react";
import axios from "axios";

const teamStats = [
  { label: "Total Members", value: 12, icon: "👥" },
  { label: "Active Projects", value: 8, icon: "📈" },
  { label: "Tasks Completed", value: 156, icon: "✅" },
  { label: "Productivity", value: "87%", icon: "⏱️", progress: 87 },
];

// const team_members = res.data.team_members;

// const teamMembers = [
//   {
//     name: "Sarah Chen",
//     department: "Development",
//     avatar: "https://randomuser.me/api/portraits/women/44.jpg",
//     role: "Lead Developer",
//     projects: ["Alpha Project", "Beta Dashboard"],
//     tasksCompleted: 23,
//     productivity: 92,
//     tags: [{ label: "Lead Developer", color: "bg-blue-700" }],
//   },
//   {
//     name: "Marcus Johnson",
//     department: "Design",
//     avatar: "https://randomuser.me/api/portraits/men/32.jpg",
//     role: "UI/UX Designer",
//     projects: ["Design System", "Mobile App"],
//     tasksCompleted: 18,
//     productivity: 88,
//     tags: [{ label: "UI/UX Designer", color: "bg-purple-700" }],
//   },
//   {
//     name: "Emily Rodriguez",
//     department: "Management",
//     avatar: "https://randomuser.me/api/portraits/women/65.jpg",
//     role: "Project Manager",
//     projects: ["Alpha Project", "Client Portal"],
//     tasksCompleted: 31,
//     productivity: 95,
//     tags: [{ label: "Project Manager", color: "bg-green-700" }],
//   },
//   {
//     name: "David Kim",
//     department: "Development",
//     avatar: "https://randomuser.me/api/portraits/men/41.jpg",
//     role: "Backend Developer",
//     projects: ["API Gateway", "Database Migration"],
//     tasksCompleted: 19,
//     productivity: 85,
//     tags: [{ label: "Backend Developer", color: "bg-blue-700" }],
//   },
//   {
//     name: "Lisa Wang",
//     department: "Quality Assurance",
//     avatar: "https://randomuser.me/api/portraits/women/68.jpg",
//     role: "QA Engineer",
//     projects: ["Testing Suite", "Alpha Project"],
//     tasksCompleted: 27,
//     productivity: 90,
//     tags: [{ label: "QA Engineer", color: "bg-yellow-600" }],
//   },
//   {
//     name: "Alex Thompson",
//     department: "Operations",
//     avatar: "https://randomuser.me/api/portraits/men/52.jpg",
//     role: "DevOps Engineer",
//     projects: ["Infrastructure", "CI/CD Pipeline"],
//     tasksCompleted: 15,
//     productivity: 82,
//     tags: [{ label: "DevOps Engineer", color: "bg-red-700" }],
//   },
// ];

export default function TeamContent() {
    const [teamMembers, setTeamMembers] = useState([]);
    const [teamManager, setTeamManager] = useState(null);
    const user = JSON.parse(localStorage.getItem("user"));
    const auth_token = localStorage.getItem("auth_token");
    useEffect(() => {
        const fetchTeamMembers = async () => {
            try {
                const res = await axios.get(`/api/v1/users/${user.id}/team_members`, {
                    headers: {
                        Authorization: `Bearer ${auth_token}`,
                    },
                });

                setTeamMembers(res.data.team_members);
                setTeamManager(res.data.manager);
            } catch (error) {
                console.error("API error:", error);
                setTeamMembers([]);
                setTeamManager(null);
            }
        };
        fetchTeamMembers();
    }, []);

    return (
        <section>
        <div className="flex items-center justify-between mb-6">
            <div>
                <h1 className="text-3xl font-bold">Team Content</h1>
                <p className="text-gray-400">Manage your team members and collaboration</p>
            </div>
            <div className="flex gap-2">
                <button className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium text-white">
                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h8M8 14h8M8 18h8" />
                    </svg>
                    Filter
                </button>
                <button className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-medium text-white">
                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Add Member
                </button>
            </div>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {teamStats.map((stat) => (
            <div key={stat.label} className="rounded-lg bg-gray-800 p-4 flex flex-col">
                <span className="text-sm text-gray-400 flex items-center gap-2">
                    <span>{stat.icon}</span> {stat.label}
                </span>
                <div className="mt-2 text-2xl font-bold">{stat.value}</div>
                    {stat.progress && (
                <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
                    <div
                        className="bg-indigo-500 h-2 rounded-full"
                        style={{ width: `${stat.progress}%` }}
                        />
                    </div>
                    )}
                </div>
            ))}
            </div>
        {/* Search */}
        <div className="mb-6">
            <input
            type="text"
            placeholder="Search team members..."
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400"
            />
        </div>
        <h2 className="text-xl font-bold mb-4">Team Manager</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-5">
            {/* Team Manager */}
            {teamManager && (
                <div key={teamManager.full_name} className="rounded-lg bg-gray-800 p-6 flex flex-col">
                    <div className="flex items-center gap-4 mb-2">
                        <img
                            src={teamManager.profile_photo_path}
                            alt={teamManager.full_name}
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                            <div className="font-semibold">{teamManager.full_name}</div>
                            <div className="text-xs text-gray-400">{teamManager.role?.name}</div>
                            <div className="text-xs text-gray-400">{teamManager.department?.name}</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
        <h2 className="text-xl font-bold mb-4">Team Member</h2>
        {/* Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
            <div key={member.full_name} className="rounded-lg bg-gray-800 p-6 flex flex-col">
                <div className="flex items-center gap-4 mb-2">
                    <img
                        src={member.profile_photo_path}
                        alt={member.full_name}
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                        <div className="font-semibold">{member.full_name}</div>
                        <div className="text-xs text-gray-400">{member.role.name}</div>
                        <div className="text-xs text-gray-400">{member.department.name}</div>
                    </div>
                    {/* <div className="ml-auto flex gap-1">
                        {member.tags.map((tag) => (
                        <span
                            key={tag.label}
                            className={`px-2 py-0.5 rounded text-xs font-medium ${tag.color} text-white`}
                        >
                            {tag.label}
                        </span>
                        ))}
                    </div> */}
                </div>
                {/* <div className="mb-2">
                    <span className="text-xs text-gray-400">Current Projects</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                        {member.projects.map((proj) => (
                        <span
                            key={proj}
                            className="bg-gray-700 text-xs px-2 py-0.5 rounded text-gray-200"
                        >
                            {proj}
                        </span>
                        ))}
                    </div>
                </div> */}
                {/* <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                    <span>Tasks Completed</span>
                    <span>{member.tasksCompleted}</span>
                </div> */}
                {/* <div className="mb-2">
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                        className="bg-indigo-500 h-2 rounded-full"
                        style={{ width: `${member.productivity}%` }}
                        />
                    </div>
                </div> */}
                {/* <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                    <span>Productivity</span>
                    <span className="text-white font-semibold">{member.productivity}%</span>
                </div> */}
                <div className="flex gap-2">
                    <button className="flex-1 bg-gray-900 hover:bg-gray-700 text-white rounded-lg py-2 text-sm">
                        Chat
                    </button>
                    <button className="flex-1 bg-gray-900 hover:bg-gray-700 text-white rounded-lg py-2 text-sm">
                        Call
                    </button>
                </div>
            </div>
            ))}
        </div>
        </section>
    );
}