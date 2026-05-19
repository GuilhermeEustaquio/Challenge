const variants: Record<string, string> = {
  AGUARDANDO_TRIAGEM: 'bg-amber-100 text-amber-800 border border-amber-200',
  EM_ATENDIMENTO:     'bg-blue-100 text-blue-800 border border-blue-200',
  FINALIZADO:         'bg-emerald-100 text-emerald-800 border border-emerald-200',
  ALTA:               'bg-rose-100 text-rose-800 border border-rose-200',
  MEDIA:              'bg-orange-100 text-orange-800 border border-orange-200',
  BAIXA:              'bg-green-100 text-green-800 border border-green-200',
  DISPONIVEL:         'bg-emerald-100 text-emerald-800 border border-emerald-200',
  INDISPONIVEL:       'bg-slate-100 text-slate-600 border border-slate-200',
  ATIVO:              'bg-teal-100 text-teal-800 border border-teal-200',
  INATIVO:            'bg-slate-100 text-slate-600 border border-slate-200',
  PESSOA_FISICA:      'bg-violet-100 text-violet-800 border border-violet-200',
  PESSOA_JURIDICA:    'bg-indigo-100 text-indigo-800 border border-indigo-200',
};

const labels: Record<string, string> = {
  AGUARDANDO_TRIAGEM: 'Aguardando triagem',
  EM_ATENDIMENTO:     'Em atendimento',
  FINALIZADO:         'Finalizado',
  ALTA:               'Alta',
  MEDIA:              'Média',
  BAIXA:              'Baixa',
  DISPONIVEL:         'Disponível',
  INDISPONIVEL:       'Indisponível',
  ATIVO:              'Ativo',
  INATIVO:            'Inativo',
  PESSOA_FISICA:      'Pessoa Física',
  PESSOA_JURIDICA:    'Pessoa Jurídica',
};

export function StatusBadge({ text }: { text: string }) {
  const cls = variants[text] ?? 'bg-slate-100 text-slate-700 border border-slate-200';
  const display = labels[text] ?? text;
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${cls}`}>
      {display}
    </span>
  );
}
