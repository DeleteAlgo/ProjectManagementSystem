import React from "react";

export function Input({ className = "", ...props }) {
  return (
    <input
      className={`px-3 py-2 border rounded bg-gray-900 text-white ${className}`}
      {...props}
    />
  );
}