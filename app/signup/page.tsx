import type { Metadata } from 'next';
import AuthLayout from '../components/auth/AuthLayout';
import SignupForm from '../components/auth/SignupForm';

export const metadata: Metadata = {
  title: 'Sign Up — xpense.trk',
};

export default function SignupPage() {
  return (
    <AuthLayout label="NEW PLAYER" wide>
      <SignupForm />
    </AuthLayout>
  );
}
