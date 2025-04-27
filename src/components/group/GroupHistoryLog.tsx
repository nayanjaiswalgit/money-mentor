// Removed unused import React

export default function GroupHistoryLog({ history }: { history: any[] }) {
  return (
    <div className="mb-4">
      <h2 className="font-semibold text-lg mb-2">Group Activity</h2>
      <ul>
        {history.map((item, idx) => (
          <li key={idx}>
            {item.type === 'expense' ? (
              <span>Expense: {item.description} - {item.amount} - Paid by {item.paid_by_id}</span>
            ) : (
              <span>Settlement: {item.from_user_id} paid {item.to_user_id} {item.amount}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
