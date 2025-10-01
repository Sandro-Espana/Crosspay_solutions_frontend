"use client";
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="w-full pt-6">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between card rounded-xl2 px-5 py-4 shadow-soft">
          <div className="flex items-center gap-3">
            {/* Mobile isotipo */}
            <img src="/logo/crosspay-isotipo.svg" alt="CrossPay Solutions" className="h-8 w-auto md:hidden" />
            {/* Desktop wordmark */}
            <img src="/logo/crosspay-solutions.svg" alt="CrossPay Solutions" className="hidden md:block h-8 md:h-9 w-auto" />
          </div>
          <button aria-label="Menú" className="p-2" onClick={() => setOpen(!open)}>
            <div className="w-7 h-0.5 bg-white mb-1.5 rounded" />
            <div className="w-7 h-0.5 bg-white/80 mb-1.5 rounded" />
            <div className="w-7 h-0.5 bg-white/60 rounded" />
          </button>
        </div>
      </div>
    </header>
  );
}
