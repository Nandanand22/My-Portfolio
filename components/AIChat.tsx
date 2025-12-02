import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Hi! I'm Nandana's AI Assistant. Ask me anything about her projects, skills, or experience!", sender: 'ai' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    const aiResponseText = await sendMessageToGemini(inputText);

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: aiResponseText,
      sender: 'ai'
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="glass-panel mb-4 w-80 md:w-96 shadow-2xl flex flex-col overflow-hidden border border-black/10 dark:border-white/10 animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-black dark:bg-white p-4 flex justify-between items-center text-white dark:text-black">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <span className="font-medium">AI Assistant</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="hover:opacity-70 transition-opacity"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 h-80 overflow-y-auto p-4 space-y-3 bg-sand-50 dark:bg-obsidian-900">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center flex-shrink-0">
                    <Bot size={14} />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 text-sm ${
                    msg.sender === 'user'
                      ? 'bg-black text-white dark:bg-white dark:text-black'
                      : 'bg-white dark:bg-obsidian-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  {msg.text}
                </div>
                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                    <User size={14} className="text-slate-600 dark:text-slate-300" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2 justify-start">
                 <div className="w-8 h-8 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center">
                    <Bot size={14} />
                  </div>
                  <div className="bg-white dark:bg-obsidian-800 p-3 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                  </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white dark:bg-obsidian-950 border-t border-slate-200 dark:border-slate-800 flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about my skills..."
              className="flex-1 bg-sand-100 dark:bg-obsidian-800 border-none px-4 py-2 text-sm focus:ring-1 focus:ring-black dark:focus:ring-white outline-none dark:text-white"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !inputText.trim()}
              className="bg-black text-white dark:bg-white dark:text-black p-2 hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-14 h-14 bg-black hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-200 text-white shadow-lg transition-all duration-300 hover:scale-110"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
        {!isOpen && (
            <span className="absolute right-full mr-4 bg-black text-white px-3 py-1 text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Ask AI
            </span>
        )}
      </button>
    </div>
  );
};

export default AIChat;