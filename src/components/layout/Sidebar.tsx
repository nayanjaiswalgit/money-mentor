import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  NotebookText,
  Receipt,
  PieChart,
  Users,
  Settings,
  DollarSign,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}
const navItems: NavItem[] = [
  { icon: <LayoutDashboard size={20} />, label: "Dashboard", href: "/dashboard" },
  { icon: <NotebookText size={20} />, label: "Statements", href: "/statement" },
  { icon: <Wallet size={20} />, label: "Accounts", href: "/accounts" },
  { icon: <DollarSign size={20} />, label: "Expenses", href: "/expenses" },
  { icon: <Receipt size={20} />, label: "Transactions", href: "/transactions" },
  { icon: <PieChart size={20} />, label: "Reports", href: "/reports" },
  { icon: <Users size={20} />, label: "Groups", href: "/groups" },
  { icon: <Settings size={20} />, label: "Settings", href: "/settings" },
];

interface SidebarProps {
  isOpen: boolean;
  collapsed: boolean;
  onCollapseToggle: () => void;
}

// Sidebar component with improved Tailwind responsiveness and comments
export function Sidebar({ isOpen, collapsed, onCollapseToggle }: SidebarProps) {
  return (
    <div
      className={`z-40 flex flex-col bg-white border-r border-gray-200 transition-all duration-200
        fixed inset-y-0 left-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        ${collapsed ? 'w-20' : 'w-64'}
        lg:static lg:translate-x-0 lg:left-0 lg:inset-y-0
        ${collapsed ? 'lg:w-20' : 'lg:w-64'}
        shadow-lg lg:shadow-none
      `}
      style={{ minHeight: '100vh' }}
    >
      <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
        {/* Collapse button: always visible on mobile, only visible on desktop when expanded */}
        <div className={`flex items-center justify-end px-2 mb-4 ${collapsed ? '' : 'lg:hidden'}`}>
          <button
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="p-2 rounded hover:bg-gray-100 transition"
            onClick={onCollapseToggle}
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } ${collapsed ? 'justify-center' : ''}`
              }
            >
              <span className={collapsed ? '' : 'mr-3'}>{item.icon}</span>
              {!collapsed && item.label}
            </NavLink>
          ))}
        </nav>
      </div>
      {/* Mobile backdrop for closing sidebar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-30 transition-opacity duration-200 lg:hidden ${isOpen ? 'block' : 'hidden'}`}
        onClick={onCollapseToggle}
        aria-hidden="true"
      />
    </div>
  );
}