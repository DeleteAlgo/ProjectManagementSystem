import React from "react";

export function Avatar({ children, className = "", ...props }) {
  return (
    <span className={`inline-block rounded-full overflow-hidden bg-gray-700 ${className}`} {...props}>
      {children}
    </span>
  );
}

export function AvatarImage({ src, alt = "", className = "", ...props }) {
  return (
    <img
      src={src}
      alt={alt}
      className={`object-cover w-10 h-10 ${className}`}
      {...props}
    />
  );
}

export function AvatarFallback({ children, className = "", ...props }) {
  return (
    <span className={`flex items-center justify-center w-10 h-10 bg-gray-500 text-white ${className}`} {...props}>
      {children}
    </span>
  );
}