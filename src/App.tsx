import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { AccountsPage } from './pages/AccountsPage';
import { StatementsPage } from './components/statements/StatementsPage';
import { SplitExpensePage } from './components/split/SplitExpensePage';
import { RecurringExpensesPage } from './components/recurring/RecurringExpensesPage';
import { MoneyTrackingPage } from './components/money-tracking/MoneyTrackingPage';
import { SettingsPage } from './pages/SettingsPage';
import { GroupsPage } from './pages/GroupsPage';
import { ReportsPage } from './pages/ReportsPage';
import { TransactionsPage as TransactionsPageDetail } from './components/transactions/TransactionsPage';
import { ExpensesPage } from './pages/ExpensesPage';
import { TransactionsPage } from './pages/TransactionsPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-gray-100">
                  <Header />
                  <Sidebar />
                  <main className="lg:pl-64">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <Routes>
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/statement" element={<StatementsPage />} />
                        <Route path="/expenses" element={<ExpensesPage />} />
                        <Route path="/statements/:statementId/transactions" element={<TransactionsPageDetail />} />
                        <Route path="/recurring" element={<RecurringExpensesPage />} />
                        <Route path="/money-tracking" element={<MoneyTrackingPage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                        <Route path="/groups" element={<GroupsPage />} />
                        <Route path="/groups/:id/detail" element={<SplitExpensePage />} />
                        <Route path="/accounts" element={<AccountsPage />} />
                        <Route path="/transactions" element={<TransactionsPage />} />
                        <Route path="/reports" element={<ReportsPage />} />
                      </Routes>
                    </div>
                  </main>
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;