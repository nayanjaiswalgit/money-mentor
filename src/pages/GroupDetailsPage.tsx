import React, { useEffect, useState } from 'react';
import { groupApi } from '../services/groupApi';
import ExpenseForm from '../components/group/ExpenseForm';
import SettlementForm from '../components/group/SettlementForm';
import GroupBalanceSheet from '../components/group/GroupBalanceSheet';
import GroupHistoryLog from '../components/group/GroupHistoryLog';

interface GroupDetailsPageProps {
  groupId: string;
}

export default function GroupDetailsPage({ groupId }: GroupDetailsPageProps) {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [settlements, setSettlements] = useState<any[]>([]);
  const [balances, setBalances] = useState<any>({});
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    groupApi.getExpenses(groupId).then((data) => setExpenses(Array.isArray(data) ? data : []));
    groupApi.getSettlements(groupId).then((data) => setSettlements(Array.isArray(data) ? data : []));
    groupApi.getBalances(groupId).then((data) => setBalances(data || {}));
    groupApi.getHistory(groupId).then((data) => setHistory(Array.isArray(data) ? data : []));
  }, [groupId]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Group Details</h1>
      <ExpenseForm groupId={groupId} onExpenseAdded={() => groupApi.getExpenses(groupId).then((data) => setExpenses(Array.isArray(data) ? data : []))} />
      <SettlementForm groupId={groupId} onSettlementAdded={() => groupApi.getSettlements(groupId).then((data) => setSettlements(Array.isArray(data) ? data : []))} />
      <GroupBalanceSheet balances={balances} />
      <GroupHistoryLog history={history} />
      {/* Expenses List */}
      <div>
        <h2 className="font-semibold text-lg mb-2">Expenses</h2>
        <ul>
          {expenses.map((exp) => (
            <li key={exp.id}>{exp.description} - {exp.amount} - Paid by {exp.paid_by}</li>
          ))}
        </ul>
      </div>
      {/* Settlements List */}
      <div>
        <h2 className="font-semibold text-lg mb-2">Settlements</h2>
        <ul>
          {settlements.map((s) => (
            <li key={s.id}>{s.from_user} paid {s.to_user} {s.amount}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
