import React from "react";

export function Badge({ children, className = "", ...props }) {
  return (
    <span
      className={`inline-block px-2 py-1 text-xs font-semibold rounded bg-indigo-600 text-white ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}