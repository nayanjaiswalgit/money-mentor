import React from 'react';

interface DropdownProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export function Dropdown({ children, isOpen, onClose }: DropdownProps) {
  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0" 
        onClick={onClose}
      />
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
        {children}
      </div>
    </>
  );
}