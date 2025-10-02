export default function Footer() {
  return (
    <footer className="mt-10 px-4 pb-10">
      <div className="mx-auto max-w-6xl text-sm">
        {/* Fila del logo */}
        <div className="md:pl-12 lg:pl-16 mb-6">
          {/* Mobile isotipo */}
          <img src="/logo/crosspay-isotipo.svg" alt="CrossPay Solutions" className="h-8 w-auto md:hidden" />
          {/* Desktop wordmark */}
          <img src="/logo/crosspay-solutions.svg" alt="CrossPay Solutions" className="hidden md:block h-10 w-auto" />
        </div>

        {/* Fila de 2 columnas: (Descripción) | (Soluciones + Legal) */}
        <div className="grid md:grid-cols-2 gap-16 items-start md:pl-12 lg:pl-16">
          {/* Columna 1: descripción */}
          <div>
            <p className="text-text-secondary leading-6 max-w-md">
              CrossPay Solutions optimiza pagos y transacciones internacionales con
              soluciones tecnológicas avanzadas, enfocándose en la velocidad,
              seguridad y transparencia.
            </p>
          </div>

          {/* Columna 2: grid con Soluciones y Legal con gap más corto */}
          <div className="grid grid-cols-2 gap-8 md:gap-10 justify-items-start">
            <div>
              <h3 className="text-white font-semibold mb-3">Soluciones</h3>
              <ul className="space-y-2 text-text-secondary">
                <li>Servicios FX</li>
                <li>Tesorería Inteligente</li>
                <li className="text-[#ff4ab8]">Link de Pagos Crosspay</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3">Legal</h3>
              <ul className="space-y-2 text-text-secondary">
                <li>Cumplimiento Normativo</li>
                <li>Política de Privacidad</li>
                <li>Términos y Condiciones</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mx-auto max-w-6xl mt-8 pt-5 border-t border-white/10 text-text-secondary text-xs md:grid md:grid-cols-3 md:items-center">
        <div className="flex items-center gap-8 md:pl-12 lg:pl-16">
          {/* X icon */}
          <a href="#" aria-label="X" className="group text-purple-accent" target="_blank" rel="noopener noreferrer">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-colors">
              <path d="M4 4l16 16M20 4L4 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </a>
          {/* Instagram icon */}
          <a href="#" aria-label="Instagram" className="group text-text-secondary hover:text-white" target="_blank" rel="noopener noreferrer">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2"/>
              <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="2"/>
              <circle cx="18" cy="6" r="1" fill="currentColor"/>
            </svg>
          </a>
          {/* LinkedIn icon */}
          <a href="#" aria-label="LinkedIn" className="group text-purple-accent" target="_blank" rel="noopener noreferrer">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="2"/>
              <rect x="7" y="10" width="2.8" height="8" fill="currentColor"/>
              <circle cx="8.4" cy="7.6" r="1.4" fill="currentColor"/>
              <path d="M12 10h1.9a3.1 3.1 0 013.1 3.1V18h-2.6v-3.1a1.1 1.1 0 00-1.1-1.1H12V10z" fill="currentColor"/>
            </svg>
          </a>
        </div>
        <div className="hidden md:block" />
        <div className="mt-6 md:mt-0 md:justify-self-start">
          © {new Date().getFullYear()} <span className="text-white">CrossPay Solutions</span>. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
