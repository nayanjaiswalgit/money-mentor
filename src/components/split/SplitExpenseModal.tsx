import React, { useState } from 'react';
import { X, Receipt, DollarSign, Plus } from 'lucide-react';
import { SplitTypeSelector } from './SplitTypeSelector';

interface Item {
  id: string;
  name: string;
  price: number;
  tax?: number;
  tip?: number;
  paidBy: string;
  splitBetween: string[];
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function SplitExpenseModal({ isOpen, onClose }: Props) {
  const [description, setDescription] = useState('');
  const [splitType, setSplitType] = useState<'equal' | 'percentage' | 'custom'>('equal');
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    tax: '',
    tip: '',
    paidBy: 'You',
    splitBetween: ['You']
  });

  const addItem = () => {
    if (!newItem.name || !newItem.price) return;
    
    setItems([...items, {
      id: Date.now().toString(),
      name: newItem.name,
      price: parseFloat(newItem.price),
      tax: newItem.tax ? parseFloat(newItem.tax) : undefined,
      tip: newItem.tip ? parseFloat(newItem.tip) : undefined,
      paidBy: newItem.paidBy,
      splitBetween: newItem.splitBetween
    }]);

    setNewItem({
      name: '',
      price: '',
      tax: '',
      tip: '',
      paidBy: 'You',
      splitBetween: ['You']
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">New Split Expense</h2>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Receipt className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="pl-10 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Dinner, Movie tickets, etc."
                />
              </div>
            </div>

            <SplitTypeSelector value={splitType} onChange={setSplitType} />

            {splitType === 'custom' && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Add Items</h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={newItem.name}
                        onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                        placeholder="Item name"
                        className="rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                          <DollarSign className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="number"
                          value={newItem.price}
                          onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                          placeholder="Price"
                          className="pl-7 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                          <span className="text-gray-400">%</span>
                        </div>
                        <input
                          type="number"
                          value={newItem.tax}
                          onChange={(e) => setNewItem({...newItem, tax: e.target.value})}
                          placeholder="Tax"
                          className="pl-7 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                          <span className="text-gray-400">%</span>
                        </div>
                        <input
                          type="number"
                          value={newItem.tip}
                          onChange={(e) => setNewItem({...newItem, tip: e.target.value})}
                          placeholder="Tip"
                          className="pl-7 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={addItem}
                      className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Item
                    </button>
                  </div>
                </div>

                {items.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Added Items</h3>
                    <div className="space-y-2">
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500">
                              {item.tax && `Tax: ${item.tax}% • `}
                              {item.tip && `Tip: ${item.tip}%`}
                            </p>
                          </div>
                          <span className="font-semibold">${item.price.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <button
              type="submit"
              className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Split Expense
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}