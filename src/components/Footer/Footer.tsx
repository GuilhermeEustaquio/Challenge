import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="mt-10 border-t border-slate-700/40 bg-slate-900 text-slate-100">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 md:grid-cols-3 md:px-6">
        <div className="space-y-3">
          <img src="/imagem/logo-turma-do-bem.png" alt="Turma do Bem" className="h-12 w-auto" />
          <p className="text-sm text-slate-300">
            Central do Bem – Plataforma interna desenvolvida para modernizar e integrar a comunicação da Turma do Bem.
          </p>
        </div>

        <div>
          <h4 className="text-base font-bold text-teal-400">Navegação</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link className="hover:text-teal-300" to="/home">Home</Link></li>
            <li><Link className="hover:text-teal-300" to="/integrantes">Quem Somos</Link></li>
            <li><Link className="hover:text-teal-300" to="/sobre">Sobre o Projeto</Link></li>
            <li><Link className="hover:text-teal-300" to="/faq">FAQ</Link></li>
            <li><Link className="hover:text-teal-300" to="/contato">Contato</Link></li>
          </ul>
        </div>

        <div className="space-y-3 text-sm">
          <h4 className="text-base font-bold text-teal-400">Contato</h4>
          <p className="space-y-1">
            <span className="font-semibold">Email Integrantes do Grupo:</span>
            <br />
            <a className="hover:text-teal-300" href="mailto:guilhermepeustaquio@gmail.com">guilhermepeustaquio@gmail.com</a><br />
            <a className="hover:text-teal-300" href="mailto:caiocc2006@gmail.com">caiocc2006@gmail.com</a><br />
            <a className="hover:text-teal-300" href="mailto:matheustavares1356@gmail.com">matheustavares1356@gmail.com</a>
          </p>
          <p>
            <span className="font-semibold">Conheça a TdB:</span>
            <br />
            <a className="hover:text-teal-300" href="https://turmadobem.org.br/" target="_blank" rel="noreferrer">www.turmadobem.org</a>
          </p>
        </div>
      </div>

      <div className="border-t border-slate-700/30 py-4 text-center text-xs text-slate-400">
        <p>© 2025 Central do Bem. Projeto acadêmico - FIAP | Challenge Turma do Bem</p>
      </div>
    </footer>
  );
}
