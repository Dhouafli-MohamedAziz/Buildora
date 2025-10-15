'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

// Email verification function - replace with your actual DB logic
async function verifyEmailDirectly(email: string) {
  // TODO: Replace this with your actual database verification logic
  // Example using fetch to your own API (if you keep it) or direct DB call
  try {
    // Option 1: If you want to keep using your API route internally
    const response = await fetch(`/api/verify-email?email=${encodeURIComponent(email)}`);
    
    if (!response.ok) {
      throw new Error('Verification failed');
    }
    
    const data = await response.json();
    return { success: true, message: data.message };
    
    // Option 2: If you want to call your DB directly (uncomment below)
    /*
    const { verifyEmail } = await import('@/lib/db/route');
    await verifyEmail(email);
    return { 
      success: true, 
      message: 'Email verified successfully! You can now log in to your account.' 
    };
    */
  } catch (error) {
    console.error('Email verification error:', error);
    throw new Error('Failed to verify email. Please try again.');
  }
}

// Main content component that uses searchParams
function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      const email = searchParams.get('email');

      if (!email) {
        setStatus('error');
        setMessage('No email parameter provided. Please check your verification link.');
        return;
      }

      try {
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          setStatus('error');
          setMessage('Invalid email format provided.');
          return;
        }

        const result = await verifyEmailDirectly(email);
        setStatus('success');
        setMessage(result.message);
      } catch (error) {
        setStatus('error');
        setMessage(error instanceof Error ? error.message : 'An error occurred during verification.');
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
                <p className="text-sm text-purple-300">
                  Votre adresse email a été confirmée avec succès.
                </p>
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
                <div className="pt-4 space-y-3">
                  <Link
                    href="/login"
                    className="inline-block w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-medium transition-all hover:scale-105"
                  >
                    Se connecter
                  </Link>
                  <div className="text-sm pt-2">
                    <Link 
                      href="/signup" 
                      className="text-purple-400 hover:text-purple-300 underline"
                    >
                      Créer un nouveau compte
                    </Link>
                  </div>
                  <div className="text-xs text-gray-400 pt-2">
                    <Link 
                      href="/contact" 
                      className="hover:text-gray-300"
                    >
                      Besoin d'aide ? Contactez-nous
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

// Loading fallback component
function VerifyEmailFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
              B
            </div>
            <h1 className="text-2xl font-bold text-white">Buildora</h1>
          </div>
          <div className="text-center">
            <div className="space-y-4">
              <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <h2 className="text-xl font-semibold text-white">Chargement...</h2>
              <p className="text-gray-300">Préparation de la vérification...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main page component with Suspense boundary
export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<VerifyEmailFallback />}>
      <VerifyEmailContent />
    </Suspense>
  );
}