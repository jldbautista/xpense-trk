import type { Metadata } from 'next';
import AuthLayout from '../components/auth/AuthLayout';
import LoginForm from '../components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Log In — xpense.trk',
};

export default function LoginPage() {
  return (
    <AuthLayout label="WELCOME BACK">
      <LoginForm />
    </AuthLayout>
  );
}
