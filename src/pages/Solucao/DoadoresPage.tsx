import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AddressSection } from '../../components/AddressSection/AddressSection';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { ErrorState } from '../../components/ErrorState/ErrorState';
import { FormInput } from '../../components/FormInput/FormInput';
import { LoadingState } from '../../components/LoadingState/LoadingState';
import { MaskedInput } from '../../components/MaskedInput/MaskedInput';
import { doadorService } from '../../services/doadorService';
import type { Doador } from '../../types';
import { digits, isCpfCnpjComplete, isPhoneComplete, maskCpfCnpj, maskPhone } from '../../utils/masks';

export function DoadoresPage() {
  const [list, setList] = useState<Doador[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState<Doador | null>(null);

  const { register, handleSubmit, reset, control, setValue, formState: { errors } } = useForm<any>();

  useEffect(() => {
    doadorService.listar()
      .then(setList)
      .catch(() => setError('Erro ao carregar doadores.'))
      .finally(() => setLoading(false));
  }, []);

  const onEdit = (d: Doador) => { setEditing(d); reset(d); };
  const onCancel = () => { setEditing(null); reset({}); };

  const save = async (values: any) => {
    const payload = { ...values, documento: digits(values.documento ?? ''), telefone: digits(values.telefone ?? ''), endereco: { ...values.endereco, cep: digits(values.endereco?.cep ?? '') } };
    if (editing?.id) {
      const updated = await doadorService.atualizar(editing.id, { ...editing, ...payload });
      setList((p) => p.map((x) => x.id === editing.id ? updated : x));
    } else {
      const created = await doadorService.criar(payload);
      setList((p) => [...p, created]);
    }
    onCancel();
  };

  const remove = async (id: number) => {
    await doadorService.remover(id);
    setList((p) => p.filter((x) => x.id !== id));
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Doadores</h1>

      <form onSubmit={handleSubmit(save)} className="grid gap-3 rounded-2xl border bg-white p-5 md:grid-cols-2">
        <h2 className="md:col-span-2 font-semibold text-slate-700">{editing ? 'Editar doador' : 'Novo doador'}</h2>
        <FormInput label="Nome / Razão social" registration={register('nome', { required: 'Obrigatório' })} error={errors.nome} disabled={!!editing} />
        <MaskedInput label="CPF / CNPJ" name="documento" control={control} mask={maskCpfCnpj} disabled={!!editing}
          placeholder="000.000.000-00 ou 00.000.000/0000-00"
          rules={{ required: 'Obrigatório', validate: (v) => isCpfCnpjComplete(v) || 'CPF ou CNPJ incompleto' }} error={errors.documento} />
        <FormInput label="Data de nascimento / fundação" type="date" registration={register('dtNasc', { required: 'Obrigatório' })} error={errors.dtNasc} />
        <MaskedInput label="Telefone" name="telefone" control={control} mask={maskPhone}
          placeholder="(00) 00000-0000"
          rules={{ required: 'Obrigatório', validate: (v) => isPhoneComplete(v) || 'Telefone incompleto' }} error={errors.telefone} />
        <FormInput label="E-mail" type="email"
          registration={register('email', { required: 'Obrigatório', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'E-mail inválido' } })}
          error={errors.email} />
        <AddressSection control={control} register={register} setValue={setValue} errors={errors} />
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
                <p className="font-semibold">{d.nome}</p>
                <p className="text-xs text-slate-500">{maskCpfCnpj(d.documento)} · {d.email} · {d.endereco?.localidade}/{d.endereco?.uf}</p>
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
