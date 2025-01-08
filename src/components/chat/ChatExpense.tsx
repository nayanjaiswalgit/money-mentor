import React, { useState } from 'react';
import { Send, Image, PlusCircle } from 'lucide-react';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export function ChatExpense() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hi! I'm your expense assistant. You can tell me about your expenses or ask questions about your spending.",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "I've recorded your expense. Would you like me to categorize it or add any additional details?",
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-white rounded-lg shadow-sm">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p>{msg.text}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {msg.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4">
        <div className="flex items-center space-x-2">
          <button type="button" className="p-2 rounded-full hover:bg-gray-100">
            <Image className="h-5 w-5 text-gray-500" />
          </button>
          <button type="button" className="p-2 rounded-full hover:bg-gray-100">
            <PlusCircle className="h-5 w-5 text-gray-500" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type an expense or ask a question..."
            className="flex-1 rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button 
            type="submit"
            className="p-2 rounded-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
            disabled={!message.trim()}
          >
            <Send className="h-5 w-5 text-white" />
          </button>
        </div>
      </form>
    </div>
  );
}