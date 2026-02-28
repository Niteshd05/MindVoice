'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ClayCard } from '@/components/ui/ClayCard';
import { useTheme } from '@/lib/theme-context';

interface SidebarProps {
  onClose?: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(true);
  const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}') : {};

  const themes = [
    { id: 'warm-earth', name: 'Warm Earth', color: '#D4A574' },
    { id: 'cool-slate', name: 'Cool Slate', color: '#6B8E9F' },
    { id: 'soft-lavender', name: 'Soft Lavender', color: '#B89AC6' },
    { id: 'sage-green', name: 'Sage Green', color: '#A9B494' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('test-results');
    window.location.href = '/';
  };

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      exit={{ x: -300 }}
      className="w-72 bg-white/90 backdrop-blur-md border-r border-gray-200 flex flex-col h-screen"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold clay-gradient-text">Menu</h2>
          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              ✕
            </button>
          )}
        </div>
        <ClayCard className="p-4">
          <p className="text-sm text-gray-600">Logged in as</p>
          <p className="font-semibold text-gray-900">{user.name || 'User'}</p>
        </ClayCard>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-3">
        <Link
          href="/chat"
          className="block p-3 clay-card hover:shadow-md transition-all rounded-xl font-semibold text-gray-900"
        >
          💬 Chat Interface
        </Link>
        <Link
          href="/dashboard"
          className="block p-3 clay-card hover:shadow-md transition-all rounded-xl font-semibold text-gray-900"
        >
          📊 Dashboard
        </Link>
        <Link
          href="/psychometric-test"
          className="block p-3 clay-card hover:shadow-md transition-all rounded-xl font-semibold text-gray-900"
        >
          🧠 Retake Assessment
        </Link>
      </nav>

      {/* Theme Selector */}
      <div className="p-4 border-t border-gray-200">
        <p className="text-sm font-semibold text-gray-700 mb-3">Your Theme</p>
        <div className="space-y-2">
          {themes.map((thm) => (
            <motion.button
              key={thm.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setTheme(thm.id as any)}
              className={`w-full p-3 rounded-xl font-semibold transition-all ${
                theme === thm.id
                  ? 'clay-card shadow-md border-2 border-gray-400'
                  : 'hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={theme === thm.id ? { scale: 1.2 } : { scale: 1 }}
                  className="w-5 h-5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: thm.color }}
                />
                <span className="text-sm">{thm.name}</span>
                {theme === thm.id && (
                  <span className="ml-auto text-xs font-bold">✓</span>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full p-3 rounded-xl font-semibold text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors border border-gray-200"
        >
          🚪 Logout
        </button>
      </div>
    </motion.aside>
  );
}
