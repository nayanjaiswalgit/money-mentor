import React from 'react';

import { BalanceCard } from '../components/dashboard/BalanceCard';
import { ExpenseChart } from '../components/dashboard/ExpenseChart';
import { RecentTransactions } from '../components/dashboard/RecentTransactions';
import { AccountCard } from '../components/accounts/AccountCard';
import { AccountsPage } from '../components/accounts/AccountsPage';

function DashboardPage() {
  // Temporary route handling


        return (
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
        );
    }

  

export default DashboardPage;