import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useCreateAccountMutation, useGetBankNamesQuery } from '../../../app/api/accountApi'; // Assuming the hook is imported from an api file

interface AddAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function AddAccountModal({ isOpen, onClose, onSubmit }: AddAccountModalProps) {
  const [isCreditCard, setIsCreditCard] = useState(false);
  const [formData, setFormData] = useState({
    accountName: '',
    accountType: 'bank' as string, // matches backend choices
    accountNumber: '',
    creditLimit: '', // only for credit cards
    bankName: '', // optional
    currency: '',
    parentAccount: '', // optional
  });

  const [createAccount, { isLoading, isSuccess, error }] = useCreateAccountMutation();
  const { data: bankNames, isLoading: isBanksLoading, error: banksError } = useGetBankNamesQuery({});

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: any = {
      account_name: formData.accountName,
      type: isCreditCard ? "credit_card" : formData.accountType,
      account_number: formData.accountNumber,
      currency: formData.currency,
    };
    if (isCreditCard && formData.creditLimit) payload.limit = formData.creditLimit;
    if (formData.bankName) payload.bank_name = formData.bankName;
    if (formData.parentAccount) payload.parent_account = formData.parentAccount;
    try {
      await createAccount(payload).unwrap();
      onSubmit({ ...formData, isCreditCard });
      onClose();
    } catch (err) {
      console.error(err);
    }
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
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Account Name</label>
            <input
              type="text"
              value={formData.accountName}
              onChange={e => handleFieldChange('accountName', e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Account Number</label>
            <input
              type="text"
              value={formData.accountNumber}
              onChange={e => handleFieldChange('accountNumber', e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          {!isCreditCard && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Account Type</label>
              <select
                value={formData.accountType}
                onChange={e => handleFieldChange('accountType', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="bank">Bank</option>
                <option value="digital_wallet">Digital Wallet</option>
                <option value="cash">Cash</option>
                <option value="investment">Investment</option>
              </select>
            </div>
          )}
          {isCreditCard && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Credit Limit</label>
              <input
                type="number"
                value={formData.creditLimit}
                onChange={e => handleFieldChange('creditLimit', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Currency</label>
            <input
              type="text"
              value={formData.currency}
              onChange={e => handleFieldChange('currency', e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Bank Name (optional)</label>
            <select
              value={formData.bankName}
              onChange={e => handleFieldChange('bankName', e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select a bank</option>
              {isBanksLoading && <option>Loading...</option>}
              {banksError && <option>Error loading banks</option>}
              {bankNames && bankNames.results && bankNames.results.map((bank: any) => (
                <option key={bank.id} value={bank.name}>{bank.name}</option>
              ))}
              {bankNames && !bankNames.results && Array.isArray(bankNames) && bankNames.map((bank: any) => (
                <option key={bank.id} value={bank.name}>{bank.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Parent Account (optional)</label>
            <input
              type="text"
              value={formData.parentAccount}
              onChange={e => handleFieldChange('parentAccount', e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
}