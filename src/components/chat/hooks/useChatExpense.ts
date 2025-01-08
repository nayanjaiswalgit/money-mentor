import { useState, useCallback } from 'react';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export function useChatExpense() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hi! I'm your expense assistant. You can tell me about your expenses or ask questions about your spending.",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);

  const addMessage = useCallback((text: string, sender: 'user' | 'assistant') => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);

    if (sender === 'user') {
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
    }
  }, []);

  return {
    messages,
    addMessage
  };
}