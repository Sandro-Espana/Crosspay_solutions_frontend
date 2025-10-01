import { Transaction } from '@/lib/api';

export default function TransactionsTable({ items }: { items: Transaction[] }) {
  return (
    <div className="overflow-auto card rounded-xl2 p-4">
      <table className="min-w-full text-sm">
        <thead className="text-paragraph text-left">
          <tr>
            <th className="py-2 pr-4">Fecha</th>
            <th className="py-2 pr-4">Cliente</th>
            <th className="py-2 pr-4">Descripción</th>
            <th className="py-2 pr-4">Monto</th>
            <th className="py-2 pr-4">Moneda</th>
            <th className="py-2 pr-4">Tarjeta</th>
          </tr>
        </thead>
        <tbody>
          {items.map(tx => (
            <tr key={tx.id} className="border-t" style={{ borderColor: 'var(--line)' }}>
              <td className="py-3 pr-4 text-paragraph">{new Date(tx.created_at).toLocaleString()}</td>
              <td className="py-3 pr-4">{tx.name}</td>
              <td className="py-3 pr-4">{tx.description}</td>
              <td className="py-3 pr-4">{tx.amount.toLocaleString()}</td>
              <td className="py-3 pr-4">{tx.currency}</td>
              <td className="py-3 pr-4">{tx.masked_card ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {items.length === 0 && (
        <div className="text-center text-paragraph py-8">No hay transacciones registradas.</div>
      )}
    </div>
  );
}
