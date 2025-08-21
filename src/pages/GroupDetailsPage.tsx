// TODO: Refactor this page to use useApiQuery/useApiMutation and API_ENDPOINTS for all group details-related API calls. Remove all usage of groupApi.

import React from 'react';
import ExpenseForm from '../components/group/ExpenseForm';
import SettlementForm from '../components/group/SettlementForm';
import GroupBalanceSheet from '../components/group/GroupBalanceSheet';
import GroupHistoryLog from '../components/group/GroupHistoryLog';
import { useApiQuery } from '../hooks/useApiQuery';

interface GroupDetailsPageProps {
  groupId: string;
}

export default function GroupDetailsPage({ groupId }: GroupDetailsPageProps) {
  const { data: expenses = [] } = useApiQuery<any[]>(['groupExpenses', groupId], `/groups/${groupId}/expenses`);
  const { data: settlements = [] } = useApiQuery<any[]>(['groupSettlements', groupId], `/groups/${groupId}/settlements`);
  const { data: balances = {} } = useApiQuery<any>(['groupBalances', groupId], `/groups/${groupId}/balances`);
  const { data: history = [] } = useApiQuery<any[]>(['groupHistory', groupId], `/groups/${groupId}/history`);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Group Details</h1>
      <ExpenseForm groupId={groupId} onExpenseAdded={() => {}} />
      <SettlementForm groupId={groupId} onSettlementAdded={() => {}} />
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
