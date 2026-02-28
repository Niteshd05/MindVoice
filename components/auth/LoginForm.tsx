'use client';

import React, { useState } from 'react';
import { ClayButton } from '@/components/ui/ClayButton';

interface LoginFormProps {
  onSuccess: () => void;
  setLoading: (loading: boolean) => void;
}

export function LoginForm({ onSuccess, setLoading }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!email || !password) {
        throw new Error('Please enter email and password');
      }

      // Validate stored user credentials
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u: any) => u.email === email && u.password === password);

      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Store active session
      localStorage.setItem('user', JSON.stringify({ email: user.email, id: user.id }));
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-xl text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="clay-input w-full"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="clay-input w-full"
          required
        />
      </div>

      <ClayButton type="submit" className="w-full" loading={false}>
        Sign In
      </ClayButton>
    </form>
  );
}
