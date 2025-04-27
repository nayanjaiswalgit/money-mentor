import React, { useState } from 'react';
import { useMonthlyBalances } from '../../hooks/useMonthlyBalances';
import { useIncomes } from '../../hooks/useIncomes';
import { useExpenses } from '../../hooks/useExpenses';
import { useAccounts } from '../../hooks/useAccounts';
import { ArrowUpCircle, ArrowDownCircle, BarChart2, PieChart, DollarSign, AlertTriangle } from 'lucide-react';
import { formatDate, formatDateTime } from '../../constants/dateFormat';

export function MonthlySummaryInsights() {
  const { data: balances = [] } = useMonthlyBalances() as { data: any[] };
  const { data: incomes = [] } = useIncomes() as { data: any[] };
  const { data: accounts = [] } = useAccounts() as { data: any[] };
  const { expenses = [], loading, error } = useExpenses();

  // Aggregate insights
  const totalBalance = balances.reduce((sum: number, b: any) => sum + (parseFloat(b.balance) || 0), 0);
  const totalIncome = incomes.reduce((sum: number, i: any) => sum + (parseFloat(i.income_amount) || 0), 0);
  const totalExpense = expenses.reduce((sum: number, e: any) => sum + (parseFloat(e.amount) || 0), 0);

  // Calculate tracked percentage
  const trackedPercent = totalIncome > 0 ? Math.min(100, (totalExpense / totalIncome) * 100) : 0;

  // Expenses by account
  const expensesByAccount = accounts.reduce((acc: Record<string, number>, account: any) => {
    acc[account.id] = expenses.filter(e => e.accountId === account.id).reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);
    return acc;
  }, {});

  // Negative balance accounts
  const negativeBalances = balances.filter((b: any) => parseFloat(b.balance) < 0);

  // Grouping state
  const [groupBy, setGroupBy] = useState<'month' | 'account'>('month');
  const [activeTab, setActiveTab] = useState<'overview' | 'balances' | 'income'>('overview');

  // Helper to group balances by month or account
  const groupBalances = () => {
    if (groupBy === 'month') {
      // Group by year-month
      const grouped: { [key: string]: any[] } = {};
      balances.forEach((b: any) => {
        const key = `${b.year}-${String(b.month).padStart(2, '0')}`;
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(b);
      });
      return grouped;
    } else {
      // Group by account
      const grouped: { [key: string]: any[] } = {};
      balances.forEach((b: any) => {
        const key = b.account || 'Unknown';
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(b);
      });
      return grouped;
    }
  };

  // Group incomes by month
  const groupIncomesByMonth = () => {
    const grouped: { [key: string]: any[] } = {};
    incomes.forEach((income: any) => {
      // Extract year and month from date_received (format: YYYY-MM-DD)
      const dateParts = income.date_received.split('-');
      if (dateParts.length >= 2) {
        const key = `${dateParts[0]}-${dateParts[1]}`;
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(income);
      }
    });
    return grouped;
  };

  const groupedBalances = groupBalances();
  const groupedIncomes = groupIncomesByMonth();

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-500">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm font-medium text-gray-500">Total Balance</div>
              <div className="text-2xl font-bold mt-1">₹{totalBalance.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            </div>
            <div className="bg-blue-100 p-2 rounded-full">
              <DollarSign className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-green-500">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm font-medium text-gray-500">Total Income</div>
              <div className="text-2xl font-bold text-green-600 mt-1">₹{totalIncome.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            </div>
            <div className="bg-green-100 p-2 rounded-full">
              <ArrowUpCircle className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-red-400">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm font-medium text-gray-500">Total Expenses</div>
              <div className="text-2xl font-bold text-red-600 mt-1">₹{totalExpense.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            </div>
            <div className="bg-red-100 p-2 rounded-full">
              <ArrowDownCircle className="h-6 w-6 text-red-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-red-500">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm font-medium text-gray-500">Negative Balances</div>
              <div className="text-2xl font-bold text-red-600 mt-1">{negativeBalances.length}</div>
            </div>
            <div className="bg-red-100 p-2 rounded-full">
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </div>
          </div>
          {negativeBalances.length > 0 && (
            <div className="mt-2 text-xs text-red-600 flex items-center">
              <AlertTriangle className="h-3 w-3 mr-1" />
              {negativeBalances.length} account(s) with negative balance
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col justify-between">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Tracked Expenses %</h3>
          <div className="flex items-center">
            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
              <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${trackedPercent}%` }}></div>
            </div>
            <span className="ml-2 text-sm font-semibold">{trackedPercent.toFixed(1)}%</span>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col justify-between">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Expenses by Account</h3>
          <ul className="text-sm">
            {accounts.map((acc: any) => (
              <li key={acc.id} className="flex justify-between">
                <span>{acc.name} ({acc.bankName})</span>
                <span className="font-semibold text-red-600">₹{(expensesByAccount[acc.id] || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex border-b">
          <button
            className={`px-4 py-3 text-sm font-medium flex items-center ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('overview')}
          >
            <BarChart2 className="h-4 w-4 mr-2" />
            Overview
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium flex items-center ${activeTab === 'balances' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('balances')}
          >
            <DollarSign className="h-4 w-4 mr-2" />
            Balances
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium flex items-center ${activeTab === 'income' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('income')}
          >
            <ArrowUpCircle className="h-4 w-4 mr-2" />
            Income
          </button>
        </div>

        <div className="p-4">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Financial Overview</h3>
                <div className="text-sm text-gray-500">{Object.keys(groupedBalances).length} periods</div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">Income vs. Balance</div>
                    <div className="h-40 flex items-end justify-around bg-white p-2 rounded border">
                      <div className="relative h-full w-16">
                        <div 
                          className="absolute bottom-0 w-full bg-green-500 rounded-t"
                          style={{ height: `${Math.min(100, (totalIncome / (totalIncome + Math.abs(totalBalance)) * 100) || 0)}%` }}
                        ></div>
                        <div className="absolute -bottom-6 w-full text-center text-xs">Income</div>
                      </div>
                      <div className="relative h-full w-16">
                        <div 
                          className="absolute bottom-0 w-full bg-blue-500 rounded-t"
                          style={{ height: `${Math.min(100, (Math.abs(totalBalance) / (totalIncome + Math.abs(totalBalance)) * 100) || 0)}%` }}
                        ></div>
                        <div className="absolute -bottom-6 w-full text-center text-xs">Balance</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">Quick Stats</div>
                    <div className="bg-white p-3 rounded border space-y-2">
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Avg. Income:</span>
                        <span className="text-xs font-medium">₹{incomes.length ? (totalIncome / incomes.length).toLocaleString(undefined, {maximumFractionDigits: 0}) : 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Avg. Balance:</span>
                        <span className="text-xs font-medium">₹{balances.length ? (totalBalance / balances.length).toLocaleString(undefined, {maximumFractionDigits: 0}) : 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Total Accounts:</span>
                        <span className="text-xs font-medium">{new Set(balances.map(b => b.account)).size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Income Sources:</span>
                        <span className="text-xs font-medium">{new Set(incomes.map(i => i.income_source)).size}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Balances Tab */}
          {activeTab === 'balances' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Account Balances</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Group by:</span>
                  <div className="flex rounded-md overflow-hidden border">
                    <button
                      className={`px-3 py-1 text-xs font-medium ${groupBy === 'month' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
                      onClick={() => setGroupBy('month')}
                    >
                      Month
                    </button>
                    <button
                      className={`px-3 py-1 text-xs font-medium ${groupBy === 'account' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
                      onClick={() => setGroupBy('account')}
                    >
                      Account
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                {Object.keys(groupedBalances).length === 0 ? (
                  <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                    <PieChart className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                    <p>No balance data available</p>
                  </div>
                ) : (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {groupBy === 'month' ? 'Month' : 'Account'}
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {Object.entries(groupedBalances).map(([group, items]) => {
                        const totalGroupBalance = items.reduce((sum, b) => sum + (parseFloat(b.balance) || 0), 0);
                        return (
                          <tr key={group} className={totalGroupBalance < 0 ? 'bg-red-50' : ''}>
                            <td className="px-4 py-3 font-medium">{group}</td>
                            <td className={`px-4 py-3 font-medium ${totalGroupBalance < 0 ? 'text-red-600' : 'text-green-600'}`}>
                              ₹{totalGroupBalance.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                            </td>
                            <td className="px-4 py-3">
                              <div className="text-xs text-gray-600 space-y-1">
                                {items.map((b: any, idx: number) => (
                                  <div key={idx} className="flex justify-between">
                                    <span>{b.account || 'N/A'}</span>
                                    <span className={parseFloat(b.balance) < 0 ? 'text-red-600' : 'text-green-600'}>₹{parseFloat(b.balance).toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                                  </div>
                                ))}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {/* Income Tab */}
          {activeTab === 'income' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Income Breakdown</h3>
                <div className="text-sm text-gray-500">{incomes.length} entries</div>
              </div>
              
              <div className="overflow-x-auto">
                {incomes.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                    <ArrowUpCircle className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                    <p>No income data available</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Monthly Income Summary */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Monthly Income</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {Object.entries(groupedIncomes).map(([month, items]) => {
                          const monthTotal = items.reduce((sum, i) => sum + (parseFloat(i.income_amount) || 0), 0);
                          return (
                            <div key={month} className="bg-white border rounded-lg p-3">
                              <div className="flex justify-between items-center mb-2">
                                <div className="font-medium">{month}</div>
                                <div className="text-green-600 font-medium">₹{monthTotal.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                              </div>
                              <div className="space-y-1 text-xs text-gray-600">
                                {items.map((income: any, idx: number) => (
                                  <div key={idx} className="flex justify-between">
                                    <span>{income.income_source}</span>
                                    <span>₹{parseFloat(income.income_amount).toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Income Sources */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Income Sources</h4>
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                          {incomes.map((i: any, idx: number) => (
                            <tr key={idx}>
                              <td className="px-4 py-3 font-medium">{i.income_source}</td>
                              <td className="px-4 py-3 text-green-600">₹{parseFloat(i.income_amount).toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                              <td className="px-4 py-3 text-gray-500">{formatDate(i.date_received)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
