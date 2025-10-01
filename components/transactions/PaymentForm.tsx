{{ ... }}
const paymentSchema = yup.object().shape({
  amount: yup.number()
    .typeError('El monto debe ser un número')
    .positive('El monto debe ser positivo')
    .required('Monto es requerido'),
  currency: yup.string().oneOf(['USD', 'COP'], 'Moneda inválida').required('Moneda es requerida'),
  description: yup.string().required('Descripción es requerida'),
  name: yup.string().required('Nombre del titular es requerido'),
  document_type: yup.string().oneOf(['Cédula', 'Pasaporte'], 'Tipo de documento inválido').required('Tipo de documento es requerido'),
  card_number: yup.string()
    .matches(/^[0-9]{16,19}$/, 'Número de tarjeta inválido (16-19 dígitos)')
    .required('Número de tarjeta es requerido'),
  expiry_date: yup.string()
    .matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Fecha de vencimiento inválida (MM/YY)')
    .required('Fecha de vencimiento es requerida'),
  cvv: yup.string()
    .matches(/^[0-9]{3,4}$/, 'CVV inválido')
    .required('CVV es requerido'),
});

export function PaymentForm({ onSubmit, loading = false, error = '' }) {
  const { register, handleSubmit, formState: { errors } } = useForm<PaymentFormData>({
    resolver: yupResolver(paymentSchema),
    defaultValues: {
      currency: 'USD',
      document_type: 'Cédula',
    },
  });
{{ ... }}
            <select
              id="currency"
              {...register('currency')}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={loading}
            >
              <option value="USD">USD - Dólar Estadounidense</option>
              <option value="COP">COP - Peso Colombiano</option>
            </select>
{{ ... }}
            <select
              id="document_type"
              {...register('document_type')}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={loading}
            >
              <option value="Cédula">Cédula</option>
              <option value="Pasaporte">Pasaporte</option>
            </select>
{{ ... }}
          <input
            id="card_number"
            {...register('card_number')}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="0000000000000000"
            disabled={loading}
          />
{{ ... }}
