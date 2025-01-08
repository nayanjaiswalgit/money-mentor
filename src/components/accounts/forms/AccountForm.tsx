import React from 'react';
import { Building2 } from 'lucide-react';
import { FormInput } from './FormInput';
import { AccountType } from '../../../types';

interface AccountFormProps {
  accountName: string;
  accountType: AccountType;
  accountNumber: string;
  routingNumber: string;
  onFieldChange: (field: string, value: string) => void;
}

export function AccountForm({
  accountName,
  accountType,
  accountNumber,
  routingNumber,
  onFieldChange,
}: AccountFormProps) {
  return (
    <div className="space-y-4">
      <FormInput
        id="accountName"
        label="Account Name"
        value={accountName}
        onChange={(value) => onFieldChange('accountName', value)}
        icon={Building2}
        placeholder="e.g. Primary Checking"
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Account Type
        </label>
        <select
          value={accountType}
          onChange={(e) => onFieldChange('accountType', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="checking">Checking</option>
          <option value="savings">Savings</option>
          <option value="money_market">Money Market</option>
        </select>
      </div>

      <FormInput
        id="accountNumber"
        label="Account Number"
        value={accountNumber}
        onChange={(value) => onFieldChange('accountNumber', value)}
        placeholder="Enter account number"
        required
      />

      <FormInput
        id="routingNumber"
        label="Routing Number"
        value={routingNumber}
        onChange={(value) => onFieldChange('routingNumber', value)}
        placeholder="9 digit routing number"
        pattern="^\d{9}$"
        maxLength={9}
        required
      />
    </div>
  );
}