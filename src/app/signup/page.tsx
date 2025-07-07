'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signup:', { name, email, password });
    alert('🚀 Compte créé avec succès !');
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-[#0a0a23] to-[#111132] text-white overflow-hidden relative">

      {/* Background Animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-[300%] h-[300%] bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 animate-spin-slow rounded-full blur-3xl"></div>
      </div>

      {/* Form Container */}
      <div className="relative z-10 bg-[#111] p-10 rounded-3xl shadow-2xl w-full max-w-md animate-fadeInUp">

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent animate-fadeIn">
          Rejoignez Buildora
        </h1>

        {/* Form */}
        <form onSubmit={handleSignup} className="flex flex-col gap-6">

          <div className="flex flex-col animate-fadeIn delay-100">
            <label htmlFor="name" className="text-sm text-gray-400 mb-2">Nom complet</label>
            <input
              id="name"
              type="text"
              placeholder="Votre nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="p-4 rounded-lg bg-[#222] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500 transition-all"
            />
          </div>

          <div className="flex flex-col animate-fadeIn delay-200">
            <label htmlFor="email" className="text-sm text-gray-400 mb-2">Email</label>
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

          <div className="flex flex-col animate-fadeIn delay-300">
            <label htmlFor="password" className="text-sm text-gray-400 mb-2">Mot de passe</label>
            <input
              id="password"
              type="password"
              placeholder="Mot de passe sécurisé"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="p-4 rounded-lg bg-[#222] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500 transition-all"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 rounded-lg transition-all transform hover:scale-105 shadow-lg animate-fadeIn delay-500"
          >
            Créer mon compte
          </button>

        </form>

        {/* Link to Login */}
        <p className="mt-6 text-center text-sm text-gray-400 animate-fadeIn delay-700">
          Déjà inscrit ?{' '}
          <Link href="/login
          " className="text-blue-400 hover:underline font-semibold">
            Connectez-vous ici
          </Link>
        </p>

      </div>
    </div>
  );
}
