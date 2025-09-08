import React from "react";
export default function UserProfileHero({ user, onProfileClick }) {
    return (
        <div className="flex flex-shrink-0 border-t border-gray-800 p-4 cursor-pointer">
            <button
                type="button"
                className="group block flex-shrink-0 w-full text-left"
                onClick={onProfileClick}
            >
                <div className="flex items-center">
                    <img
                        className="inline-block h-9 w-9 rounded-full"
                        src={user?.profile_photo_path || "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                        alt={user?.name || "User"}
                    />
                    <div className="ml-3">
                        <p className="text-sm font-medium text-white cursor-pointer">{user?.full_name || "User"}</p>
                        <p className="text-xs font-small text-white cursor-pointer">{user?.department?.name || "Department"} Department</p>
                        <p className="text-xs font-medium text-gray-400 group-hover:text-gray-300 cursor-pointer">
                            View profile
                        </p>
                    </div>
                </div>
            </button>
        </div>
    );
}