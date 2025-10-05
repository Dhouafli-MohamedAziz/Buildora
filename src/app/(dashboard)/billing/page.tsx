'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import AuthGuard from '@/components/AuthGuard';
import AdvancedNavbar from '@/components/UserNavbar';
import Avatar from '@/components/Avatar';
import { Plan, UserSubscription } from "./billing.type";

export default function BillingPage() {
  const { data: session } = useSession();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [isLoading, setIsLoading] = useState(true);
  const [userSubscription, setUserSubscription] = useState<UserSubscription | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const plans: Plan[] = [
    {
      id: 'trial',
      name: 'Trial',
      price: 0,
      billingCycle: 'monthly',
      features: [
        'Up to 3 projects',
        'Basic AI assistance',
        'Community support',
        'Standard templates',
        '1GB storage'
      ],
      current: userSubscription?.plan === 'trial'
    },
    {
      id: 'basic',
      name: 'Basic',
      price: billingCycle === 'monthly' ? 9 : 90,
      billingCycle,
      features: [
        'Up to 10 projects',
        'Advanced AI assistance',
        'Priority support',
        'Premium templates',
        '5GB storage',
        'Custom domains',
        'Analytics dashboard'
      ],
      popular: true,
      current: userSubscription?.plan === 'basic'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: billingCycle === 'monthly' ? 29 : 290,
      billingCycle,
      features: [
        'Unlimited projects',
        'Advanced AI assistance',
        '24/7 priority support',
        'All premium templates',
        'Unlimited storage',
        'Custom domains',
        'Advanced analytics',
        'Team collaboration',
        'API access',
        'White-label options'
      ],
      current: userSubscription?.plan === 'premium'
    }
  ];

  useEffect(() => {
    if (session?.user) {
      loadUserSubscription();
    }
  }, [session]);

  const loadUserSubscription = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/users/${session?.user?.email}/subscription`);
      if (response.ok) {
        const data = await response.json();
        setUserSubscription(data);
      }
    } catch (error) {
      console.error('Error loading subscription:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlanChange = async (planId: string) => {
    try {
      setMessage({ type: 'success', text: 'Plan updated successfully!' });
      setTimeout(() => setMessage(null), 3000);
      await loadUserSubscription(); // Refresh subscription data
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update plan' });
    }
  };

  const handleBillingCycleChange = (cycle: 'monthly' | 'yearly') => {
    setBillingCycle(cycle);
  };

  if (isLoading) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white">Loading billing information...</p>
          </div>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col w-screen h-screen overflow-hidden text-white">
        {/* Animated background blobs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div 
            className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
            style={{ left: '20%', top: '10%' }}
          />
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-bounce" />
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
        </div>
        
        {/* Advanced Navbar */}
        <AdvancedNavbar />
        
        {/* Message Toast */}
        {message && (
          <div className={`fixed top-20 right-6 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
            message.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}>
            <div className="flex items-center space-x-2">
              <span>{message.text}</span>
              <button onClick={() => setMessage(null)} className="ml-2 text-white hover:text-gray-200">
                ×
              </button>
            </div>
          </div>
        )}
        
        {/* Main Content */}
        <main className="flex-1 flex flex-col min-h-0 w-full h-full pt-16 relative z-10">
          <div className="flex-1 min-h-0 w-full h-full overflow-y-auto">
            <div className="max-w-7xl mx-auto px-6 py-8">
              
              {/* Header Section */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Billing & Plans</h1>
                <p className="text-gray-400">Choose the perfect plan for your needs</p>
              </div>

              {/* Current Subscription Info */}
              {userSubscription && (
                <div className="mb-8">
                  <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Current Plan</h3>
                        <div className="flex items-center space-x-4">
                          <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm rounded-full font-medium">
                            {userSubscription.plan.charAt(0).toUpperCase() + userSubscription.plan.slice(1)}
                          </span>
                          <span className={`px-3 py-1 text-xs rounded-full ${
                            userSubscription.status === 'active' ? 'bg-green-500/20 text-green-400' :
                            userSubscription.status === 'trial' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {userSubscription.status.charAt(0).toUpperCase() + userSubscription.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-400 text-sm">Next billing date</p>
                        <p className="text-white font-medium">{userSubscription.nextBillingDate}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Billing Cycle Toggle */}
              <div className="mb-8 flex justify-center">
                <div className="bg-white/10 backdrop-blur-xl rounded-xl p-1 border border-white/10">
                  <div className="flex">
                    <button
                      onClick={() => handleBillingCycleChange('monthly')}
                      className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                        billingCycle === 'monthly'
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Monthly
                    </button>
                    <button
                      onClick={() => handleBillingCycleChange('yearly')}
                      className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                        billingCycle === 'yearly'
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Yearly
                      <span className="ml-1 px-2 py-0.5 bg-green-500 text-white text-xs rounded-full">Save 20%</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Plans Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`relative bg-white/10 backdrop-blur-xl rounded-2xl border transition-all duration-300 hover:scale-105 ${
                      plan.current
                        ? 'border-purple-500/50 shadow-lg shadow-purple-500/20'
                        : plan.popular
                        ? 'border-pink-500/50 shadow-lg shadow-pink-500/20'
                        : 'border-white/10'
                    }`}
                  >
                    {/* Popular Badge */}
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="px-4 py-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-medium rounded-full">
                          Most Popular
                        </span>
                      </div>
                    )}

                    {/* Current Plan Badge */}
                    {plan.current && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="px-4 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-medium rounded-full">
                          Current Plan
                        </span>
                      </div>
                    )}

                    <div className="p-6">
                      {/* Plan Header */}
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                        <div className="mb-4">
                          <span className="text-3xl font-bold text-white">${plan.price}</span>
                          <span className="text-gray-400 ml-2">
                            /{billingCycle === 'monthly' ? 'month' : 'year'}
                          </span>
                        </div>
                        {plan.price === 0 && (
                          <p className="text-sm text-gray-400">Free forever</p>
                        )}
                      </div>

                      {/* Features List */}
                      <div className="space-y-3 mb-6">
                        {plan.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center">
                              <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={() => handlePlanChange(plan.id)}
                        disabled={plan.current}
                        className={`w-full py-3 px-4 rounded-xl font-medium transition-all ${
                          plan.current
                            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            : plan.popular
                            ? 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white'
                            : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                        }`}
                      >
                        {plan.current ? 'Current Plan' : plan.price === 0 ? 'Get Started' : 'Choose Plan'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Info */}
              <div className="mt-12 text-center">
                <p className="text-gray-400 text-sm">
                  All plans include a 14-day money-back guarantee. Cancel anytime.
                </p>
                <div className="flex justify-center space-x-6 mt-4">
                  <a href="#" className="text-purple-400 hover:text-purple-300 text-sm">Terms of Service</a>
                  <a href="#" className="text-purple-400 hover:text-purple-300 text-sm">Privacy Policy</a>
                  <a href="#" className="text-purple-400 hover:text-purple-300 text-sm">Contact Support</a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
} 