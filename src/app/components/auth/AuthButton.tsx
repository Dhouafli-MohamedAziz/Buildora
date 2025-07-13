'use client';

import { ButtonHTMLAttributes } from 'react';
import Button from '../ui/Button';

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
  delay?: number;
}

export default function AuthButton({ children, isLoading = false, delay = 0, className = '', ...props }: AuthButtonProps) {
  return (
    <Button
      {...props}
      variant="auth"
      size="lg"
      isLoading={isLoading}
      className={`animate-fadeIn delay-${delay} ${className}`}
    >
      {children}
    </Button>
  );
} 