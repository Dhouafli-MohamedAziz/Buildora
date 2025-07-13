'use client';

interface ErrorDisplayProps {
  error: string | null;
  className?: string;
}

export default function ErrorDisplay({ error, className = '' }: ErrorDisplayProps) {
  if (!error) return null;

  return (
    <div className={`mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm animate-fadeIn ${className}`}>
      {error}
    </div>
  );
} 