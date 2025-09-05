import React from "react";
export default function NavUserTeams({ teams }) {
    return (
        <div className="mt-6 px-2">
            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Your teams
            </p>
            <div className="mt-2 space-y-1">
                {teams.map((team) => (
                <a
                    key={team.id}
                    href="#"
                    className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white"
                >
                    <span className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 text-xs font-medium text-gray-400">
                    {team.initials}
                    </span>
                    <span className="truncate">{team.name}</span>
                </a>
                ))}
            </div>
        </div>
    );
}
