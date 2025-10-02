'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthForm } from '@/components/features/auth/AuthForm';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: { username: string; password: string }) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Error al iniciar sesión');
      }

      // Guardar token y redirigir
      localStorage.setItem('token', result.access_token);
      router.push('/dashboard');
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src="/logo/crosspay-solutions.svg"
          alt="CrossPay Solutions"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Inicia sesión en tu cuenta
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          O{' '}
          <a href="/register" className="font-medium text-purple-400 hover:text-purple-300">
            crea una cuenta nueva
          </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <AuthForm 
            type="login" 
            onSubmit={handleSubmit} 
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}
