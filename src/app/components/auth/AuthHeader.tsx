'use client';

interface AuthHeaderProps {
  title: string;
  className?: string;
}

export default function AuthHeader({ title, className = '' }: AuthHeaderProps) {
  return (
    <h1 className={`text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent animate-fadeIn ${className}`}>
      {title}
    </h1>
  );
} 