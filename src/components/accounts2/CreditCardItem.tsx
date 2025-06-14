import React from 'react';
import { DollarSign, CreditCard, Banknote } from 'lucide-react';
import type { Card } from '../../types';

interface CreditCardItemProps {
  card: Card;
}

export function CreditCardItem({ card }: CreditCardItemProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between h-full">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{card.name}</h3>
        <p className="text-sm text-gray-500 mb-4">Card Type: {card.cardType}</p>

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
          <div className="flex items-center">
            <CreditCard size={18} className="mr-2 text-gray-500" />
            <span>Last 4 Digits: {card.last4Digits}</span>
          </div>
          <div className="flex items-center">
            <DollarSign size={18} className="mr-2 text-gray-500" />
            <span>Balance: {card.balance.toFixed(2)} {card.currency}</span>
          </div>
          <div className="flex items-center">
            <Banknote size={18} className="mr-2 text-gray-500" />
            <span>Credit Limit: {card.creditLimit.toFixed(2)} {card.currency}</span>
          </div>
        </div>
      </div>
      <div className="mt-6 text-right">
        <button
          onClick={() => console.log('Manage card:', card.id)}
          className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
        >
          Manage Card
        </button>
      </div>
    </div>
  );
}
