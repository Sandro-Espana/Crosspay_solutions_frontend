// app/payment/page.tsx  = Orquestador de la pagina de pagos
'use client';

import { useRouter } from 'next/navigation';
import { PaymentForm } from '@/components/features/payment/PaymentForm';
import { PaymentFormData } from '@/components/features/payment/PaymentForm.types';
import { usePayment } from '@/lib/hooks/usePayment';

export default function PaymentPage() {
  const router = useRouter();
  const { createPayment, loading, error } = usePayment();

  const handleSubmit = async (data: PaymentFormData) => {
    try {
      const result = await createPayment(data);
      // Redirigir a confirmación con el ID de transacción
      router.push(`/payment/confirm?transaction=${result.id}&masked=${result.masked_card}`);
    } catch {
      // El error ya está manejado por el hook, no necesitas hacer nada aquí
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            Tesorería Inteligente
          </h1>
          <p className="mt-3 text-xl text-gray-300">
            Completa la información de pago
          </p>
        </div>

        <PaymentForm 
          onSubmit={handleSubmit} 
          loading={loading}
          error={error}
        />
        
        {/* Información de seguridad */}
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
              <p className="text-sm text-gray-400 mt-2">
                Los campos marcados con * son obligatorios. <br /> Manejamos políticas estrictas de protección de datos sensibles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}