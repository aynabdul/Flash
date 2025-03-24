'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import LoginForm from '../../../components/forms/LoginForm';

export default function LoginPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Login />
    </Suspense>
  );
}

function Login() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const searchParams = useSearchParams(); // ✅ Correct way to get URL params in Next.js app router
  const redirect = searchParams.get('redirect');

  useEffect(() => {
    if (status === 'authenticated') {
      router.push(redirect || '/admin');
    }
  }, [session, status, router, redirect]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-blue-600">FLASH Admin</h1>
        <p className="text-gray-600">Free Legal Aid Society for the Helpless</p>
      </div>
      <LoginForm />
    </div>
  );
}
