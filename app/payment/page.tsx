'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PaymentForm } from '@/components/transactions/PaymentForm';

export default function PaymentPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  const handleSubmit = async (data: any) => {
    setLoading(true);
    setError('');
    
    try {
      // Validar token de autenticación
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login?redirect=/payment');
        return;
      }

      // Preparar datos para la API
      const payload = {
        amount: parseFloat(data.amount),
        currency: data.currency,
        description: data.description,
        name: data.name,
        document_type: data.document_type,
        card_number: data.card_number,
      };

      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Error al procesar el pago');
      }

      // Redirigir a la página de confirmación
      router.push(`/payment/confirm?transaction=${result.id}`);
    } catch (err) {
      setError(err.message || 'Error al procesar el pago. Por favor, inténtalo de nuevo.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            Realizar Pago
          </h1>
          <p className="mt-3 text-xl text-gray-300">
            Completa la información de pago
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <PaymentForm 
            onSubmit={handleSubmit} 
            loading={loading}
            error={error}
          />
          
          <div className="mt-8 bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-medium text-white mb-4">Información de seguridad</h3>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-300">
                  Tus datos están protegidos con encriptación de extremo a extremo. No almacenamos los detalles completos de tu tarjeta.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
