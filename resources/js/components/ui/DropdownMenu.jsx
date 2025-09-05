import React, { useState } from "react";

export function DropdownMenu({ open, onOpenChange, children }) {
  // Use controlled state if provided, otherwise fallback to internal state
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = open !== undefined ? open : internalOpen;
  const setIsOpen = onOpenChange || setInternalOpen;

  return (
    <div className="relative inline-block">
      {React.Children.map(children, (child) => {
        // Forward open state and handler to trigger/content if needed
        if (child.type.displayName === "DropdownMenuTrigger") {
          return React.cloneElement(child, { onClick: () => setIsOpen(!isOpen) });
        }
        if (child.type.displayName === "DropdownMenuContent") {
          return isOpen ? child : null;
        }
        return child;
      })}
    </div>
  );
}

export function DropdownMenuTrigger({ asChild, children, ...props }) {
  const child = React.Children.only(children);
  return asChild
    ? React.cloneElement(child, props)
    : <button {...props}>{children}</button>;
}
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

export function DropdownMenuContent({ children, className = "", align = "start" }) {
  return (
    <div
      className={`absolute z-10 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${className}`}
      style={{ right: align === "end" ? 0 : "auto", left: align === "start" ? 0 : "auto" }}
    >
      {children}
    </div>
  );
}
DropdownMenuContent.displayName = "DropdownMenuContent";

export function DropdownMenuItem({ children, className = "", ...props }) {
  return (
    <button
      className={`block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}