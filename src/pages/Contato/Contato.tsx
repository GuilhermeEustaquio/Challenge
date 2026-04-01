import { useForm } from 'react-hook-form';
import type { ContactFormValues } from '../../types';

export function Contato() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ContactFormValues>();

  const onSubmit = (data: ContactFormValues) => {
    console.log('Contato enviado:', data);
    reset();
  };

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-teal-800 p-8 text-white shadow-xl" aria-labelledby="contact-title">
        <span className="inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-300">Contato</span>
        <h1 id="contact-title" className="mt-2 text-3xl font-bold md:text-4xl">Converse com a Central do Bem</h1>
        <p className="mt-3 max-w-3xl text-sm text-cyan-50 md:text-base">
          Estamos disponíveis para apoiar voluntários, parceiros e beneficiários da Turma do Bem. Envie uma mensagem pelo formulário
          ou escolha o canal que melhor funciona para você.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]" id="contact-form">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">Envie uma mensagem</h2>
          <p className="mt-2 text-sm text-slate-600">Compartilhe suas dúvidas, sugestões ou necessidades. Nossa equipe responde em até 2 dias úteis.</p>
          <form className="mt-5 space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-1">
              <label htmlFor="txtNome" className="text-sm font-semibold text-slate-800">Nome completo</label>
              <input type="text" id="txtNome" placeholder="Como devemos te chamar?" className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" {...register('nome', { required: 'Nome é obrigatório' })} />
              {errors.nome && <small className="text-xs text-rose-600">{errors.nome.message}</small>}
            </div>

            <div className="space-y-1">
              <label htmlFor="txtEmail" className="text-sm font-semibold text-slate-800">E-mail</label>
              <input type="email" id="txtEmail" placeholder="nome@email.com" className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" {...register('email', { required: 'E-mail é obrigatório' })} />
              {errors.email && <small className="text-xs text-rose-600">{errors.email.message}</small>}
            </div>

            <div className="space-y-1">
              <label htmlFor="telefone" className="text-sm font-semibold text-slate-800">Telefone</label>
              <input type="tel" id="telefone" placeholder="(00) 00000-0000" className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" {...register('telefone')} />
            </div>

            <div className="space-y-1">
              <label htmlFor="txtMsg" className="text-sm font-semibold text-slate-800">Mensagem</label>
              <textarea id="txtMsg" placeholder="Conte como podemos ajudar" rows={4} className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" {...register('mensagem', { required: true })} />
            </div>

            <button type="submit" className="rounded-2xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700 hover:shadow-md active:scale-[0.97]">Enviar mensagem</button>
            {isSubmitSuccessful && <p className="text-sm font-medium text-emerald-700">Mensagem enviada com sucesso!</p>}
          </form>
        </div>

        <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">Outros canais</h2>
          <p className="mt-2 text-sm text-slate-600">Se preferir, você também pode falar com o time por e-mail ou explorar outros materiais da Turma do Bem.</p>

          <div className="mt-5 space-y-4">
            {[
              {
                icon: '📧',
                title: 'E-mail da equipe',
                content: (
                  <>
                    <a href="mailto:guilhermepeustaquio@gmail.com" className="block hover:text-teal-700">guilhermepeustaquio@gmail.com</a>
                    <a href="mailto:caiocc2006@gmail.com" className="block hover:text-teal-700">caiocc2006@gmail.com</a>
                    <a href="mailto:matheustavares1356@gmail.com" className="block hover:text-teal-700">matheustavares1356@gmail.com</a>
                  </>
                ),
              },
              {
                icon: '🌐',
                title: 'Conheça a Turma do Bem',
                content: (
                  <a href="https://turmadobem.org.br/" target="_blank" rel="noreferrer" className="hover:text-teal-700">www.turmadobem.org.br</a>
                ),
              },
              { icon: '⏰', title: 'Horário de atendimento', content: <p>Segunda a sexta-feira, das 9h às 18h.</p> },
              { icon: '🤝', title: 'Parcerias e voluntariado', content: <p>Envie seu interesse pelo formulário e retornaremos com as próximas etapas.</p> },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg">{item.icon}</div>
                <div className="text-sm text-slate-600">
                  <strong className="block text-slate-900">{item.title}</strong>
                  {item.content}
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
}
