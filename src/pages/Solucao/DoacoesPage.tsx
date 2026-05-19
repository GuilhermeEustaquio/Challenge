import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { ErrorState } from '../../components/ErrorState/ErrorState';
import { FormInput } from '../../components/FormInput/FormInput';
import { LoadingState } from '../../components/LoadingState/LoadingState';
import { doacaoService } from '../../services/doacaoService';
import type { Doacao } from '../../types';

export function DoacoesPage() {
  const [list, setList] = useState<Doacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState<Doacao | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<any>();

  useEffect(() => {
    doacaoService.listar()
      .then(setList)
      .catch(() => setError('Erro ao carregar doações.'))
      .finally(() => setLoading(false));
  }, []);

  const onEdit = (d: Doacao) => { setEditing(d); reset(d); };
  const onCancel = () => { setEditing(null); reset({}); };

  const save = async (values: any) => {
    if (editing?.id) {
      const updated = await doacaoService.atualizar(editing.id, { ...editing, ...values });
      setList((p) => p.map((x) => x.id === editing.id ? updated : x));
    } else {
      const created = await doacaoService.criar(values);
      setList((p) => [...p, created]);
    }
    onCancel();
  };

  const remove = async (id: number) => {
    await doacaoService.remover(id);
    setList((p) => p.filter((x) => x.id !== id));
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Doações</h1>

      <form onSubmit={handleSubmit(save)} className="grid gap-3 rounded-2xl border bg-white p-5 md:grid-cols-2">
        <h2 className="md:col-span-2 font-semibold text-slate-700">{editing ? 'Editar doação' : 'Nova doação'}</h2>
        <FormInput label="ID do doador" type="number"
          registration={register('doadorId', { valueAsNumber: true, required: 'Obrigatório', min: { value: 1, message: 'ID inválido' } })}
          error={errors.doadorId} disabled={!!editing} />
        <FormInput label="Valor (R$)" type="number"
          registration={register('valor', { valueAsNumber: true, required: 'Obrigatório', min: { value: 0.01, message: 'Valor positivo' } })}
          error={errors.valor} />
        <FormInput label="Descrição" registration={register('descricao')} error={errors.descricao} placeholder="Opcional" />
        <div className="md:col-span-2 flex gap-2 pt-2 border-t">
          <button type="submit" className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700">
            {editing ? 'Salvar' : 'Adicionar'}
          </button>
          {editing && <button type="button" onClick={onCancel} className="rounded-xl border px-4 py-2 text-sm">Cancelar</button>}
        </div>
      </form>

      {list.length === 0 ? <EmptyState /> : (
        <ul className="space-y-2">
          {list.map((d) => (
            <li key={d.id} className="flex items-center justify-between rounded-xl border bg-white p-4 text-sm shadow-sm">
              <div>
                <p className="font-semibold">Doação #{d.id}</p>
                <p className="text-xs text-slate-500">
                  Doador ID: {d.doadorId} · R$ {Number(d.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  {d.descricao && ` · ${d.descricao}`}
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => onEdit(d)} className="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white">Editar</button>
                <button onClick={() => d.id && remove(d.id)} className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white">Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
