import React from "react";

export function Card({ children, className = "", ...props }) {
  return (
    <div className={`rounded-lg bg-gray-800 shadow ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "", ...props }) {
  return (
    <div className={`px-4 py-3 border-b border-gray-700 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = "", ...props }) {
  return (
    <div className={`px-4 py-3 ${className}`} {...props}>
      {children}
    </div>
  );
}