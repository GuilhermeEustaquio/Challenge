import { useParams } from 'react-router-dom';

export function EntityDetailPage({ entidade }: { entidade: string }) {
  const { id } = useParams();
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-slate-900">Detalhe de {entidade}</h1>
      <p className="mt-2 text-sm text-slate-600">
        Rota preparada para integração com o backend Java/Quarkus. Registro atual: <strong>#{id}</strong>.
      </p>
    </section>
  );
}
