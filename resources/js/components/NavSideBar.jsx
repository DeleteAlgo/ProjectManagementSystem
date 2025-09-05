import React from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavSideBar({ navigation, onSelect, selectedPage })
{
    return (
        <nav className="flex-1 space-y-1 px-2">
            {navigation.map((item) => (
                <a
                key={item.name}
                href="#"
                onClick={() => onSelect(item.name)}
                className={classNames(
                    selectedPage === item.name
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white",
                    "group flex items-center rounded-md px-2 py-2 text-sm font-medium"
                )}
                >
                <item.icon
                    className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                />
                {item.name}
                </a>
            ))}
        </nav>
    );
}
