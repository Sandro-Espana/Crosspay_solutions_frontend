// lib/hooks/usePayment.ts

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PaymentFormData } from '@/components/features/payment/PaymentForm.types';
import { PaymentService } from '@/lib/services/PaymentService';

export function usePayment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const createPayment = async (data: PaymentFormData) => {
    setLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        router.push('/login?redirect=/payment');
        throw new Error('Redirigiendo a login...');
      }

      return await PaymentService.createTransaction(data, token);
    } catch (err: any) {
      const userFriendlyError = err.message || 'Error al procesar el pago. Por favor, inténtalo de nuevo.';
      setError(userFriendlyError);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError('');

  return { createPayment, loading, error, clearError };
}