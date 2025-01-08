import React from 'react';

interface DropdownItemProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export function DropdownItem({ children, onClick }: DropdownItemProps) {
  return (
    <button
      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      onClick={onClick}
    >
      {children}
    </button>
  );
}