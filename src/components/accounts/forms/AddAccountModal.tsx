import React, { useState } from 'react';
import { X } from 'lucide-react';
import { AccountForm } from './AccountForm';
import { CreditCardForm } from './CreditCardForm';
import { AccountType } from '../../../types';

interface AddAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function AddAccountModal({ isOpen, onClose, onSubmit }: AddAccountModalProps) {
  const [isCreditCard, setIsCreditCard] = useState(false);
  const [formData, setFormData] = useState({
    // Account fields
    accountName: '',
    accountType: 'checking' as AccountType,
    accountNumber: '',
    routingNumber: '',
    
    // Credit card fields
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: '',
    creditLimit: '',
    billingAddress: '',
  });

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, isCreditCard });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            Add {isCreditCard ? 'Credit Card' : 'Account'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="isCreditCard"
              checked={isCreditCard}
              onChange={(e) => setIsCreditCard(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="isCreditCard" className="ml-2 block text-sm text-gray-900">
              This is a credit card
            </label>
          </div>

          {isCreditCard ? (
            <CreditCardForm
              {...formData}
              onFieldChange={handleFieldChange}
            />
          ) : (
            <AccountForm
              {...formData}
              onFieldChange={handleFieldChange}
            />
          )}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
            >
              Add {isCreditCard ? 'Credit Card' : 'Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}