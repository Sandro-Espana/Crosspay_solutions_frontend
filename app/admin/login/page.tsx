"use client";
import { useState } from 'react';
import { adminLogin } from '@/lib/api';
import { saveToken } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import HexBackground from '@/components/layout/HexBackground';
import Badge from '@/components/Badge';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await adminLogin({ username, password });
      saveToken(res.access_token);
      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err?.response?.data?.detail ?? 'Error de autenticación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <Navbar />
      <HexBackground>
        <section className="max-w-md mx-auto text-center">
          <Badge label="Panel Administrativo" />
          <h1 className="mt-6 font-bold leading-[0.95]" style={{ fontSize: 'clamp(1.8rem,5vw,42px)' }}>
            Acceso <span className="text-purple-accent">Admin</span>
          </h1>
          <p className="mt-3 text-text-secondary">Inicia sesión para gestionar transacciones.</p>

          <form onSubmit={submit} className="card mt-8 p-6 rounded-xl2 text-left space-y-4">
            <div>
              <label className="block text-sm mb-1 text-text-secondary">Usuario</label>
              <input
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full rounded-lg bg-[#121212] border border-white/10 px-3 py-2 outline-none focus:border-purple-accent"
                placeholder="admin01"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-text-secondary">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full rounded-lg bg-[#121212] border border-white/10 px-3 py-2 outline-none focus:border-purple-accent"
                placeholder="••••••••"
                required
              />
            </div>
            {error && <div className="text-red-400 text-sm">{error}</div>}
            <button
              type="submit"
              disabled={loading}
              className="w-full badge-gradient text-white font-semibold py-2.5 rounded-lg disabled:opacity-60"
            >
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>
        </section>
      </HexBackground>
    </main>
  );
}
