'use client';

import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function AuthLayout({ children, className = '' }: AuthLayoutProps) {
  return (
    <div className={`flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-[#0a0a23] to-[#111132] text-white overflow-hidden relative ${className}`}>
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-[300%] h-[300%] bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 animate-spin-slow rounded-full blur-3xl"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
} 