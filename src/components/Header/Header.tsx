import type { ReactElement } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Home',       path: '/home' },
  { label: 'Quem Somos', path: '/integrantes' },
  { label: 'Sobre',      path: '/sobre' },
  { label: 'FAQ',        path: '/faq' },
  { label: 'Contato',    path: '/contato' },
  { label: 'Solução',    path: '/solucao' },
];

const NAV_ICONS: Record<string, ReactElement> = {
  '/home': (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  ),
  '/integrantes': (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </svg>
  ),
  '/sobre': (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    </svg>
  ),
  '/faq': (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z" />
    </svg>
  ),
  '/contato': (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  ),
  '/solucao': (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M7 2v11h3v9l7-12h-4l4-8z" />
    </svg>
  ),
};

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-900 shadow-lg shadow-slate-900/30">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-4 py-3 md:px-6">
        <NavLink
          to="/home"
          className="shrink-0"
          aria-label="Voltar para a página inicial"
          onClick={() => setIsOpen(false)}
        >
          <img src="/imagem/logo-turma-do-bem.png" alt="Logo da Turma do Bem" className="h-12 w-auto md:h-14" />
        </NavLink>

        <button
          type="button"
          className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 text-teal-300 transition hover:bg-white/10 md:hidden"
          aria-label="Abrir menu de navegação"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="text-xl leading-none">☰</span>
        </button>

        <nav
          className={`${
            isOpen ? 'flex' : 'hidden'
          } absolute left-4 right-4 top-[74px] rounded-2xl border border-white/10 bg-slate-800/95 p-3 shadow-xl backdrop-blur-sm md:static md:flex md:flex-1 md:items-center md:justify-center md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
        >
          <ul className="flex w-full flex-col gap-1 md:w-auto md:flex-row md:items-center md:gap-1">
            {navItems.map((item) => {
              const isSolucao = item.path === '/solucao';
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                        isActive
                          ? 'bg-teal-500/20 text-white ring-1 ring-teal-400/50'
                          : isSolucao
                            ? 'text-teal-300 ring-1 ring-teal-500/40 hover:bg-white/10 hover:text-white'
                            : 'text-slate-200 hover:bg-white/10 hover:text-white'
                      }`
                    }
                  >
                    {NAV_ICONS[item.path]}
                    {item.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <NavLink
          to="/home"
          className="hidden shrink-0 md:block"
          aria-label="Conheça a Central do Bem"
          onClick={() => setIsOpen(false)}
        >
          <img src="/imagem/logocdb.png" alt="Logo Central do Bem" className="h-11 w-auto" />
        </NavLink>
      </div>
    </header>
  );
}
