
'use client';

import { 
  AuthLayout, 
  FormContainer, 
  AuthHeader, 
  LoginForm, 
  AuthLink 
} from '../../components/auth';

export default function Connexion() {
  return (
    <AuthLayout>
      <FormContainer>
        <AuthHeader title="Bienvenue chez Buildora" />
        
        <LoginForm />

        {/* Link to Signup */}
        <p className="mt-6 text-center text-sm text-gray-400 animate-fadeIn delay-700">
          Pas encore de compte ?{' '}
          <AuthLink href="/signup">
            Créer un compte
          </AuthLink>
        </p>
      </FormContainer>
    </AuthLayout>
  );
}