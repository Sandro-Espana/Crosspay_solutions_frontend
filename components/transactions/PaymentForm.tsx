import * as yup from 'yup';

export type PaymentFormData = {
  amount: number;
  currency: 'USD' | 'COP';
  description: string;
  name: string;
  document_type: 'Cédula' | 'Pasaporte';
  card_number: string; // 16-19 digits
  expiry_date: string; // MM/YY
  cvv: string; // 3-4 digits
};

const paymentSchema: yup.ObjectSchema<PaymentFormData> = yup.object({
  amount: yup
    .number()
    .typeError('El monto debe ser un número')
    .positive('El monto debe ser positivo')
    .required('Monto es requerido'),
  currency: yup
    .mixed<PaymentFormData['currency']>()
    .oneOf(['USD', 'COP'], 'Moneda inválida')
    .required('Moneda es requerida'),
  description: yup.string().required('Descripción es requerida'),
  name: yup.string().required('Nombre del titular es requerido'),
  document_type: yup
    .mixed<PaymentFormData['document_type']>()
    .oneOf(['Cédula', 'Pasaporte'], 'Tipo de documento inválido')
    .required('Tipo de documento es requerido'),
  card_number: yup
    .string()
    .matches(/^[0-9]{16,19}$/, 'Número de tarjeta inválido (16-19 dígitos)')
    .required('Número de tarjeta es requerido'),
  expiry_date: yup
    .string()
    .matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Fecha de vencimiento inválida (MM/YY)')
    .required('Fecha de vencimiento es requerida'),
  cvv: yup
    .string()
    .matches(/^[0-9]{3,4}$/i, 'CVV inválido')
    .required('CVV es requerido'),
}).required();