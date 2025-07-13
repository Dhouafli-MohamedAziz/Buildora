'use client';

import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
}

export default function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={props.id} className="text-sm text-gray-400 mb-2">
          {label}
        </label>
      )}
      <input
        {...props}
        className={`p-4 rounded-lg bg-[#222] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500 transition-all ${
          error ? 'border-red-500' : ''
        } ${className}`}
      />
      {error && (
        <span className="text-red-400 text-sm mt-1">{error}</span>
      )}
    </div>
  );
} 