import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AddressSection } from '../../components/AddressSection/AddressSection';
import { ConfirmDialog } from '../../components/ConfirmDialog/ConfirmDialog';
import { CrudModal } from '../../components/CrudModal/CrudModal';
import { CrudTabs } from '../../components/CrudTabs/CrudTabs';
import { DashboardCard } from '../../components/DashboardCard/DashboardCard';
import { FormInput } from '../../components/FormInput/FormInput';
import { FormSelect } from '../../components/FormSelect/FormSelect';
import { MaskedInput } from '../../components/MaskedInput/MaskedInput';
import { StatusBadge } from '../../components/StatusBadge/StatusBadge';
import { beneficiarioService } from '../../services/beneficiarioService';
import { dentistaService } from '../../services/dentistaService';
import { doacaoService } from '../../services/doacaoService';
import { doadorService } from '../../services/doadorService';
import { triagemService } from '../../services/triagemService';
import { voluntarioService } from '../../services/voluntarioService';
import { isApiEnabled } from '../../services/api';
import type {
  Beneficiario, DashboardResumo, Dentista, Doacao, Doador, Triagem, Voluntario,
} from '../../types';
import { resetStorageKey } from '../../utils/storage';
import {
  maskCpf, maskCpfCnpj, maskPhone,
  isCpfComplete, isCpfCnpjComplete, isPhoneComplete,
  digits,
} from '../../utils/masks';

type TabKey = 'beneficiarios' | 'dentistas' | 'doadores' | 'doacoes' | 'voluntarios' | 'triagens';
type AnyEntity = Beneficiario | Dentista | Doador | Doacao | Voluntario | Triagem;

// ── Entity list row ──────────────────────────────────────────────────────────

function EntityRow({ tab, item }: { tab: TabKey; item: any }) {
  const label = (() => {
    switch (tab) {
      case 'doacoes':  return `Doação #${item.id ?? '—'}`;
      case 'triagens': return `Triagem #${item.id ?? '—'}`;
      default:         return item.nome;
    }
  })();

  const details = (() => {
    switch (tab) {
      case 'beneficiarios':
        return (
          <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-slate-500">
            <span>CPF: {maskCpf(item.cpf ?? '')}</span>
            {item.dtNasc && <span>Nasc: {item.dtNasc}</span>}
            <span>{item.email}</span>
            <span>{maskPhone(item.telefone ?? '')}</span>
            {item.endereco && <span>{item.endereco.localidade}/{item.endereco.uf}</span>}
          </div>
        );
      case 'dentistas':
        return (
          <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-slate-500">
            <span>CRO: {item.cro}</span>
            <span>CPF: {maskCpf(item.cpf ?? '')}</span>
            <span>{item.email}</span>
            {item.endereco && <span>{item.endereco.localidade}/{item.endereco.uf}</span>}
          </div>
        );
      case 'doadores':
        return (
          <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-slate-500">
            <span>Doc: {maskCpfCnpj(item.documento ?? '')}</span>
            <span>{item.email}</span>
            <span>{maskPhone(item.telefone ?? '')}</span>
            {item.endereco && <span>{item.endereco.localidade}/{item.endereco.uf}</span>}
          </div>
        );
      case 'doacoes':
        return (
          <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-slate-500">
            <span>Doador ID: {item.doadorId}</span>
            <span>Valor: R$ {Number(item.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            {item.descricao && <span>{item.descricao}</span>}
          </div>
        );
      case 'voluntarios':
        return (
          <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-slate-500">
            <span>CRO: {item.cro}</span>
            <span>CPF: {maskCpf(item.cpf ?? '')}</span>
            <span>{item.email}</span>
            {item.endereco && <span>{item.endereco.localidade}/{item.endereco.uf}</span>}
          </div>
        );
      case 'triagens':
        return (
          <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-slate-500">
            <span>Benef. ID: {item.idBenef}</span>
            <span>Vol. ID: {item.idVolun}</span>
            <span>Início: {item.dtInicio}</span>
            {item.dtFim && <span>Fim: {item.dtFim}</span>}
          </div>
        );
    }
  })();

  const badge = (() => {
    if (item.resultado) return <StatusBadge text={item.resultado} />;
    return null;
  })();

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition hover:border-primary/30 hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-semibold text-slate-800">{label}</p>
          {badge}
        </div>
        {details}
      </div>
      <div className="flex shrink-0 gap-2">
        <button
          onClick={() => (window as any).__onEdit?.(item)}
          className="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-amber-600"
        >
          Editar
        </button>
        <button
          onClick={() => (window as any).__onDelete?.(item)}
          className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-rose-700"
        >
          Excluir
        </button>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export function Solucao() {
  const [tab, setTab] = useState<TabKey>('beneficiarios');
  const [busca, setBusca] = useState('');
  const [data, setData] = useState<Record<TabKey, AnyEntity[]>>({
    beneficiarios: [], dentistas: [], doadores: [], doacoes: [], voluntarios: [], triagens: [],
  });
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState<AnyEntity | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AnyEntity | null>(null);
  const [msg, setMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const { register, handleSubmit, reset, control, setValue, formState: { errors, isSubmitting } } = useForm<any>();
  const apiAtiva = isApiEnabled();

  const carregarDados = useCallback(async (mostrarErro = true) => {
    setLoading(true);

    const erros: string[] = [];

    const safeList = async <T,>(
      nome: string,
      listar: () => Promise<T[]>,
    ): Promise<T[]> => {
      try {
        return await listar();
      } catch (error) {
        console.error(`Erro ao carregar ${nome}:`, error);
        erros.push(nome);
        return [];
      }
    };

    try {
      const [
        beneficiarios,
        dentistas,
        doadores,
        doacoes,
        voluntarios,
        triagens,
      ] = await Promise.all([
        safeList<Beneficiario>('beneficiários', beneficiarioService.listar),
        safeList<Dentista>('dentistas', dentistaService.listar),
        safeList<Doador>('doadores', doadorService.listar),
        safeList<Doacao>('doações', doacaoService.listar),
        safeList<Voluntario>('voluntários', voluntarioService.listar),
        safeList<Triagem>('triagens', triagemService.listar),
      ]);

      setData({
        beneficiarios,
        dentistas,
        doadores,
        doacoes,
        voluntarios,
        triagens,
      });

      if (mostrarErro && erros.length > 0) {
        setMsg({
          text: `Alguns dados não foram carregados: ${erros.join(', ')}.`,
          type: 'error',
        });
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  useEffect(() => {
    if (!msg) return;
    const id = setTimeout(() => setMsg(null), 4000);
    return () => clearTimeout(id);
  }, [msg]);

  const tabs = [
    { key: 'beneficiarios', label: 'Beneficiários' },
    { key: 'dentistas',     label: 'Dentistas' },
    { key: 'doadores',      label: 'Doadores' },
    { key: 'doacoes',       label: 'Doações' },
    { key: 'voluntarios',   label: 'Voluntários' },
    { key: 'triagens',      label: 'Triagens' },
  ] as const;

  const filtered = useMemo(
    () => data[tab].filter((item) => JSON.stringify(item).toLowerCase().includes(busca.toLowerCase())),
    [busca, data, tab],
  );

  const dashboard: DashboardResumo = useMemo(() => ({
    totalBeneficiarios: data.beneficiarios.length,
    totalDentistas:     data.dentistas.length,
    totalDoadores:      data.doadores.length,
    totalDoacoes:       data.doacoes.length,
    totalVoluntarios:   data.voluntarios.length,
    totalTriagens:      data.triagens.length,
    triagensEmAndamento: data.triagens.filter((t: any) => !t.dtFim).length,
  }), [data]);

  const restaurarDados = async () => {
    ['centraldobem_beneficiarios', 'centraldobem_dentistas', 'centraldobem_doadores',
     'centraldobem_doacoes', 'centraldobem_voluntarios', 'centraldobem_triagens'].forEach(resetStorageKey);
    const [beneficiarios, dentistas, doadores, doacoes, voluntarios, triagens] = await Promise.all([
      beneficiarioService.listar(), dentistaService.listar(), doadorService.listar(),
      doacaoService.listar(), voluntarioService.listar(), triagemService.listar(),
    ]);
    setData({ beneficiarios, dentistas, doadores, doacoes, voluntarios, triagens });
    setMsg({ text: 'Dados de exemplo restaurados com sucesso!', type: 'success' });
  };

  const onAdd = () => { setEditing(null); reset({}); setOpenModal(true); };
  const onEdit = (item: AnyEntity) => { setEditing(item); reset(item); setOpenModal(true); };

  (window as any).__onEdit   = onEdit;
  (window as any).__onDelete = (item: AnyEntity) => setDeleteTarget(item);

  /** Strip masks from raw-digit fields before persisting to API */
  const cleanForSave = (values: any): any => {
    const out = { ...values };
    if (typeof out.cpf === 'string')       out.cpf       = digits(out.cpf);
    if (typeof out.telefone === 'string')  out.telefone  = digits(out.telefone);
    if (typeof out.documento === 'string') out.documento = digits(out.documento);
    if (out.endereco && typeof out.endereco.cep === 'string') {
      out.endereco = { ...out.endereco, cep: digits(out.endereco.cep) };
    }
    return out;
  };

  const save = async (values: any) => {
    const serviceMap: any = {
      beneficiarios: beneficiarioService,
      dentistas: dentistaService,
      doadores: doadorService,
      doacoes: doacaoService,
      voluntarios: voluntarioService,
      triagens: triagemService,
    };

    const service = serviceMap[tab];
    const payload = cleanForSave(values);

    try {
      if (editing && 'id' in editing && editing.id) {
        await service.atualizar(editing.id, { ...editing, ...payload });

        setMsg({
          text: 'Registro atualizado com sucesso!',
          type: 'success',
        });
      } else {
        await service.criar(payload);

        setMsg({
          text: 'Registro adicionado com sucesso!',
          type: 'success',
        });
      }

      setOpenModal(false);
      await carregarDados(false);
    } catch (error) {
      console.error('Erro ao salvar registro:', error);

      setMsg({
        text: 'Ocorreu um erro ao salvar. Tente novamente.',
        type: 'error',
      });
    }
  };

  const onDelete = async () => {
    if (!deleteTarget || !('id' in deleteTarget) || !deleteTarget.id) return;
    const serviceMap: any = {
      beneficiarios: beneficiarioService, dentistas: dentistaService, doadores: doadorService,
      doacoes: doacaoService, voluntarios: voluntarioService, triagens: triagemService,
    };
    try {
      await serviceMap[tab].remover(deleteTarget.id);
      setData((p) => ({ ...p, [tab]: p[tab].filter((x: any) => x.id !== deleteTarget.id) }));
      setMsg({ text: 'Registro excluído com sucesso!', type: 'success' });
    } catch {
      setMsg({ text: 'Ocorreu um erro ao excluir. Tente novamente.', type: 'error' });
    }
    setDeleteTarget(null);
  };

  const isEditing = Boolean(editing);

  /** Fields locked when editing (primary identifiers) */
  const disabled = (field: string) =>
    isEditing && (
      (tab === 'beneficiarios' && ['nome', 'cpf'].includes(field)) ||
      (tab === 'dentistas'     && ['nome', 'cro', 'cpf'].includes(field)) ||
      (tab === 'doadores'      && ['nome', 'documento'].includes(field)) ||
      (tab === 'voluntarios'   && ['nome', 'cro', 'cpf'].includes(field)) ||
      (tab === 'doacoes'       && ['doadorId'].includes(field)) ||
      (tab === 'triagens'      && ['idBenef'].includes(field))
    );

  const currentTabLabel = tabs.find((t) => t.key === tab)?.label ?? '';
  const singularLabel = currentTabLabel.endsWith('s') ? currentTabLabel.slice(0, -1) : currentTabLabel;

  return (
    <div className="space-y-6">
      {/* Toast */}
      {msg && (
        <div className={`fixed bottom-5 right-5 z-[100] flex items-center gap-3 rounded-xl px-5 py-3 shadow-lg text-sm font-medium ${msg.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'}`}>
          <span>{msg.type === 'success' ? '✓' : '✕'}</span>
          {msg.text}
        </div>
      )}

      {/* Header */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 text-white shadow-lg">
        <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        <h1 className="relative text-2xl font-bold md:text-3xl">Central do Bem — Área de Gestão</h1>
        <p className="relative mt-2 max-w-xl text-cyan-50 text-sm md:text-base">
          Gestão de beneficiários, dentistas, doadores, doações, voluntários e triagens, integrada ao backend Java/Quarkus.
        </p>
        {!apiAtiva && (
          <span className="relative mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
            Modo offline — dados locais
          </span>
        )}
      </section>

      {/* Dashboard */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard title="Beneficiários"      value={dashboard.totalBeneficiarios}    icon="👤" color="teal" />
        <DashboardCard title="Dentistas"           value={dashboard.totalDentistas}         icon="🦷" color="cyan" />
        <DashboardCard title="Doadores"            value={dashboard.totalDoadores}          icon="💚" color="green" />
        <DashboardCard title="Doações"             value={dashboard.totalDoacoes}           icon="💰" color="emerald" />
        <DashboardCard title="Voluntários"         value={dashboard.totalVoluntarios}       icon="🤝" color="teal" />
        <DashboardCard title="Triagens"            value={dashboard.totalTriagens}          icon="📋" color="cyan" />
        <DashboardCard title="Triagens em andamento" value={dashboard.triagensEmAndamento} icon="⏳" color="amber" />
      </section>

      {/* Tabs */}
      <CrudTabs
        tabs={tabs.map((t) => ({ key: t.key, label: t.label }))}
        active={tab}
        onChange={(k) => { setTab(k as TabKey); setBusca(''); }}
      />

      {/* List */}
      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 sm:max-w-xs">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden="true">
                <path fillRule="evenodd" d="M9 3a6 6 0 100 12A6 6 0 009 3zM1 9a8 8 0 1114.32 4.906l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387A8 8 0 011 9z" clipRule="evenodd" />
              </svg>
            </span>
            <input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder={`Buscar em ${currentTabLabel}...`}
            />
          </div>
          <div className="flex gap-2">
            {!apiAtiva && (
              <button onClick={restaurarDados} className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100">
                Restaurar exemplos
              </button>
            )}
            <button onClick={onAdd} className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700">
              <span className="text-base leading-none">+</span>
              Adicionar {singularLabel}
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12 text-slate-400">
            <svg className="mr-2 h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Carregando dados...
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-12 text-slate-400">
            <svg viewBox="0 0 24 24" className="h-10 w-10 fill-current opacity-30" aria-hidden="true">
              <path d="M20 6H4v2h16V6zm-2 5H6v2h12v-2zm-4 5H8v2h8v-2z" />
            </svg>
            <p className="text-sm font-medium">Nenhum registro encontrado</p>
            {busca && <p className="text-xs">Tente remover o filtro de busca</p>}
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((item: any) => <EntityRow key={item.id} tab={tab} item={item} />)}
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <p className="mt-3 text-right text-xs text-slate-400">
            {filtered.length} registro{filtered.length !== 1 ? 's' : ''}{busca ? ' encontrado' + (filtered.length !== 1 ? 's' : '') : ''}
          </p>
        )}
      </section>

      {/* Modal */}
      <CrudModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title={`${isEditing ? 'Editar' : 'Adicionar'} ${singularLabel}`}
      >
        <form onSubmit={handleSubmit(save)} className="grid gap-3 md:grid-cols-2">

          {/* ── BENEFICIÁRIOS ────────────────────────────────────────────── */}
          {tab === 'beneficiarios' && <>
            <FormInput
              label="Nome completo"
              registration={register('nome', { required: 'Obrigatório' })}
              error={errors.nome} disabled={disabled('nome')}
            />
            <MaskedInput
              label="CPF" name="cpf" control={control} mask={maskCpf}
              disabled={disabled('cpf')} placeholder="000.000.000-00"
              rules={{ required: 'Obrigatório', validate: (v) => isCpfComplete(v) || 'CPF incompleto (11 dígitos)' }}
              error={errors.cpf}
            />
            <FormInput
              label="Data de nascimento" type="date"
              registration={register('dtNasc', { required: 'Obrigatório' })}
              error={errors.dtNasc}
            />
            <MaskedInput
              label="Telefone" name="telefone" control={control} mask={maskPhone}
              placeholder="(00) 00000-0000"
              rules={{ required: 'Obrigatório', validate: (v) => isPhoneComplete(v) || 'Telefone incompleto' }}
              error={errors.telefone}
            />
            <FormInput
              label="E-mail" type="email"
              registration={register('email', { required: 'Obrigatório', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'E-mail inválido' } })}
              error={errors.email}
            />
            <AddressSection control={control} register={register} setValue={setValue} errors={errors} />
          </>}

          {/* ── DENTISTAS ────────────────────────────────────────────────── */}
          {tab === 'dentistas' && <>
            <FormInput
              label="CRO (ex: CRO-SP 12345)"
              registration={register('cro', { required: 'Obrigatório', pattern: { value: /^CRO-[A-Z]{2}\s?\d+$/i, message: 'Formato: CRO-UF 12345' } })}
              error={errors.cro} disabled={disabled('cro')} placeholder="CRO-SP 12345"
            />
            <FormInput
              label="Nome completo"
              registration={register('nome', { required: 'Obrigatório' })}
              error={errors.nome} disabled={disabled('nome')}
            />
            <MaskedInput
              label="CPF" name="cpf" control={control} mask={maskCpf}
              disabled={disabled('cpf')} placeholder="000.000.000-00"
              rules={{ required: 'Obrigatório', validate: (v) => isCpfComplete(v) || 'CPF incompleto (11 dígitos)' }}
              error={errors.cpf}
            />
            <FormInput
              label="Data de nascimento" type="date"
              registration={register('dtNasc', { required: 'Obrigatório' })}
              error={errors.dtNasc}
            />
            <MaskedInput
              label="Telefone" name="telefone" control={control} mask={maskPhone}
              placeholder="(00) 00000-0000"
              rules={{ required: 'Obrigatório', validate: (v) => isPhoneComplete(v) || 'Telefone incompleto' }}
              error={errors.telefone}
            />
            <FormInput
              label="E-mail" type="email"
              registration={register('email', { required: 'Obrigatório', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'E-mail inválido' } })}
              error={errors.email}
            />
            <AddressSection control={control} register={register} setValue={setValue} errors={errors} />
          </>}

          {/* ── DOADORES ─────────────────────────────────────────────────── */}
          {tab === 'doadores' && <>
            <FormInput
              label="Nome / Razão social"
              registration={register('nome', { required: 'Obrigatório' })}
              error={errors.nome} disabled={disabled('nome')}
            />
            <MaskedInput
              label="CPF / CNPJ" name="documento" control={control} mask={maskCpfCnpj}
              disabled={disabled('documento')} placeholder="000.000.000-00 ou 00.000.000/0000-00"
              rules={{ required: 'Obrigatório', validate: (v) => isCpfCnpjComplete(v) || 'CPF (11 dígitos) ou CNPJ (14 dígitos) incompleto' }}
              error={errors.documento}
            />
            <FormInput
              label="Data de nascimento / fundação" type="date"
              registration={register('dtNasc', { required: 'Obrigatório' })}
              error={errors.dtNasc}
            />
            <MaskedInput
              label="Telefone" name="telefone" control={control} mask={maskPhone}
              placeholder="(00) 00000-0000"
              rules={{ required: 'Obrigatório', validate: (v) => isPhoneComplete(v) || 'Telefone incompleto' }}
              error={errors.telefone}
            />
            <FormInput
              label="E-mail" type="email"
              registration={register('email', { required: 'Obrigatório', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'E-mail inválido' } })}
              error={errors.email}
            />
            <AddressSection control={control} register={register} setValue={setValue} errors={errors} />
          </>}

          {/* ── DOAÇÕES ──────────────────────────────────────────────────── */}
          {tab === 'doacoes' && <>
            <FormInput
              label="ID do doador" type="number"
              disabled={disabled('doadorId')}
              registration={register('doadorId', { valueAsNumber: true, required: 'Obrigatório', min: { value: 1, message: 'ID inválido' } })}
              error={errors.doadorId}
            />
            <FormInput
              label="Valor (R$)" type="number"
              registration={register('valor', { valueAsNumber: true, required: 'Obrigatório', min: { value: 0.01, message: 'Valor deve ser positivo' } })}
              error={errors.valor}
            />
            <FormInput
              label="Descrição"
              registration={register('descricao')}
              error={errors.descricao}
              placeholder="Opcional"
            />
          </>}

          {/* ── VOLUNTÁRIOS ──────────────────────────────────────────────── */}
          {tab === 'voluntarios' && <>
            <FormInput
              label="CRO (ex: CRO-SP 12345)"
              registration={register('cro', { required: 'Obrigatório', pattern: { value: /^CRO-[A-Z]{2}\s?\d+$/i, message: 'Formato: CRO-UF 12345' } })}
              error={errors.cro} disabled={disabled('cro')} placeholder="CRO-SP 12345"
            />
            <FormInput
              label="Nome completo"
              registration={register('nome', { required: 'Obrigatório' })}
              error={errors.nome} disabled={disabled('nome')}
            />
            <MaskedInput
              label="CPF" name="cpf" control={control} mask={maskCpf}
              disabled={disabled('cpf')} placeholder="000.000.000-00"
              rules={{ required: 'Obrigatório', validate: (v) => isCpfComplete(v) || 'CPF incompleto (11 dígitos)' }}
              error={errors.cpf}
            />
            <FormInput
              label="Data de nascimento" type="date"
              registration={register('dtNasc', { required: 'Obrigatório' })}
              error={errors.dtNasc}
            />
            <MaskedInput
              label="Telefone" name="telefone" control={control} mask={maskPhone}
              placeholder="(00) 00000-0000"
              rules={{ required: 'Obrigatório', validate: (v) => isPhoneComplete(v) || 'Telefone incompleto' }}
              error={errors.telefone}
            />
            <FormInput
              label="E-mail" type="email"
              registration={register('email', { required: 'Obrigatório', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'E-mail inválido' } })}
              error={errors.email}
            />
            <FormInput
              label="Data de cadastro" type="date"
              registration={register('dtCadastro', { required: 'Obrigatório' })}
              error={errors.dtCadastro}
            />
            <AddressSection control={control} register={register} setValue={setValue} errors={errors} />
          </>}

          {/* ── TRIAGENS ─────────────────────────────────────────────────── */}
          {tab === 'triagens' && <>
            <FormInput
              label="ID do beneficiário" type="number"
              disabled={disabled('idBenef')}
              registration={register('idBenef', { valueAsNumber: true, required: 'Obrigatório', min: { value: 1, message: 'ID inválido' } })}
              error={errors.idBenef}
            />
            <FormInput
              label="ID do voluntário" type="number"
              registration={register('idVolun', { valueAsNumber: true, required: 'Obrigatório', min: { value: 1, message: 'ID inválido' } })}
              error={errors.idVolun}
            />
            <FormInput
              label="Data de início" type="date"
              registration={register('dtInicio', { required: 'Obrigatório' })}
              error={errors.dtInicio}
            />
            <FormInput
              label="Data de fim" type="date"
              registration={register('dtFim')}
              error={errors.dtFim}
              placeholder="Opcional"
            />
            <FormSelect
              label="Resultado"
              registration={register('resultado', { required: 'Obrigatório' })}
              options={[
                { label: 'Aprovado',  value: 'APROVADO' },
                { label: 'Reprovado', value: 'REPROVADO' },
                { label: 'Pendente',  value: 'PENDENTE' },
              ]}
              error={errors.resultado}
            />
          </>}

          <div className="flex justify-end gap-2 md:col-span-2 pt-2 border-t">
            <button type="button" onClick={() => setOpenModal(false)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50">
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:opacity-60"
            >
              {isSubmitting && (
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
              )}
              {isEditing ? 'Salvar alterações' : 'Salvar'}
            </button>
          </div>
        </form>
      </CrudModal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={onDelete}
        message="Tem certeza que deseja excluir este registro? Esta ação não pode ser desfeita."
      />
    </div>
  );
}
