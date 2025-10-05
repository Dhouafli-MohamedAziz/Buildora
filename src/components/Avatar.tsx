'use client';

import { useSession } from 'next-auth/react';

interface AvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showStatus?: boolean;
}

export default function Avatar({ size = 'md', className = '', showStatus = false }: AvatarProps) {
  const { data: session } = useSession();
  
  const userName = session?.user?.name || session?.user?.email || 'User';
  const firstLetter = userName.charAt(0).toUpperCase();
  
  // Use Buildora's signature pink and purple gradient
  const buildoraGradient = 'from-purple-500 to-pink-500';

  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base',
    xl: 'w-12 h-12 text-lg',
  };

  const statusSizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-3.5 h-3.5',
  };

  return (
    <div className={`relative ${className}`}>
      <div className={`${sizeClasses[size]} bg-gradient-to-br ${buildoraGradient} rounded-lg flex items-center justify-center text-white font-bold shadow-sm border-2 border-white/20`}>
        {firstLetter}
      </div>
      {showStatus && (
        <div className={`absolute -bottom-1 -right-1 ${statusSizeClasses[size]} bg-green-400 rounded-full border-2 border-slate-900 animate-pulse`}></div>
      )}
    </div>
  );
} 