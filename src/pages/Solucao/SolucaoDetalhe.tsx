import { useNavigate, useParams } from 'react-router-dom';
import { solutions } from '../../assets/data';
import { Button } from '../../components/Button/Button';
import { SolucaoPreview } from './SolucaoPreview';

export function SolucaoDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const index = solutions.findIndex((item) => item.id === id);
  const detalhe = solutions[index];

  const anterior = index > 0 ? solutions[index - 1] : null;
  const proximo = index < solutions.length - 1 ? solutions[index + 1] : null;

  if (!detalhe) {
    return (
      <section className="space-y-4 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-4xl">
          🔍
        </div>
        <h1 className="text-2xl font-bold text-dark">Módulo não encontrado</h1>
        <p className="text-slate-500">O módulo que você procura não existe ou foi removido.</p>
        <Button onClick={() => navigate('/solucao')}>← Voltar para soluções</Button>
      </section>
    );
  }

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500">
        <button onClick={() => navigate('/home')} className="hover:text-primary hover:underline">
          Home
        </button>
        <span>›</span>
        <button onClick={() => navigate('/solucao')} className="hover:text-primary hover:underline">
          Soluções
        </button>
        <span>›</span>
        <span className="font-semibold text-dark">{detalhe.titulo}</span>
      </nav>

      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl shadow-xl">
        <img src={detalhe.imagem} alt={detalhe.titulo} className="h-72 w-full object-cover md:h-96" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 md:p-8">
          <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
            {detalhe.tag}
          </span>
          <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">{detalhe.titulo}</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-200 md:text-base">{detalhe.descricao}</p>
        </div>
      </div>

      {/* Visão geral */}
      <div className="grid gap-5 md:grid-cols-[1fr_260px]">
        <div className="space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Objetivo estratégico
            </span>
            <p className="leading-relaxed text-slate-700">{detalhe.objetivo}</p>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Público-alvo
            </span>
            <p className="text-sm text-slate-600">{detalhe.publicoAlvo}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Módulo
            </p>
            <p className="mt-1 font-semibold text-slate-800">{detalhe.titulo}</p>
            <span className="mt-2 inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
              {detalhe.tag}
            </span>
          </div>
          <Button className="w-full justify-center" onClick={() => navigate('/contato')}>
            Solicitar demonstração
          </Button>
        </div>
      </div>

      {/* Demo interativa */}
      <SolucaoPreview solutionId={detalhe.id} />

      {/* Funcionalidades */}
      <section className="space-y-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            O que o módulo oferece
          </span>
          <h2 className="mt-0.5 text-xl font-bold text-dark">Funcionalidades</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {detalhe.funcionalidades.map((f, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-primary/40 hover:shadow"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-sm text-slate-700">{f}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefícios */}
      <section className="rounded-3xl bg-gradient-to-br from-slate-900 to-dark p-8 text-white shadow-xl">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">
            Resultados esperados
          </span>
          <h2 className="mt-0.5 text-xl font-bold">Benefícios para a rede TdB</h2>
          <p className="mt-1 text-sm text-slate-300">
            Impactos concretos que este módulo gera na operação.
          </p>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {detalhe.beneficios.map((b) => (
            <div
              key={b}
              className="flex items-start gap-3 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10"
            >
              <span className="mt-0.5 text-lg text-teal-400">✓</span>
              <p className="text-sm text-slate-200">{b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Navegação entre módulos */}
      <div className="flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:justify-between">
        {anterior ? (
          <button
            onClick={() => navigate(`/solucao/${anterior.id}`)}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-dark shadow-sm transition hover:border-primary hover:text-primary"
          >
            <span>←</span>
            <span>{anterior.titulo}</span>
          </button>
        ) : (
          <div />
        )}
        {proximo ? (
          <button
            onClick={() => navigate(`/solucao/${proximo.id}`)}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-dark shadow-sm transition hover:border-primary hover:text-primary sm:ml-auto"
          >
            <span>{proximo.titulo}</span>
            <span>→</span>
          </button>
        ) : (
          <div />
        )}
      </div>

      <div className="text-center">
        <button
          onClick={() => navigate('/solucao')}
          className="text-sm font-semibold text-primary hover:underline"
        >
          ← Ver todos os módulos
        </button>
      </div>
    </div>
  );
}
