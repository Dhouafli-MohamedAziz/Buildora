'use client';

import { ReactNode } from 'react';

interface FormContainerProps {
  children: ReactNode;
  className?: string;
}

export default function FormContainer({ children, className = '' }: FormContainerProps) {
  return (
    <div className={`bg-[#111] p-10 rounded-3xl shadow-2xl w-full max-w-md animate-fadeInUp ${className}`}>
      {children}
    </div>
  );
} 