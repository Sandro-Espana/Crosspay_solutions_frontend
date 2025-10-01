'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

type Transaction = {
  id: string;
  amount: number;
  currency: string;
  status: string;
  created_at: string;
  masked_card: string;
  description: string;
};

export default function PaymentConfirmationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const transactionId = searchParams.get('transaction');
    
    if (!transactionId) {
      router.push('/');
      return;
    }

    const fetchTransaction = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push(`/login?redirect=/payment/confirm?transaction=${transactionId}`);
          return;
        }

        const response = await fetch(`/api/transactions/${transactionId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('No se pudo cargar la transacción');
        }

        const data = await response.json();
        setTransaction(data);
      } catch (err) {
        setError(err.message || 'Error al cargar la transacción');
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [searchParams, router]);

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: currency || 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-300">Cargando detalles del pago...</p>
        </div>
      </div>
    );
  }

  if (error || !transaction) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="mt-3 text-2xl font-extrabold text-white">
            Algo salió mal
          </h2>
          <p className="mt-2 text-gray-300">
            {error || 'No se pudo cargar la información de la transacción.'}
          </p>
          <div className="mt-6">
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isSuccess = transaction.status === 'completed';

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="mt-4 text-3xl font-extrabold text-white">
            {isSuccess ? '¡Pago Completado!' : 'Pago en Proceso'}
          </h1>
          <p className="mt-2 text-lg text-gray-300">
            {isSuccess 
              ? 'Tu pago ha sido procesado exitosamente.' 
              : 'Estamos procesando tu pago. Te notificaremos cuando esté completo.'}
          </p>
          <p className="mt-1 text-sm text-gray-400">
            ID de transacción: {transaction.id}
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-700">
            <h2 className="text-lg font-medium text-white">Resumen del Pago</h2>
          </div>
          <div className="px-6 py-5">
            <dl className="space-y-4">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-400">Monto</dt>
                <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">
                  {formatCurrency(transaction.amount, transaction.currency)}
                </dd>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-400">Descripción</dt>
                <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">
                  {transaction.description}
                </dd>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-400">Tarjeta</dt>
                <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">
                  {transaction.masked_card || '•••• •••• •••• ••••'}
                </dd>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-400">Estado</dt>
                <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    transaction.status === 'completed' 
                      ? 'bg-green-500/20 text-green-400' 
                      : transaction.status === 'pending'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {transaction.status === 'completed' 
                      ? 'Completado' 
                      : transaction.status === 'pending'
                      ? 'Pendiente'
                      : 'Fallido'}
                  </span>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/transactions"
            className="inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Ver historial de transacciones
          </Link>
          <Link
            href="/"
            className="inline-flex justify-center items-center px-6 py-3 border border-gray-700 rounded-md shadow-sm text-base font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
