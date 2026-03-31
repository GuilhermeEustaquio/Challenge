import { useState } from 'react';
import { Accordion } from '../../components/Accordion/Accordion';
import { MetricCard } from '../../components/MetricCard/MetricCard';
import { SectionHeader } from '../../components/SectionHeader/SectionHeader';

const pilares = [
  {
    titulo: 'Hub de relacionamento',
    texto:
      'Centraliza e-mails, mensagens e ligações em uma linha do tempo única. Equipes conseguem retomar conversas com contexto completo, sem perder histórico durante trocas de plantão.',
  },
  {
    titulo: 'Gestão de atendimentos',
    texto:
      'Organiza fluxos de triagens, marcações e acompanhamentos com regras de prioridade configuráveis. Cada caso recebe responsáveis definidos e alertas automáticos.',
  },
  {
    titulo: 'Insights e aprendizado',
    texto:
      'Dashboards analíticos alimentam líderes com dados de desempenho, enquanto o chatbot oferece respostas consistentes baseadas em casos reais e protocolos atualizados.',
  },
];

const indicadores = [
  { valor: '82.000', label: 'jovens atendidos' },
  { valor: '1.100', label: 'mulheres acolhidas' },
  { valor: '18.000', label: 'dentistas voluntários' },
  { valor: '23', label: 'países com atuação' },
];

const diferenciais = [
  {
    titulo: 'Comunicação unificada:',
    texto: 'triagens, atendimentos e interações são conectados por meio de um hub que organiza demandas por urgência e tema.',
  },
  {
    titulo: 'Base de conhecimento inteligente:',
    texto: 'protocolos, documentos e históricos solucionados ficam disponíveis em buscas rápidas.',
  },
  {
    titulo: 'Métricas em tempo real:',
    texto: 'dashboards acompanhados por lideranças mostram atendimentos, tempo de resposta e projeções de demanda.',
  },
  {
    titulo: 'Escalabilidade:',
    texto: 'arquitetura pensada para expansão nacional e internacional, permitindo integrar novos parceiros com agilidade.',
  },
];

export function Sobre() {
  const [ativo, setAtivo] = useState(0);

  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-teal-900 p-8 text-white shadow-xl" aria-labelledby="about-title">
        <span className="inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-300">
          Nossa proposta
        </span>
        <h1 id="about-title" className="mt-3 text-3xl font-bold md:text-5xl">Sobre a Central do Bem</h1>
        <p className="mt-3 max-w-3xl text-sm text-emerald-50 md:text-base">
          Conheça os pilares da solução desenvolvida para modernizar processos, fortalecer a comunicação e gerar inteligência para a
          Turma do Bem.
        </p>
      </section>

      <section className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:grid-cols-[0.7fr_1.3fr]" id="visao-geral" aria-labelledby="visao-title">
        <div className="flex items-center justify-center rounded-2xl bg-brand-50 p-6">
          <img src="/imagem/logo-turma-do-bem.png" alt="Logotipo da Central do Bem" className="max-h-48 w-auto" />
        </div>
        <div className="space-y-4">
          <h2 id="visao-title" className="text-2xl font-bold text-slate-900">Visão geral da solução</h2>
          <p className="text-slate-600">
            A Central do Bem é um CRM inteligente desenhado para integrar toda a operação da Turma do Bem em um único ambiente digital.
            Ele nasce para resolver desafios como comunicação fragmentada, perda de informações e falta de métricas confiáveis para
            decisões estratégicas.
          </p>
          <ul className="space-y-2 text-sm text-slate-600 md:text-base">
            {diferenciais.map((item) => (
              <li key={item.titulo}>
                <strong className="text-slate-800">{item.titulo}</strong> {item.texto}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm" aria-labelledby="pilares-title">
        <SectionHeader centered eyebrow="Como funciona" title="Pilares da Central do Bem" className="max-w-3xl" />
        <Accordion
          items={pilares.map((item) => ({
            id: item.titulo,
            title: item.titulo,
            content: <p>{item.texto}</p>,
          }))}
          activeIndex={ativo}
          onToggle={setAtivo}
        />
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Indicadores consolidados">
        {indicadores.map((item) => (
          <MetricCard key={item.label} value={item.valor} label={item.label} />
        ))}
      </section>
    </div>
  );
}
