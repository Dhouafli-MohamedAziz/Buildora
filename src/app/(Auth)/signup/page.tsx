'use client';

import Link from 'next/link';
import { 
  AuthLayout, 
  FormContainer, 
  AuthHeader, 
  SignupForm, 
  AuthLink 
} from '../../components/auth';

export default function Signup() {
  return (
    <AuthLayout>
      <FormContainer>
        <AuthHeader title="Rejoignez Buildora" />
        
        <SignupForm />

        {/* Link to Login */}
        <p className="mt-6 text-center text-sm text-gray-400 animate-fadeIn delay-700">
          Déjà inscrit ?{' '}
          <AuthLink href="/login">
            Connectez-vous ici
          </AuthLink>
        </p>
      </FormContainer>
    </AuthLayout>
  );
}