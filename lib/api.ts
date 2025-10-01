import axios from 'axios';
import { API_BASE } from './config';
import { getToken } from './auth';

export const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = getToken();
    if (token) {
      config.headers = config.headers ?? {};
      (config.headers as any)['Authorization'] = `Bearer ${token}`;
    }
  }
  return config;
});

export type LoginRequest = { username: string; password: string };
export type TokenResponse = { access_token: string; token_type: string };

export type Transaction = {
  id: number;
  currency: string;
  amount: number;
  description: string;
  name: string;
  document_type: string;
  masked_card?: string;
  created_at: string;
};

export async function adminLogin(data: LoginRequest) {
  const res = await api.post<TokenResponse>('/admin/login', data);
  return res.data;
}

export async function getAdminTransactions() {
  const res = await api.get<Transaction[]>('/admin/transactions');
  return res.data;
}
