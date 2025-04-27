// Removed unused import React

export default function GroupBalanceSheet({ balances }: { balances: Record<string, number> }) {
  return (
    <div className="mb-4">
      <h2 className="font-semibold text-lg mb-2">Balances</h2>
      <ul>
        {Object.entries(balances).map(([userId, amount]) => (
          <li key={userId} className={amount < 0 ? 'text-red-600' : 'text-green-600'}>
            User {userId}: {amount < 0 ? `owes ${-amount}` : `is owed ${amount}`}
          </li>
        ))}
      </ul>
    </div>
  );
}
