import React from 'react';
import { User, Bell, Shield, CreditCard, HelpCircle } from 'lucide-react';

const settingSections = [
  {
    title: 'Profile Settings',
    icon: <User size={20} />,
    items: [
      { label: 'Personal Information', description: 'Update your personal details' },
      { label: 'Email & Password', description: 'Manage your login credentials' },
    ],
  },
  {
    title: 'Notifications',
    icon: <Bell size={20} />,
    items: [
      { label: 'Push Notifications', description: 'Manage mobile notifications' },
      { label: 'Email Notifications', description: 'Configure email alerts' },
    ],
  },
  {
    title: 'Security',
    icon: <Shield size={20} />,
    items: [
      { label: 'Two-Factor Authentication', description: 'Add an extra layer of security' },
      { label: 'Connected Devices', description: 'Manage your logged-in devices' },
    ],
  },
  {
    title: 'Payment Methods',
    icon: <CreditCard size={20} />,
    items: [
      { label: 'Bank Accounts', description: 'Manage connected bank accounts' },
      { label: 'Credit Cards', description: 'Update your card information' },
    ],
  },
  {
    title: 'Help & Support',
    icon: <HelpCircle size={20} />,
    items: [
      { label: 'FAQs', description: 'View frequently asked questions' },
      { label: 'Contact Support', description: 'Get help with your account' },
    ],
  },
];

export function SettingsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>

      <div className="space-y-6">
        {settingSections.map((section) => (
          <div key={section.title} className="bg-white rounded-xl shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center">
                <span className="text-gray-500 mr-3">{section.icon}</span>
                <h2 className="text-lg font-semibold text-gray-900">
                  {section.title}
                </h2>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {section.items.map((item) => (
                <div
                  key={item.label}
                  className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="ml-8">
                    <h3 className="text-sm font-medium text-gray-900">
                      {item.label}
                    </h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}