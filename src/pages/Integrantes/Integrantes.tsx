import type { ReactElement } from 'react';
import { teamMembers } from '../../assets/data';

const LinkedInIcon: ReactElement = (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GitHubIcon: ReactElement = (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.929.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const MEMBER_ROLES: Record<string, string> = {
  '566784': 'Desenvolvedor Full Stack',
  '563452': 'Desenvolvedor Full Stack',
  '566844': 'Desenvolvedor Full Stack',
};

export function Integrantes() {
  return (
    <div className="space-y-10">
      <section className="text-center">
        <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
          Nossa equipe
        </span>
        <h1 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
          Quem faz a Central do Bem
        </h1>
        <p className="mx-auto mt-3 max-w-3xl text-sm text-slate-600 md:text-base">
          Conheça os estudantes responsáveis pelo desenvolvimento da Central do Bem. Somos um time
          multidisciplinar comprometido em transformar a experiência de voluntários, beneficiários e
          parceiros da Turma do Bem.
        </p>
      </section>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((membro) => (
          <div
            key={membro.rm}
            className="group rounded-2xl [perspective:1000px] hover:animate-pulse-glow"
          >
            <div className="relative h-80 w-full rounded-2xl transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              {/* Frente */}
              <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white p-5 text-center shadow-md [backface-visibility:hidden]">
                <div className="relative">
                  <img
                    src={membro.foto}
                    alt={membro.nome}
                    className="h-28 w-28 rounded-full object-cover ring-4 ring-brand-200 transition-all duration-300 group-hover:ring-primary/50"
                  />
                  <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-white shadow">
                    {membro.nome.charAt(0)}
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-bold text-slate-900">
                  {membro.nome.split(' ')[0]}
                </h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-primary">
                  {MEMBER_ROLES[membro.rm]}
                </p>
                <p className="mt-2 text-xs text-slate-400">Passe o mouse para ver mais</p>
              </div>

              {/* Verso */}
              <div className="absolute inset-0 flex flex-col justify-between rounded-2xl bg-gradient-to-br from-slate-900 to-teal-900 p-6 text-white shadow-xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <div className="space-y-2">
                  <p className="font-bold leading-snug">{membro.nome}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-medium">
                      RM {membro.rm}
                    </span>
                    <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-medium">
                      {membro.turma}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">{MEMBER_ROLES[membro.rm]}</p>
                </div>

                <div className="grid gap-2">
                  <a
                    href={membro.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600/80 px-3 py-2.5 text-sm font-semibold transition hover:bg-blue-600"
                  >
                    {LinkedInIcon}
                    LinkedIn
                  </a>
                  <a
                    href={membro.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-700/80 px-3 py-2.5 text-sm font-semibold transition hover:bg-slate-700"
                  >
                    {GitHubIcon}
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
        <p className="text-sm text-slate-600">
          Projeto desenvolvido para o{' '}
          <strong className="text-primary">Challenge Turma do Bem</strong> — FIAP 2025, turma{' '}
          <strong>1TDSPS</strong>.
        </p>
      </div>
    </div>
  );
}
