import React from 'react';
import { Layout } from '../components/Layout';
import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  CreditCard,
  TrendingUp,
  Activity,
} from 'lucide-react';

export function Dashboard() {
  // Mock data - replace with actual API calls
  const stats = [
    {
      name: 'Total Balance',
      value: '$12,345.67',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
    },
    {
      name: 'Monthly Income',
      value: '$4,567.89',
      change: '+8.2%',
      trend: 'up',
      icon: TrendingUp,
    },
    {
      name: 'Monthly Expenses',
      value: '$3,210.98',
      change: '-2.4%',
      trend: 'down',
      icon: CreditCard,
    },
    {
      name: 'Pending Transactions',
      value: '12',
      change: '+3',
      trend: 'up',
      icon: Activity,
    },
  ];

  const recentTransactions = [
    {
      id: 1,
      description: 'Salary Deposit',
      amount: '+$4,500.00',
      date: '2024-03-15',
      category: 'Income',
    },
    {
      id: 2,
      description: 'Rent Payment',
      amount: '-$1,200.00',
      date: '2024-03-14',
      category: 'Housing',
    },
    {
      id: 3,
      description: 'Grocery Shopping',
      amount: '-$85.50',
      date: '2024-03-13',
      category: 'Food',
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back! Here's an overview of your finances.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.name}
                className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
              >
                <dt>
                  <div className="absolute rounded-md bg-indigo-500 p-3">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <p className="ml-16 truncate text-sm font-medium text-gray-500">
                    {stat.name}
                  </p>
                </dt>
                <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                  <p className="text-2xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                  <p
                    className={`ml-2 flex items-baseline text-sm font-semibold ${
                      stat.trend === 'up'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                    <span className="sr-only">
                      {stat.trend === 'up' ? 'Increased' : 'Decreased'} by
                    </span>
                    {stat.change}
                  </p>
                </dd>
              </div>
            );
          })}
        </div>

        {/* Recent Transactions */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Recent Transactions
            </h3>
          </div>
          <div className="border-t border-gray-200">
            <ul role="list" className="divide-y divide-gray-200">
              {recentTransactions.map((transaction) => (
                <li key={transaction.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <p className="truncate text-sm font-medium text-gray-900">
                        {transaction.description}
                      </p>
                      <p className="ml-2 flex-shrink-0 text-sm text-gray-500">
                        {transaction.category}
                      </p>
                    </div>
                    <div className="ml-2 flex flex-shrink-0">
                      <p
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          transaction.amount.startsWith('+')
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {transaction.amount}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        {transaction.date}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
} 