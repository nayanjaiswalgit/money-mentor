import React from 'react';
import { CreditCard } from 'lucide-react';
import type { Card } from '../../types';

interface CardsListProps {
  cards: Card[];
}

export function CardsList({ cards }: CardsListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card) => (
        <div key={card.id} className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg p-6 text-white">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="font-semibold">{card.name}</h3>
              <p className="text-sm opacity-80">{card.bank}</p>
            </div>
            <CreditCard size={24} />
          </div>
          <p className="text-lg mb-4">•••• {card.lastFourDigits}</p>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-80">Available Credit</p>
              <p className="font-semibold">₹{(card.limit - card.spent).toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-80">Credit Limit</p>
              <p className="font-semibold">₹{card.limit.toLocaleString()}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}