// components/features/payment/PaymentForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PaymentFormData, PaymentFormProps, paymentSchema } from './PaymentForm.types';

// 1. CREACIÓN DEL FORMULARIO DE PAGO
export function PaymentForm({ onSubmit, loading, error }: PaymentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: yupResolver(paymentSchema),
  });

  const formatExpiry = (raw: string) => {
    const digits = raw.replace(/\D/g, '').slice(0, 4); // MMYY
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-gray-800 rounded-lg p-6">
      {/* Monto y Moneda */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-1">
            Monto *
          </label>
          <input
            {...register('amount', {
              valueAsNumber: true,
              min: 1,
            })}
            id="amount"
            type="number"
            step={1}
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="1"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          {errors.amount && (
            <p className="text-red-400 text-sm mt-1">{errors.amount.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="currency" className="block text-sm font-medium text-gray-300 mb-1">
            Moneda *
          </label>
          <select
            {...register('currency')}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Seleccionar moneda</option>
            <option value="USD">USD - Dólar Americano</option>
            <option value="COP">COP - Peso Colombiano</option>
          </select>
          {errors.currency && (
            <p className="text-red-400 text-sm mt-1">{errors.currency.message}</p>
          )}
        </div>
      </div>

      {/* Descripción */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
          Descripción del pago *
        </label>
        <input
          {...register('description')}
          type="text"
          placeholder="Ej: Pago de servicios"
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        {errors.description && (
          <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>
        )}
      </div>

      {/* Información del Titular */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
            Nombre del titular *
          </label>
          <input
            {...register('name')}
            type="text"
            placeholder="Como aparece en la tarjeta"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          {errors.name && (
            <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="document_type" className="block text-sm font-medium text-gray-300 mb-1">
            Tipo de documento *
          </label>
          <select
            {...register('document_type')}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Seleccionar tipo</option>
            <option value="Cédula">Cédula</option>
            <option value="Pasaporte">Pasaporte</option>
          </select>
          {errors.document_type && (
            <p className="text-red-400 text-sm mt-1">{errors.document_type.message}</p>
          )}
        </div>
      </div>

      {/* Información de la Tarjeta */}
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label htmlFor="card_number" className="block text-sm font-medium text-gray-300 mb-1">
            Número de tarjeta *
          </label>
          <input
            {...register('card_number', {
              onChange: (e) => {
                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 19);
              },
            })}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="1234567890123456"
            maxLength={19}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          {errors.card_number && (
            <p className="text-red-400 text-sm mt-1">{errors.card_number.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="expiry_date" className="block text-sm font-medium text-gray-300 mb-1">
            Fecha de vencimiento (MM/YY) *
          </label>
          <input
            {...register('expiry_date', {
              onChange: (e) => {
                e.target.value = formatExpiry(e.target.value);
              },
            })}
            type="text"
            inputMode="numeric"
            pattern="[0-9/]*"
            placeholder="MM/YY"
            maxLength={5}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          {errors.expiry_date && (
            <p className="text-red-400 text-sm mt-1">{errors.expiry_date.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="cvv" className="block text-sm font-medium text-gray-300 mb-1">
            CVV *
          </label>
          <input
            {...register('cvv', {
              onChange: (e) => {
                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
              },
            })}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="123"
            maxLength={4}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          {errors.cvv && (
            <p className="text-red-400 text-sm mt-1">{errors.cvv.message}</p>
          )}
        </div>
      </div>

      {/* Botón de envío y mensaje de error */}
      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-medium py-3 px-4 rounded-md transition-colors duración-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          {loading ? 'Procesando pago...' : 'Realizar Pago'}
        </button>

        {error && (
          <div className="mt-4 p-3 bg-red-900/50 border border-red-700 rounded-md">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}
      </div>
    </form>
  );
}