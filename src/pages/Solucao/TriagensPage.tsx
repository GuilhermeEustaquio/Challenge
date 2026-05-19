import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { ErrorState } from '../../components/ErrorState/ErrorState';
import { FormInput } from '../../components/FormInput/FormInput';
import { FormSelect } from '../../components/FormSelect/FormSelect';
import { LoadingState } from '../../components/LoadingState/LoadingState';
import { StatusBadge } from '../../components/StatusBadge/StatusBadge';
import { triagemService } from '../../services/triagemService';
import type { Triagem } from '../../types';

export function TriagensPage() {
  const [list, setList] = useState<Triagem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState<Triagem | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<any>();

  useEffect(() => {
    triagemService.listar()
      .then(setList)
      .catch(() => setError('Erro ao carregar triagens.'))
      .finally(() => setLoading(false));
  }, []);

  const onEdit = (t: Triagem) => { setEditing(t); reset(t); };
  const onCancel = () => { setEditing(null); reset({}); };

  const save = async (values: any) => {
    const payload = { ...values, idBenef: Number(values.idBenef), idVolun: Number(values.idVolun) };
    if (editing?.id) {
      const updated = await triagemService.atualizar(editing.id, { ...editing, ...payload });
      setList((p) => p.map((x) => x.id === editing.id ? updated : x));
    } else {
      const created = await triagemService.criar(payload);
      setList((p) => [...p, created]);
    }
    onCancel();
  };

  const remove = async (id: number) => {
    await triagemService.remover(id);
    setList((p) => p.filter((x) => x.id !== id));
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Triagens</h1>

      <form onSubmit={handleSubmit(save)} className="grid gap-3 rounded-2xl border bg-white p-5 md:grid-cols-2">
        <h2 className="md:col-span-2 font-semibold text-slate-700">{editing ? 'Editar triagem' : 'Nova triagem'}</h2>
        <FormInput label="ID do beneficiário" type="number"
          registration={register('idBenef', { valueAsNumber: true, required: 'Obrigatório', min: { value: 1, message: 'ID inválido' } })}
          error={errors.idBenef} disabled={!!editing} />
        <FormInput label="ID do voluntário" type="number"
          registration={register('idVolun', { valueAsNumber: true, required: 'Obrigatório', min: { value: 1, message: 'ID inválido' } })}
          error={errors.idVolun} />
        <FormInput label="Data de início" type="date"
          registration={register('dtInicio', { required: 'Obrigatório' })} error={errors.dtInicio} />
        <FormInput label="Data de fim" type="date"
          registration={register('dtFim')} error={errors.dtFim} placeholder="Opcional" />
        <FormSelect label="Resultado"
          registration={register('resultado', { required: 'Obrigatório' })}
          options={[
            { label: 'Pendente', value: 'PENDENTE' },
            { label: 'Aprovado', value: 'APROVADO' },
            { label: 'Reprovado', value: 'REPROVADO' },
          ]}
          error={errors.resultado} />
        <div className="md:col-span-2 flex gap-2 pt-2 border-t">
          <button type="submit" className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700">
            {editing ? 'Salvar' : 'Adicionar'}
          </button>
          {editing && <button type="button" onClick={onCancel} className="rounded-xl border px-4 py-2 text-sm">Cancelar</button>}
        </div>
      </form>

      {list.length === 0 ? <EmptyState /> : (
        <ul className="space-y-2">
          {list.map((t) => (
            <li key={t.id} className="flex items-center justify-between rounded-xl border bg-white p-4 text-sm shadow-sm">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <p className="font-semibold">Triagem #{t.id}</p>
                  <StatusBadge text={t.resultado} />
                  {!t.dtFim && <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">Em andamento</span>}
                </div>
                <p className="text-xs text-slate-500">
                  Benef. ID: {t.idBenef} · Vol. ID: {t.idVolun} · Início: {t.dtInicio}
                  {t.dtFim && ` · Fim: ${t.dtFim}`}
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => onEdit(t)} className="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white">Editar</button>
                <button onClick={() => t.id && remove(t.id)} className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white">Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
