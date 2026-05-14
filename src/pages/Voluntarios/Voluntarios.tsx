import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { del, get, post } from '../../services/api';
import type {
  Especialidade,
  IVoluntario,
  Regional,
  Status,
  VoluntarioFormValues,
} from '../../types';

// JSONPlaceholder user shape (subset we use)
interface ApiUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: { name: string };
}

const ESPECIALIDADES: Especialidade[] = [
  'ortodontia',
  'endodontia',
  'pediatria',
  'cirurgia',
  'geral',
];

const REGIONAIS: Regional[] = [
  'São Paulo',
  'Rio de Janeiro',
  'Belo Horizonte',
  'Curitiba',
  'Porto Alegre',
  'Salvador',
  'Fortaleza',
  'Outras',
];

const STATUS_LABELS: Record<Status, string> = {
  ativo: 'Ativo',
  inativo: 'Inativo',
  pendente: 'Pendente',
};

const STATUS_COLORS: Record<Status, string> = {
  ativo: 'bg-emerald-100 text-emerald-700',
  inativo: 'bg-slate-100 text-slate-600',
  pendente: 'bg-amber-100 text-amber-700',
};

function adaptUser(u: ApiUser, idx: number): IVoluntario {
  const especialidades: Especialidade[] = [
    'ortodontia',
    'endodontia',
    'pediatria',
    'cirurgia',
    'geral',
  ];
  return {
    id: u.id,
    nome: u.name,
    email: u.email,
    telefone: u.phone,
    especialidade: especialidades[idx % especialidades.length],
    status: 'ativo',
    regional: REGIONAIS[idx % REGIONAIS.length],
  };
}

const EMPTY_FORM: VoluntarioFormValues = {
  nome: '',
  email: '',
  telefone: '',
  especialidade: 'geral',
  status: 'pendente',
  regional: 'São Paulo',
};

export function Voluntarios() {
  const navigate = useNavigate();
  const location = useLocation();
  const feedbackMsg = (location.state as { message?: string } | null)?.message ?? null;

  const [voluntarios, setVoluntarios] = useState<IVoluntario[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<VoluntarioFormValues>(EMPTY_FORM);
  const [feedback, setFeedback] = useState<string | null>(feedbackMsg);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const listApi = useApi<ApiUser[]>();
  const createApi = useApi<ApiUser>();
  const deleteApi = useApi<object>();

  // ── Load list ──────────────────────────────────────────────────────────────
  useEffect(() => {
    listApi.execute(() => get<ApiUser[]>('/users')).then((users) => {
      if (users) setVoluntarios(users.map(adaptUser));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Auto-hide feedback ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!feedback) return;
    const t = setTimeout(() => setFeedback(null), 4000);
    return () => clearTimeout(t);
  }, [feedback]);

  // ── Handlers ───────────────────────────────────────────────────────────────
  function handleFieldChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    const created = await createApi.execute(() =>
      post<ApiUser>('/users', { name: form.nome, email: form.email, phone: form.telefone }),
    );
    if (created) {
      const newVoluntario: IVoluntario = {
        id: created.id ?? Date.now(),
        nome: form.nome,
        email: form.email,
        telefone: form.telefone,
        especialidade: form.especialidade,
        status: form.status,
        regional: form.regional,
      };
      setVoluntarios((prev) => [newVoluntario, ...prev]);
      setForm(EMPTY_FORM);
      setShowForm(false);
      setFeedback('Voluntário cadastrado com sucesso!');
    }
  }

  async function handleDelete(id: number) {
    setDeletingId(id);
    const result = await deleteApi.execute(() => del<object>(`/users/${id}`));
    setDeletingId(null);
    if (result !== null) {
      setVoluntarios((prev) => prev.filter((v) => v.id !== id));
      setFeedback('Voluntário removido com sucesso!');
    }
  }

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-secondary p-6 text-white shadow-lg sm:p-8 md:p-10">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
          Gestão de pessoas
        </span>
        <h1 className="mt-2 text-2xl font-bold sm:text-3xl md:text-4xl">Voluntários</h1>
        <p className="mt-3 max-w-2xl text-sm text-cyan-50 sm:text-base">
          Gerencie o cadastro de voluntários da rede Turma do Bem: adicione, edite e remova
          profissionais que apoiam os atendimentos odontológicos.
        </p>
      </section>

      {/* Feedback toast */}
      {feedback && (
        <div
          role="status"
          aria-live="polite"
          className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 shadow-sm"
        >
          <span>✓</span>
          {feedback}
        </div>
      )}

      {/* API error */}
      {listApi.error && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700 shadow-sm"
        >
          <span>⚠</span>
          Erro ao carregar voluntários: {listApi.error}
        </div>
      )}

      {/* Header row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-dark">
            {listApi.loading
              ? 'Carregando…'
              : `${voluntarios.length} voluntário${voluntarios.length !== 1 ? 's' : ''} cadastrado${voluntarios.length !== 1 ? 's' : ''}`}
          </h2>
          <p className="text-sm text-slate-500">
            Clique em um voluntário para editar ou remover.
          </p>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="rounded-2xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700 active:scale-[0.97] sm:w-auto"
        >
          {showForm ? '✕ Cancelar' : '+ Novo voluntário'}
        </button>
      </div>

      {/* Create form */}
      {showForm && (
        <form
          onSubmit={handleCreate}
          className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <h3 className="text-base font-bold text-dark">Cadastrar voluntário</h3>

          {createApi.error && (
            <p className="text-sm text-rose-600">Erro: {createApi.error}</p>
          )}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Nome */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Nome completo</label>
              <input
                name="nome"
                value={form.nome}
                onChange={handleFieldChange}
                required
                placeholder="Dr. Ana Silva"
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">E-mail</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleFieldChange}
                required
                placeholder="ana@email.com"
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Telefone */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Telefone</label>
              <input
                name="telefone"
                type="tel"
                value={form.telefone}
                onChange={handleFieldChange}
                required
                placeholder="(11) 99999-9999"
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Especialidade */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Especialidade</label>
              <select
                name="especialidade"
                value={form.especialidade}
                onChange={handleFieldChange}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                {ESPECIALIDADES.map((e) => (
                  <option key={e} value={e}>
                    {e.charAt(0).toUpperCase() + e.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleFieldChange}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
                <option value="pendente">Pendente</option>
              </select>
            </div>

            {/* Regional */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Regional</label>
              <select
                name="regional"
                value={form.regional}
                onChange={handleFieldChange}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                {REGIONAIS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => { setShowForm(false); setForm(EMPTY_FORM); }}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={createApi.loading}
              className="rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700 disabled:opacity-60"
            >
              {createApi.loading ? 'Salvando…' : 'Salvar voluntário'}
            </button>
          </div>
        </form>
      )}

      {/* Loading skeleton */}
      {listApi.loading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-36 animate-pulse rounded-2xl bg-slate-100" />
          ))}
        </div>
      )}

      {/* Volunteer cards */}
      {!listApi.loading && voluntarios.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {voluntarios.map((v) => (
            <article
              key={v.id}
              className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-primary/40 hover:shadow-md sm:p-5"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                  {v.nome.charAt(0).toUpperCase()}
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_COLORS[v.status]}`}
                >
                  {STATUS_LABELS[v.status]}
                </span>
              </div>

              <div>
                <h3 className="font-semibold text-dark line-clamp-1">{v.nome}</h3>
                <p className="text-xs text-slate-500 line-clamp-1">{v.email}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary capitalize">
                  {v.especialidade}
                </span>
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600">
                  {v.regional}
                </span>
              </div>

              <div className="mt-auto flex gap-2 border-t border-slate-100 pt-3">
                <button
                  onClick={() => navigate(`/voluntario/${v.id}`)}
                  className="flex-1 rounded-xl border border-slate-200 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-primary hover:text-primary"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(v.id)}
                  disabled={deletingId === v.id}
                  className="flex-1 rounded-xl border border-rose-200 py-1.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-50 disabled:opacity-60"
                >
                  {deletingId === v.id ? 'Removendo…' : 'Remover'}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!listApi.loading && !listApi.error && voluntarios.length === 0 && (
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
          <p className="text-lg font-semibold text-slate-700">Nenhum voluntário cadastrado</p>
          <p className="mt-1 text-sm text-slate-500">
            Clique em "Novo voluntário" para adicionar o primeiro registro.
          </p>
        </div>
      )}
    </div>
  );
}
