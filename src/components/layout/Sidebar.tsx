import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Wallet,NotebookText  ,
  Receipt,
  PieChart,
  Users,
  Settings,
  CreditCard,
  DollarSign,
} from 'lucide-react';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}
const navItems: NavItem[] = [
  { icon: <LayoutDashboard size={20} />, label: 'Dashboard', href: '/dashboard' },
  {  icon: <NotebookText   size={20}/>,label: 'Statements', href: '/statement' },
  { icon: <Wallet size={20} />, label: 'Accounts', href: '/accounts' },

  { icon: <DollarSign size={20} />, label: 'Expenses', href: '/expenses' },
  { icon: <Receipt size={20} />, label: 'Transactions', href: '/transactions' },
  { icon: <PieChart size={20} />, label: 'Reports', href: '/reports' },
  { icon: <Users size={20} />, label: 'Groups', href: '/groups' },
  { icon: <Settings size={20} />, label: 'Settings', href: '/settings' },

];

export function Sidebar() {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
      <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto">
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
               <span className="mr-3">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}