import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { solutions } from '../../assets/data';
import { Button } from '../../components/Button/Button';
import { SectionHeader } from '../../components/SectionHeader/SectionHeader';

const tags = ['Todos', ...Array.from(new Set(solutions.map((s) => s.tag)))];

export function Solucao() {
  const navigate = useNavigate();
  const [busca, setBusca] = useState('');
  const [tagAtiva, setTagAtiva] = useState('Todos');

  const filtradas = useMemo(
    () =>
      solutions.filter((item) => {
        const termoBusca =
          item.titulo.toLowerCase().includes(busca.toLowerCase()) ||
          item.descricao.toLowerCase().includes(busca.toLowerCase());
        const termoTag = tagAtiva === 'Todos' || item.tag === tagAtiva;
        return termoBusca && termoTag;
      }),
    [busca, tagAtiva],
  );

  return (
    <div className="space-y-10">
      {/* Hero */}
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-secondary p-8 text-white shadow-lg md:p-10">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
          Módulos da plataforma
        </span>
        <h1 className="mt-2 text-3xl font-bold md:text-4xl">Nossas Soluções</h1>
        <p className="mt-3 max-w-2xl text-cyan-50">
          Três módulos integrados para cobrir toda a jornada — da comunicação ao cuidado humanizado,
          passando pela inteligência operacional.
        </p>
      </div>

      {/* Filtros */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
        <input
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="flex-1 rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          placeholder="Buscar módulo por nome ou descrição..."
          aria-label="Buscar módulo"
        />
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setTagAtiva(tag)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                tagAtiva === tag
                  ? 'bg-primary text-white shadow'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Cards */}
      {filtradas.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtradas.map((item) => (
            <article
              key={item.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="overflow-hidden">
                <img
                  src={item.imagem}
                  alt={item.titulo}
                  className="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col gap-4 p-5">
                <div>
                  <span className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
                    {item.tag}
                  </span>
                  <h2 className="mt-2 text-lg font-bold text-dark">{item.titulo}</h2>
                  <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-slate-600">
                    {item.descricao}
                  </p>
                </div>

                <ul className="space-y-1.5">
                  {item.funcionalidades.slice(0, 3).map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="mt-0.5 shrink-0 text-primary">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-2">
                  <Button
                    className="w-full justify-center"
                    onClick={() => navigate(`/solucao/${item.id}`)}
                  >
                    Ver módulo completo →
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
          <p className="text-lg font-semibold text-slate-700">Nenhum módulo encontrado</p>
          <p className="mt-1 text-sm text-slate-500">
            Tente outro termo ou selecione "Todos" para ver todos os módulos.
          </p>
          <button
            onClick={() => { setBusca(''); setTagAtiva('Todos'); }}
            className="mt-4 text-sm font-semibold text-primary hover:underline"
          >
            Limpar filtros
          </button>
        </div>
      )}

      {/* CTA */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-dark p-6 text-white shadow-lg md:p-8">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h3 className="text-lg font-bold">Quer saber como implementar na sua regional?</h3>
            <p className="mt-1 text-sm text-slate-300">
              Nossa equipe está pronta para apresentar cada módulo em detalhes.
            </p>
          </div>
          <Button
            variant="ghost"
            className="shrink-0 border-2 border-white bg-white text-dark hover:bg-slate-100"
            onClick={() => navigate('/contato')}
          >
            Entrar em contato
          </Button>
        </div>
      </div>

      {/* Guia de uso */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <SectionHeader
          title="Como explorar os módulos"
          description="Clique em qualquer módulo para ver a descrição completa, funcionalidades e uma demonstração interativa de como ele funciona na prática."
          className="[&_h2]:text-base [&_h2]:font-semibold [&_p]:text-sm"
        />
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            { n: '1', txt: 'Escolha um módulo acima e clique em "Ver módulo completo"' },
            { n: '2', txt: 'Leia a descrição, objetivo e funcionalidades disponíveis' },
            { n: '3', txt: 'Experimente a demo interativa para ver como funciona na prática' },
          ].map((step) => (
            <div key={step.n} className="flex items-start gap-3 rounded-xl bg-slate-50 p-4">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                {step.n}
              </span>
              <p className="text-sm text-slate-600">{step.txt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
