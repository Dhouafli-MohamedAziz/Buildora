'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      const email = searchParams.get('email');

      if (!email) {
        setStatus('error');
        setMessage('No email parameter provided. Please check your email link.');
        return;
      }

      try {
        const response = await fetch(`/api/verify-email?email=${encodeURIComponent(email)}`);
        const data = await response.json();

        if (response.ok) {
          setStatus('success');
          setMessage(data.message);
        } else {
          setStatus('error');
          setMessage(data.error || 'Verification failed.');
        }
      } catch (error) {
        setStatus('error');
        setMessage('An error occurred during verification.');
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
              B
            </div>
            <h1 className="text-2xl font-bold text-white">Buildora</h1>
          </div>

          {/* Status Content */}
          <div className="text-center">
            {status === 'loading' && (
              <div className="space-y-4">
                <Loader2 className="w-12 h-12 text-purple-400 animate-spin mx-auto" />
                <h2 className="text-xl font-semibold text-white">Vérification en cours...</h2>
                <p className="text-gray-300">Vérification de votre adresse email...</p>
              </div>
            )}

            {status === 'success' && (
              <div className="space-y-4">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto" />
                <h2 className="text-xl font-semibold text-white">Email vérifié !</h2>
                <p className="text-gray-300">{message}</p>
                <div className="pt-4">
                  <Link
                    href="/login"
                    className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-medium transition-all hover:scale-105"
                  >
                    Se connecter
                  </Link>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="space-y-4">
                <XCircle className="w-12 h-12 text-red-400 mx-auto" />
                <h2 className="text-xl font-semibold text-white">Erreur de vérification</h2>
                <p className="text-gray-300">{message}</p>
                <div className="pt-4 space-y-2">
                  <Link
                    href="/login"
                    className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-medium transition-all hover:scale-105"
                  >
                    Se connecter
                  </Link>
                  <div className="text-sm">
                    <Link href="/signup" className="text-purple-400 hover:text-purple-300">
                      Créer un nouveau compte
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 