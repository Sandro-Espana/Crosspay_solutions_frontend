'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export const Navbar = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/payment', label: 'Tesorería Inteligente' },
    { href: '/#servicios', label: 'Servicios' },
    { href: '/#nosotros', label: 'Nosotros' },
    { href: '/#contacto', label: 'Contacto' },
  ];

  return (
    <nav className="w-full bg-background/80 backdrop-blur-md shadow-soft">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo (izquierda) */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo/crosspay-solutions.svg"
              alt="CROSSPAY SOLUTIONS"
              width={160}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Enlaces centro - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors ${
                    isActive ? 'text-purple-accent' : 'text-text-secondary hover:text-white'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Acciones (derecha) */}
          <div className="flex items-center gap-4">
            <Link
              href="/admin/login"
              className="text-text-secondary hover:text-white transition-colors hidden md:inline"
            >
              Iniciar Sesión
            </Link>
            <button
              className="text-text-secondary hidden md:inline"
              aria-label="Idioma"
              title="Idioma"
              type="button"
            >
              地A
            </button>

            {/* Botón hamburguesa (móvil) */}
            <button
              type="button"
              className="md:hidden text-text-secondary hover:text-white transition-colors"
              aria-label="Abrir menú"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-background/95 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-text-secondary hover:text-white transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-white/10 mt-2 flex items-center justify-between">
              <Link
                href="/admin/login"
                className="text-text-secondary hover:text-white transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Iniciar Sesión
              </Link>
              <span className="text-text-secondary">地A</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}; 