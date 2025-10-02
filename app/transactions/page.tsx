'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TransactionList } from '@/components/features/transactions/TransactionList';

type Transaction = {
  id: string;
  amount: number;
  currency: string;
  description: string;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
  masked_card: string;
};

export default function TransactionsPage() {
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login?redirect=/transactions');
          return;
        }

        const response = await fetch('/api/transactions', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('No se pudieron cargar las transacciones');
        }

        const data = await response.json();
        setTransactions(data);
      } catch (err) {
        setError(err.message || 'Error al cargar las transacciones');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [router]);

  // Filtrar transacciones
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.masked_card?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="sm:flex sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Transacciones</h1>
            <p className="mt-2 text-sm text-gray-400">
              Historial de todas tus transacciones
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link
              href="/payment"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <svg
                className="-ml-1 mr-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Nueva Transacción
            </Link>
          </div>
        </div>

        <div className="bg-gray-800 shadow overflow-hidden sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent sm:text-sm"
                  placeholder="Buscar transacciones..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="w-full sm:w-auto">
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent sm:text-sm rounded-md bg-gray-700 text-white"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">Todos los estados</option>
                  <option value="completed">Completadas</option>
                  <option value="pending">Pendientes</option>
                  <option value="failed">Fallidas</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 shadow overflow-hidden sm:rounded-lg">
          <TransactionList 
            transactions={filteredTransactions} 
            isLoading={loading}
            error={error}
          />
        </div>

        {!loading && transactions.length > 0 && (
          <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
            <div>
              Mostrando <span className="font-medium">{filteredTransactions.length}</span> de{' '}
              <span className="font-medium">{transactions.length}</span> transacciones
            </div>
            <div className="flex space-x-2">
              <button
                className="px-3 py-1 rounded-md border border-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled
              >
                Anterior
              </button>
              <button
                className="px-3 py-1 rounded-md border border-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled
              >
                Siguiente
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
