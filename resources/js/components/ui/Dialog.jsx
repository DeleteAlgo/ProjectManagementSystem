import React from "react";

export function Dialog({ open, onOpenChange, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-900 rounded-lg shadow-lg p-0 min-w-[320px]">
        {children}
      </div>
      <div
        className="fixed inset-0"
        onClick={() => onOpenChange(false)}
        style={{ zIndex: -1 }}
      />
    </div>
  );
}

export function DialogContent({ children, className = "" }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

export function DialogHeader({ children, className = "" }) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

export function DialogTitle({ children, className = "" }) {
  return <h2 className={`text-lg font-bold mb-1 ${className}`}>{children}</h2>;
}

export function DialogDescription({ children, className = "" }) {
  return <p className={`text-sm text-gray-400 mb-2 ${className}`}>{children}</p>;
}

export function DialogFooter({ children, className = "" }) {
  return <div className={`flex justify-end gap-2 mt-4 ${className}`}>{children}</div>;
}