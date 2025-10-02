// lib/services/PaymentService.ts
import { PaymentFormData } from '@/components/features/payment/PaymentForm.types';

export interface TransactionResponse {
  id: number;
  currency: string;
  amount: number;
  description: string;
  name: string;
  document_type: string;
  masked_card: string;
}

export class PaymentService {
  private static readonly API_URL = process.env.NEXT_PUBLIC_API_URL;
  private static readonly TIMEOUT_MS = 10000;

  static async createTransaction(transactionData: PaymentFormData, token: string | null): Promise<TransactionResponse> {
    if (!token) {
      throw new Error('No authentication token found');
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.TIMEOUT_MS);

    try {
      const amount = parseFloat(transactionData.amount.toString());
      if (amount <= 0) {
        throw new Error('El monto debe ser mayor a 0');
      }
      const payload = {
        amount: parseFloat(transactionData.amount.toString()),
        currency: transactionData.currency,
        description: transactionData.description,
        name: transactionData.name,
        document_type: transactionData.document_type,
        card_number: transactionData.card_number,
      };

      const response = await fetch(`${this.API_URL}/transactions/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || `Error ${response.status}: ${response.statusText}`);
      }

      return data;
    } catch (error: any) {
      if (error.name === 'AbortError') {
        throw new Error('La solicitud tardó demasiado tiempo. Por favor, intenta nuevamente.');
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }
}