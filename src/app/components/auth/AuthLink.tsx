'use client';

import Link from 'next/link';

interface AuthLinkProps {
  href: string;
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function AuthLink({ href, children, delay = 0, className = '' }: AuthLinkProps) {
  return (
    <Link 
      href={href} 
      className={`text-blue-400 hover:underline font-semibold ${className}`}
    >
      {children}
    </Link>
  );
} 