
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react'; // Import signIn
import { Project } from './type';


export default function Connexion() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // 👈 on initialise router
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);

const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Reset error state

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false, // Handle redirection manually
      });

      if (result?.error) {
        // Handle specific errors from NextAuth
        setError(result.error);
        console.error('Login error:', result.error);
        return;
      }

      // On success, redirect to dashboard
      router.push('/dashboard');
      setEmail('');
      setPassword('');
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Unexpected error:', err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-[#0a0a23] to-[#111132] text-white overflow-hidden relative">

      {/* Background animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-[300%] h-[300%] bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 animate-spin-slow rounded-full blur-3xl"></div>
      </div>

      {/* Login Form Container */}
      <div className="relative z-10 bg-[#111] p-10 rounded-3xl shadow-2xl w-full max-w-md animate-fadeInUp">

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent animate-fadeIn">
          Bienvenue chez Buildora
        </h1>

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-6">

          <div className="flex flex-col animate-fadeIn delay-100">
            <label htmlFor="email" className="text-sm text-gray-400 mb-2">Adresse Email</label>
            <input
              id="email"
              type="email"
              placeholder="votremail@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-4 rounded-lg bg-[#222] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500 transition-all"
            />
          </div>

          <div className="flex flex-col animate-fadeIn delay-200">
            <label htmlFor="password" className="text-sm text-gray-400 mb-2">Mot de passe</label>
            <input
              id="password"
              type="password"
              placeholder="Votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="p-4 rounded-lg bg-[#222] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500 transition-all"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 rounded-lg transition-all transform hover:scale-105 shadow-lg animate-fadeIn delay-400"
          >
            Se connecter
          </button>

        </form>

        {/* Link to Signup */}
        <p className="mt-6 text-center text-sm text-gray-400 animate-fadeIn delay-700">
          Pas encore de compte ?{' '}
          <Link href="/inscription" className="text-blue-400 hover:underline font-semibold">
            Créer un compte
          </Link>
        </p>

      </div>
    </div>
  );
}
