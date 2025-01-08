import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export function AddAccountButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleAddAccount = () => {
    setIsOpen(true);
    // Add modal logic here
  };

  return (
    <button
      onClick={handleAddAccount}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
    >
      <Plus className="h-5 w-5 mr-2" />
      Add Account
    </button>
  );
}