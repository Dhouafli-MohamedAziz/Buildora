'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthInput from './AuthInput';
import AuthButton from './AuthButton';
import ErrorDisplay from './ErrorDisplay';

export default function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create account');
      }

      // Clear form and redirect to dashboard
      setName('');
      setEmail('');
      setPassword('');
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
      console.error('Signup error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignup} className="flex flex-col gap-6">
      <AuthInput
        id="name"
        label="Nom complet"
        type="text"
        placeholder="Votre nom"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        delay={100}
      />

      <AuthInput
        id="email"
        label="Email"
        type="email"
        placeholder="votremail@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        delay={200}
      />

      <AuthInput
        id="password"
        label="Mot de passe"
        type="password"
        placeholder="Mot de passe sécurisé"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        delay={300}
      />

      <AuthButton
        type="submit"
        isLoading={isLoading}
        delay={500}
      >
        Créer mon compte
      </AuthButton>

      <ErrorDisplay error={error} />
    </form>
  );
} 