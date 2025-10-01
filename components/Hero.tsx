import Badge from './Badge';

export default function Hero() {
  return (
    <section className="text-center pt-10 pb-16">
      <Badge label="App Versión 1.0" />
      <h1 className="mt-6 font-bold leading-[0.95]" style={{
        fontSize: 'clamp(2rem, 6vw, 64px)'
      }}>
        Solucionamos tus<br/>pagos <span className="text-purple-accent">Internacionales</span>
      </h1>
      <p className="mt-6 max-w-[760px] mx-auto text-text-secondary" style={{
        fontSize: 'clamp(14px, 2.5vw, 18px)'
      }}>
        Gestión Rápida y Segura de pagos globales con tecnología avanzada y costos
        competitivos para empresas.
      </p>
    </section>
  );
}
