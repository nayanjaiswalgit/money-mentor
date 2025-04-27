import React, { useState } from 'react';
import { groupApi } from '../../services/groupApi';

export default function SettlementForm({ groupId, onSettlementAdded }: { groupId: string, onSettlementAdded: () => void }) {
  const [toUser, setToUser] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await groupApi.addSettlement(groupId, { to_user: toUser, amount, description, date });
    setToUser(''); setAmount(''); setDescription(''); setDate('');
    onSettlementAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-2">
      <input className="input" placeholder="To User ID" value={toUser} onChange={e => setToUser(e.target.value)} required />
      <input className="input" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} required type="number" />
      <input className="input" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <input className="input" type="date" value={date} onChange={e => setDate(e.target.value)} required />
      <button className="btn-primary" type="submit">Add Settlement</button>
    </form>
  );
}
