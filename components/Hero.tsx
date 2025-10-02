import Badge from './Badge';

export default function Hero() {
  return (
    <section className="text-center pt-10 pb-16">
      <Badge label="App Versión 1.0" />
      <h1 className="mt-6 font-bold leading-[0.95]" style={{
        fontSize: 'clamp(1.5rem, 5vw, 64px)'
      }}>
        CrossPay Solutions<br/>
        <span className="text-purple-accent">Socio Estratégico para el Comercio Global</span>
      </h1>
      <p className="mt-6 max-w-[760px] mx-auto text-text-secondary" style={{
        fontSize: 'clamp(14px, 2.5vw, 18px)'
      }}>
        CrossPay Solutions impulsa las operaciones globales de importadores, exportadores y emprendedores digitales con tecnología avanzada y soluciones éticas, simplificando transacciones y creando alianzas estratégicas para el éxito en un mercado competitivo.
      </p>
    </section>
  );
}
