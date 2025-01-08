import React from 'react';
import { CreditCard, Calendar, Lock } from 'lucide-react';
import { FormInput } from './FormInput';

interface CreditCardFormProps {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
  creditLimit: string;
  billingAddress: string;
  onFieldChange: (field: string, value: string) => void;
}

export function CreditCardForm({
  cardNumber,
  cardholderName,
  expiryDate,
  cvv,
  creditLimit,
  billingAddress,
  onFieldChange,
}: CreditCardFormProps) {
  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  const formatExpiryDate = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d{0,2})/, '$1/$2')
      .substr(0, 5);
  };

  return (
    <div className="space-y-4">
      <FormInput
        id="cardNumber"
        label="Card Number"
        value={cardNumber}
        onChange={(value) => onFieldChange('cardNumber', formatCardNumber(value))}
        icon={CreditCard}
        placeholder="1234 5678 9012 3456"
        maxLength={19}
        pattern="[\d\s]{19}"
        required
      />

      <FormInput
        id="cardholderName"
        label="Cardholder Name"
        value={cardholderName}
        onChange={(value) => onFieldChange('cardholderName', value)}
        placeholder="Name as shown on card"
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <FormInput
          id="expiryDate"
          label="Expiry Date"
          value={expiryDate}
          onChange={(value) => onFieldChange('expiryDate', formatExpiryDate(value))}
          icon={Calendar}
          placeholder="MM/YY"
          maxLength={5}
          required
        />

        <FormInput
          id="cvv"
          label="CVV"
          value={cvv}
          onChange={(value) => onFieldChange('cvv', value)}
          icon={Lock}
          type="password"
          placeholder="123"
          maxLength={4}
          pattern="\d{3,4}"
          required
        />
      </div>

      <FormInput
        id="creditLimit"
        label="Credit Limit"
        value={creditLimit}
        onChange={(value) => onFieldChange('creditLimit', value)}
        type="number"
        placeholder="Enter credit limit"
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Billing Address
        </label>
        <textarea
          value={billingAddress}
          onChange={(e) => onFieldChange('billingAddress', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={3}
          required
        />
      </div>
    </div>
  );
}