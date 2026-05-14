import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { get, put } from '../../services/api';
import type {
  Especialidade,
  IVoluntario,
  Regional,
  VoluntarioFormValues,
} from '../../types';

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

function adaptUser(u: ApiUser): IVoluntario {
  return {
    id: u.id,
    nome: u.name,
    email: u.email,
    telefone: u.phone,
    especialidade: 'geral',
    status: 'ativo',
    regional: 'São Paulo',
  };
}

export function VoluntarioDetalhe() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<VoluntarioFormValues>({
    nome: '',
    email: '',
    telefone: '',
    especialidade: 'geral',
    status: 'ativo',
    regional: 'São Paulo',
  });

  const fetchApi = useApi<ApiUser>();
  const saveApi = useApi<ApiUser>();

  // ── Load volunteer data ────────────────────────────────────────────────────
  useEffect(() => {
    if (!id) return;
    fetchApi.execute(() => get<ApiUser>(`/users/${id}`)).then((user) => {
      if (user) {
        const v = adaptUser(user);
        setForm({
          nome: v.nome,
          email: v.email,
          telefone: v.telefone,
          especialidade: v.especialidade,
          status: v.status,
          regional: v.regional,
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // ── Handlers ───────────────────────────────────────────────────────────────
  function handleFieldChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const result = await saveApi.execute(() =>
      put<ApiUser>(`/users/${id}`, {
        name: form.nome,
        email: form.email,
        phone: form.telefone,
      }),
    );
    if (result) {
      navigate('/voluntarios', { state: { message: 'Voluntário atualizado com sucesso!' } });
    }
  }

  // ── Not found ──────────────────────────────────────────────────────────────
  if (fetchApi.error) {
    return (
      <section className="space-y-4 py-16 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-rose-100 text-4xl">
          ⚠
        </div>
        <h1 className="text-2xl font-bold text-dark">Voluntário não encontrado</h1>
        <p className="text-slate-500">Erro: {fetchApi.error}</p>
        <button
          onClick={() => navigate('/voluntarios')}
          className="rounded-2xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-700"
        >
          ← Voltar para voluntários
        </button>
      </section>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500">
        <button
          onClick={() => navigate('/home')}
          className="hover:text-primary hover:underline"
        >
          Home
        </button>
        <span>›</span>
        <button
          onClick={() => navigate('/voluntarios')}
          className="hover:text-primary hover:underline"
        >
          Voluntários
        </button>
        <span>›</span>
        <span className="font-semibold text-dark">
          {fetchApi.loading ? 'Carregando…' : form.nome || `Voluntário #${id}`}
        </span>
      </nav>

      {/* Header */}
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-dark p-6 text-white shadow-xl sm:p-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">
          Editar cadastro
        </span>
        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
          {fetchApi.loading ? 'Carregando…' : form.nome || `Voluntário #${id}`}
        </h1>
        <p className="mt-2 text-sm text-slate-300">
          Atualize os dados do voluntário abaixo. As alterações serão salvas no sistema.
        </p>
      </div>

      {/* Loading skeleton */}
      {fetchApi.loading && (
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-10 animate-pulse rounded-xl bg-slate-100" />
          ))}
        </div>
      )}

      {/* Edit form */}
      {!fetchApi.loading && (
        <form
          onSubmit={handleSave}
          className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <h2 className="text-base font-bold text-dark">Dados do voluntário</h2>

          {saveApi.error && (
            <div
              role="alert"
              className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
            >
              Erro ao salvar: {saveApi.error}
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Nome */}
            <div className="space-y-1 sm:col-span-2 lg:col-span-1">
              <label className="text-sm font-semibold text-slate-700">Nome completo</label>
              <input
                name="nome"
                value={form.nome}
                onChange={handleFieldChange}
                required
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
                {ESPECIALIDADES.map((esp) => (
                  <option key={esp} value={esp}>
                    {esp.charAt(0).toUpperCase() + esp.slice(1)}
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

          {/* Actions */}
          <div className="flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={() => navigate('/voluntarios')}
              className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              ← Voltar sem salvar
            </button>
            <button
              type="submit"
              disabled={saveApi.loading}
              className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700 disabled:opacity-60"
            >
              {saveApi.loading ? 'Salvando…' : 'Salvar alterações'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
