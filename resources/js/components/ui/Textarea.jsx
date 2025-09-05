import React from "react";

export function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={`w-full px-3 py-2 border rounded bg-gray-900 text-white resize-none ${className}`}
      {...props}
    />
  );
}