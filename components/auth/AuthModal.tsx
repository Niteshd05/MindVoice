'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClayCard } from '@/components/ui/ClayCard';
import { ClayButton } from '@/components/ui/ClayButton';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: () => void;
}

export function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [loading, setLoading] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md mx-4"
          >
            <ClayCard className="clay-glass">
              <div className="mb-8">
                <h2 className="text-3xl font-bold clay-gradient-text text-center mb-2">
                  {authMode === 'login' ? 'Welcome Back' : 'Join MindVoice'}
                </h2>
                <p className="text-center text-gray-600">
                  {authMode === 'login'
                    ? 'Sign in to your account'
                    : 'Create a new account'}
                </p>
              </div>

              {authMode === 'login' ? (
                <LoginForm
                  onSuccess={() => {
                    setLoading(false);
                    onAuthSuccess();
                  }}
                  setLoading={setLoading}
                />
              ) : (
                <SignupForm
                  onSuccess={() => {
                    setLoading(false);
                    onAuthSuccess();
                  }}
                  setLoading={setLoading}
                />
              )}

              <div className="mt-6 flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-300" />
                <span className="text-sm text-gray-600">or</span>
                <div className="flex-1 h-px bg-gray-300" />
              </div>

              <button
                onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                className="w-full mt-6 text-center text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors"
              >
                {authMode === 'login'
                  ? "Don't have an account? Sign up"
                  : 'Already have an account? Sign in'}
              </button>
            </ClayCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
