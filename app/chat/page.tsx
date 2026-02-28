'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ClayCard } from '@/components/ui/ClayCard';
import { ClayButton } from '@/components/ui/ClayButton';
import { Sidebar } from '@/components/chat/Sidebar';
import { useTheme } from '@/lib/theme-context';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatPage() {
  const { theme } = useTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Thank you for sharing that. Based on our assessment (Theme: ${theme}), I understand you're feeling a certain way. Let me help you explore this further. What aspects of this would you like to discuss?`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-white via-blue-50 to-slate-100">
      {/* Sidebar */}
      {showSidebar && <Sidebar onClose={() => setShowSidebar(false)} />}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 bg-white/70 backdrop-blur-md p-4 sticky top-0 z-10">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4">
              {!showSidebar && (
                <button
                  onClick={() => setShowSidebar(true)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ☰
                </button>
              )}
              <div>
                <h1 className="text-xl font-bold clay-gradient-text">MindVoice Chat</h1>
                <p className="text-xs text-gray-500">Theme: {theme}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="h-full flex items-center justify-center"
              >
                <ClayCard className="text-center p-12 max-w-md">
                  <div className="text-5xl mb-4">👋</div>
                  <h2 className="text-2xl font-bold mb-3 text-gray-900">Welcome to Your Session</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Based on your psychometric assessment, I've personalized your experience. Feel free to share what's on your mind, and I'm here to support you.
                  </p>
                </ClayCard>
              </motion.div>
            ) : (
              <>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs sm:max-w-md lg:max-w-2xl ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-clay-primary to-clay-accent text-white rounded-3xl rounded-tr-sm'
                          : 'clay-card'
                      } px-6 py-4`}
                    >
                      <p className="text-sm sm:text-base leading-relaxed">{message.content}</p>
                      <span className="text-xs opacity-70 mt-2 block">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <ClayCard className="px-6 py-4">
                      <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-gray-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 rounded-full bg-gray-600 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 rounded-full bg-gray-600 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </ClayCard>
                  </motion.div>
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 bg-white/70 backdrop-blur-md p-4 sticky bottom-0">
          <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Share your thoughts..."
                className="clay-input w-full"
                disabled={isLoading}
              />
            </div>
            <ClayButton
              type="submit"
              disabled={isLoading || !input.trim()}
              className="text-white font-bold px-6"
            >
              Send
            </ClayButton>
          </form>
        </div>
      </div>
    </div>
  );
}
