"use client";
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import HexBackground from '@/components/HexBackground';
import Badge from '@/components/Badge';
import TransactionsTable from '@/components/TransactionsTable';
import { getAdminTransactions, Transaction } from '@/lib/api';
import { clearToken, getToken } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [items, setItems] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace('/admin/login');
      return;
    }
    (async () => {
      try {
        const data = await getAdminTransactions();
        setItems(data);
      } catch (err: any) {
        if (err?.response?.status === 401) {
          clearToken();
          router.replace('/admin/login');
          return;
        }
        setError('No se pudieron cargar las transacciones');
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  return (
    <main>
      <Navbar />
      <HexBackground>
        <div className="flex items-center justify-between mb-6">
          <div>
            <Badge label="Transacciones" />
            <h1 className="mt-4 font-bold leading-[0.95]" style={{ fontSize: 'clamp(1.6rem,4vw,36px)' }}>
              Panel <span className="text-purple-accent">Dashboard</span>
            </h1>
            <p className="text-text-secondary mt-1">Listado de pagos recientes</p>
          </div>
          <button
            onClick={() => { clearToken(); router.push('/admin/login'); }}
            className="text-sm text-text-secondary hover:text-white border border-white/10 rounded-lg px-3 py-2"
          >Cerrar sesión</button>
        </div>

        {loading ? (
          <div className="text-text-secondary">Cargando...</div>
        ) : error ? (
          <div className="text-red-400">{error}</div>
        ) : (
          <TransactionsTable items={items} />)
        }
      </HexBackground>
    </main>
  );
}
