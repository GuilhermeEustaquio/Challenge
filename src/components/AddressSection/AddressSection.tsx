import { useEffect, useState } from 'react';
import { useWatch, type Control, type UseFormRegister, type UseFormSetValue } from 'react-hook-form';
import { FormInput } from '../FormInput/FormInput';
import { MaskedInput } from '../MaskedInput/MaskedInput';
import { digits, maskCep, isCepComplete } from '../../utils/masks';

const UF_LIST = ['AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MG','MS','MT',
                  'PA','PB','PE','PI','PR','RJ','RN','RO','RR','RS','SC','SE','SP','TO'];

interface Props {
  control: Control<any>;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  errors: any;
}

export function AddressSection({ control, register, setValue, errors }: Props) {
  // All fields use the nested "endereco." prefix to match Java's Endereco object
  const cep = useWatch({ control, name: 'endereco.cep' });
  const [fetching, setFetching] = useState(false);
  const [cepMsg, setCepMsg] = useState<{ text: string; ok: boolean } | null>(null);

  useEffect(() => {
    const raw = digits(cep ?? '');
    if (raw.length !== 8) { setCepMsg(null); return; }

    setFetching(true);
    setCepMsg(null);
    fetch(`https://viacep.com.br/ws/${raw}/json/`)
      .then((r) => r.json())
      .then((data) => {
        if (data.erro) { setCepMsg({ text: 'CEP não encontrado', ok: false }); return; }
        setValue('endereco.logradouro', data.logradouro ?? '');
        setValue('endereco.bairro',     data.bairro     ?? '');
        setValue('endereco.uf',         data.uf         ?? '');
        setValue('endereco.localidade', data.localidade ?? '');
        setCepMsg({ text: `${data.localidade} / ${data.uf}`, ok: true });
      })
      .catch(() => setCepMsg({ text: 'Erro ao consultar CEP', ok: false }))
      .finally(() => setFetching(false));
  }, [cep, setValue]);

  const endErrors = errors?.endereco ?? {};

  return (
    <>
      {/* Section divider */}
      <div className="md:col-span-2 flex items-center gap-3 pt-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Endereço</span>
        <span className="flex-1 border-t border-slate-200" />
      </div>

      {/* CEP */}
      <div className="relative">
        <MaskedInput
          label="CEP"
          name="endereco.cep"
          control={control}
          mask={maskCep}
          placeholder="00000-000"
          rules={{
            required: 'Obrigatório',
            validate: (v) => isCepComplete(v) || 'CEP incompleto (8 dígitos)',
          }}
          error={endErrors.cep}
        />
        {fetching && (
          <span className="absolute right-3 top-7 flex items-center gap-1 text-xs text-slate-400">
            <svg className="h-3 w-3 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Buscando…
          </span>
        )}
        {cepMsg && !fetching && (
          <small className={`text-xs font-medium ${cepMsg.ok ? 'text-emerald-600' : 'text-rose-600'}`}>
            {cepMsg.ok ? '✓ ' : '✕ '}{cepMsg.text}
          </small>
        )}
      </div>

      {/* UF */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">UF</label>
        <select
          {...register('endereco.uf', { required: 'Obrigatório', validate: (v) => UF_LIST.includes(v) || 'UF inválida' })}
          className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none transition
            ${endErrors.uf
              ? 'border-rose-400 ring-2 ring-rose-200'
              : 'border-slate-300 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20'
            }`}
        >
          <option value="">Selecione…</option>
          {UF_LIST.map((uf) => <option key={uf} value={uf}>{uf}</option>)}
        </select>
        {endErrors.uf && <small className="text-xs font-medium text-rose-600">{endErrors.uf.message}</small>}
      </div>

      <FormInput label="Logradouro" registration={register('endereco.logradouro', { required: 'Obrigatório' })} error={endErrors.logradouro} placeholder="Preenchido automaticamente pelo CEP" />
      <FormInput label="Bairro"     registration={register('endereco.bairro',     { required: 'Obrigatório' })} error={endErrors.bairro}     placeholder="Preenchido automaticamente pelo CEP" />
      <FormInput label="Cidade"     registration={register('endereco.localidade', { required: 'Obrigatório' })} error={endErrors.localidade} placeholder="Preenchida automaticamente pelo CEP" />
      <FormInput label="Número"     registration={register('endereco.numero')}                                  error={endErrors.numero}     placeholder="S/N" />
      <FormInput label="Complemento" registration={register('endereco.complemento')}                           error={endErrors.complemento} placeholder="Opcional" />
    </>
  );
}
