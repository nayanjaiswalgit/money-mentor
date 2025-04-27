import React, { useEffect, useState } from 'react';
import { groupApi } from '../services/groupApi';

import { BalanceCard } from '../components/dashboard/BalanceCard';
import { ExpenseChart } from '../components/dashboard/ExpenseChart';
import { RecentTransactions } from '../components/dashboard/RecentTransactions';
import { AccountCard } from '../components/accounts/AccountCard';
import { AccountsPage } from '../components/accounts/AccountsPage';

export default function DashboardPage() {
  const [groups, setGroups] = useState<any[]>([]);
  const [balances, setBalances] = useState<any>({});
  const [recent, setRecent] = useState<any[]>([]);

  useEffect(() => {
    // Replace with actual group fetching logic if available
    // Example: fetch user's groups, then for each group, fetch balances and recent transactions
    // Here, we assume a placeholder group list
    const userGroups = JSON.parse(localStorage.getItem('userGroups') || '[]');
    setGroups(userGroups);
    // Aggregate balances and recent transactions
    Promise.all(
      userGroups.map((g: any) =>
        Promise.all([
          groupApi.getBalances(g.id),
          groupApi.getHistory(g.id)
        ]).then(([bal, hist]) => ({ groupId: g.id, balances: bal, history: hist }))
      )
    ).then((results) => {
      const allBalances: any = {};
      let allRecent: any[] = [];
      results.forEach(({ groupId, balances, history }) => {
        allBalances[groupId] = balances;
        allRecent = allRecent.concat(history.slice(-3).map((h: any) => ({ ...h, groupId })));
      });
      setBalances(allBalances);
      setRecent(allRecent);
    });
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div>
        <h2 className="font-semibold text-lg mb-2">Your Groups</h2>
        <ul>
          {groups.map((g) => (
            <li key={g.id}>{g.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="font-semibold text-lg mb-2">Recent Transactions</h2>
        <ul>
          {recent.map((item, idx) => (
            <li key={idx}>
              [{item.groupId}] {item.type === 'expense' ? `Expense: ${item.description} - ${item.amount}` : `Settlement: ${item.from_user_id} paid ${item.to_user_id} ${item.amount}`}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="font-semibold text-lg mb-2">Pending Balances</h2>
        <ul>
          {Object.entries(balances).map(([groupId, bal]: any) => (
            <li key={groupId}>
              Group {groupId}:
              <ul>
                {Object.entries(bal).map(([userId, amount]: any) => (
                  <li key={userId}>
                    User {userId}: {amount < 0 ? `owes ${-amount}` : `is owed ${amount}`}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      <main className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <BalanceCard
            title="Total Balance"
            amount={125000}
            trend="up"
            percentage={12}
          />
          <BalanceCard
            title="Total Income"
            amount={75000}
            trend="up"
            percentage={8}
          />
          <BalanceCard
            title="Total Expenses"
            amount={45000}
            trend="down"
            percentage={5}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ExpenseChart />
          <RecentTransactions />
        </div>
        <AccountsPage/>
      </main>
    </div>
  );
}