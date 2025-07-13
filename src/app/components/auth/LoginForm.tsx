'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthInput from './AuthInput';
import AuthButton from './AuthButton';
import ErrorDisplay from './ErrorDisplay';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Failed to login');
      }

      // On success, redirect to dashboard
      router.push('/dashboard');
      setEmail('');
      setPassword('');
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
      console.error('Unexpected error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-6">
      <AuthInput
        id="email"
        label="Adresse Email"
        type="email"
        placeholder="votremail@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        delay={100}
      />

      <AuthInput
        id="password"
        label="Mot de passe"
        type="password"
        placeholder="Votre mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        delay={200}
      />

      <AuthButton
        type="submit"
        isLoading={isLoading}
        delay={400}
      >
        Se connecter
      </AuthButton>

      <ErrorDisplay error={error} />
    </form>
  );
} 