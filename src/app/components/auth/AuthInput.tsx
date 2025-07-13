'use client';

import { InputHTMLAttributes } from 'react';
import Input from '../ui/Input';

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  delay?: number;
}

export default function AuthInput({ label, delay = 0, className = '', ...props }: AuthInputProps) {
  return (
    <div className={`animate-fadeIn delay-${delay}`}>
      <Input
        {...props}
        label={label}
        className={className}
      />
    </div>
  );
} 