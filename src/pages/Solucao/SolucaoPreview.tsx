import { useState } from 'react';

interface SolucaoPreviewProps {
  solutionId: string;
}

/* ─────────────────────────────────────────────────────────────────
   1 · Hub Integrado de Comunicação
───────────────────────────────────────────────────────────────── */

interface MockMessage {
  id: number;
  remetente: string;
  iniciais: string;
  assunto: string;
  preview: string;
  hora: string;
  lida: boolean;
  corpo: string;
}

const MENSAGENS: MockMessage[] = [
  {
    id: 1,
    remetente: 'Dra. Ana Beatriz',
    iniciais: 'AB',
    assunto: 'Retorno paciente — João Silva',
    preview: 'Precisaria remarcar o retorno do paciente João para a semana...',
    hora: '09:41',
    lida: false,
    corpo:
      'Olá equipe, precisaria remarcar o retorno do paciente João Silva (triagem #2041) para a semana que vem. Ele confirmou disponibilidade na terça-feira após as 14h. Por favor, atualizem o sistema. Obrigada!',
  },
  {
    id: 2,
    remetente: 'Coord. SP — Região Sul',
    iniciais: 'CS',
    assunto: 'Relatório semanal de atendimentos',
    preview: '47 atendimentos realizados, 3 encaminhamentos para especialista...',
    hora: 'Ontem',
    lida: true,
    corpo:
      'Boa tarde, segue o consolidado da semana: 47 atendimentos realizados, 3 encaminhamentos para especialista, taxa de satisfação 4,8/5. Destaque para a redução de 18% nas faltas após a implementação dos lembretes automáticos.',
  },
  {
    id: 3,
    remetente: 'Sistema — Alerta',
    iniciais: 'SA',
    assunto: '⚠ 5 follow-ups pendentes há +48h',
    preview: 'Os casos #1938, #2003, #2015, #2019 e #2040 aguardam resposta...',
    hora: '2 dias',
    lida: true,
    corpo:
      'Atenção: os casos #1938, #2003, #2015, #2019 e #2040 estão aguardando resposta por mais de 48 horas. Prazo máximo de resolução: amanhã às 18h.',
  },
];

function HubComunicacaoPreview() {
  const [selecionada, setSelecionada] = useState<MockMessage | null>(null);

  return (
    <div className="flex h-[420px] divide-x divide-slate-100">
      {/* Lista */}
      <div
        className={`flex flex-col ${selecionada ? 'hidden sm:flex sm:w-[280px]' : 'w-full sm:w-[280px]'}`}
      >
        <div className="border-b border-slate-100 bg-slate-50 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Caixa de entrada</p>
          <p className="text-base font-bold text-slate-800">3 mensagens</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {MENSAGENS.map((msg) => (
            <button
              key={msg.id}
              onClick={() => setSelecionada(msg)}
              className={`w-full border-b border-slate-100 px-4 py-3 text-left transition hover:bg-slate-50 ${
                selecionada?.id === msg.id
                  ? 'border-l-2 border-l-primary bg-primary/5'
                  : ''
              }`}
            >
              <div className="flex items-start gap-2">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {msg.iniciais}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <p
                      className={`truncate text-sm ${
                        !msg.lida ? 'font-bold text-slate-900' : 'font-medium text-slate-700'
                      }`}
                    >
                      {msg.remetente}
                    </p>
                    <span className="shrink-0 text-xs text-slate-400">{msg.hora}</span>
                  </div>
                  <p
                    className={`truncate text-xs ${
                      !msg.lida ? 'font-semibold text-slate-800' : 'text-slate-500'
                    }`}
                  >
                    {msg.assunto}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-slate-400">{msg.preview}</p>
                </div>
                {!msg.lida && (
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Detalhe */}
      {selecionada ? (
        <div className="flex flex-1 flex-col">
          <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-3">
            <button
              onClick={() => setSelecionada(null)}
              className="mr-1 rounded-lg p-1 text-slate-500 hover:bg-slate-200 sm:hidden"
              aria-label="Voltar para lista"
            >
              ←
            </button>
            <div>
              <p className="font-semibold text-slate-900">{selecionada.assunto}</p>
              <p className="text-xs text-slate-500">
                De: {selecionada.remetente} — {selecionada.hora}
              </p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-5">
            <p className="text-sm leading-relaxed text-slate-700">{selecionada.corpo}</p>
          </div>
          <div className="border-t border-slate-100 px-4 py-3">
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-400">
              <span>✏</span>
              <span>Responder a {selecionada.remetente}...</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden flex-1 items-center justify-center text-slate-400 sm:flex">
          <div className="text-center">
            <p className="text-4xl">✉</p>
            <p className="mt-2 text-sm">Selecione uma mensagem</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   2 · Painel de Inteligência Operacional
───────────────────────────────────────────────────────────────── */

type Periodo = 'Hoje' | 'Semana' | 'Mês';

interface KpiData {
  label: string;
  values: Record<Periodo, number>;
  unit: string;
  cor: string;
}

const KPIS: KpiData[] = [
  { label: 'Atendimentos',  values: { Hoje: 14,  Semana: 87,  Mês: 312 }, unit: '',    cor: 'text-primary' },
  { label: 'Tempo médio',   values: { Hoje: 22,  Semana: 19,  Mês: 21  }, unit: 'min', cor: 'text-secondary' },
  { label: 'NPS',           values: { Hoje: 4.7, Semana: 4.8, Mês: 4.6 }, unit: '/5',  cor: 'text-teal-600' },
];

interface BarData {
  label: string;
  values: Record<Periodo, number>;
}

const BAR_DATA: BarData[] = [
  { label: 'Seg', values: { Hoje: 30, Semana: 80, Mês: 65 } },
  { label: 'Ter', values: { Hoje: 50, Semana: 60, Mês: 75 } },
  { label: 'Qua', values: { Hoje: 70, Semana: 90, Mês: 85 } },
  { label: 'Qui', values: { Hoje: 40, Semana: 70, Mês: 60 } },
  { label: 'Sex', values: { Hoje: 20, Semana: 50, Mês: 70 } },
];

const ATIVIDADES = [
  { icon: '✅', texto: 'Triagem #2041 concluída', tempo: '2m' },
  { icon: '📋', texto: 'Relatório semanal gerado', tempo: '15m' },
  { icon: '⚠',  texto: '5 follow-ups pendentes', tempo: '1h' },
];

const PERIODOS: Periodo[] = ['Hoje', 'Semana', 'Mês'];

function PainelInteligentePreview() {
  const [periodo, setPeriodo] = useState<Periodo>('Semana');

  return (
    <div className="space-y-5 p-5">
      {/* Cabeçalho + abas */}
      <div className="flex items-center justify-between">
        <p className="font-bold text-slate-800">Visão operacional</p>
        <div className="flex rounded-xl border border-slate-200 bg-slate-50 p-0.5">
          {PERIODOS.map((p) => (
            <button
              key={p}
              onClick={() => setPeriodo(p)}
              className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${
                periodo === p
                  ? 'bg-white text-primary shadow-sm ring-1 ring-slate-200'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-3 gap-3">
        {KPIS.map((kpi) => (
          <div key={kpi.label} className="rounded-2xl border border-slate-100 bg-slate-50 p-3 text-center">
            <p className={`text-2xl font-black tabular-nums ${kpi.cor}`}>
              {kpi.values[periodo]}
              {kpi.unit}
            </p>
            <p className="mt-0.5 text-xs text-slate-500">{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* Gráfico de barras CSS puro */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Atendimentos por dia (% da meta)
        </p>
        <div className="flex h-24 items-end gap-2">
          {BAR_DATA.map((bar) => (
            <div key={bar.label} className="flex flex-1 flex-col items-center gap-1">
              <div
                className="w-full rounded-t-md bg-primary/80 transition-all duration-500"
                style={{ height: `${bar.values[periodo]}%` }}
              />
              <span className="text-xs text-slate-500">{bar.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Atividade recente */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Atividade recente
        </p>
        <div className="space-y-2">
          {ATIVIDADES.map((a) => (
            <div
              key={a.texto}
              className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-sm"
            >
              <span>{a.icon}</span>
              <span className="flex-1 text-slate-700">{a.texto}</span>
              <span className="text-xs text-slate-400">{a.tempo}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   3 · Jornada de Atendimento Humanizada
───────────────────────────────────────────────────────────────── */

type StepId = 1 | 2 | 3;

interface WizardState {
  step: StepId;
  tipoPaciente: string;
  urgencia: string;
}

const TIPOS_PACIENTE = [
  'Jovem em vulnerabilidade',
  'Mulher — Programa Apolônia',
  'Caso de encaminhamento externo',
];

const NIVEIS_URGENCIA = [
  'Rotina (fila normal — até 30 dias)',
  'Prioritário (7 dias úteis)',
  'Urgência (até 48 horas)',
];

const STEP_LABELS: Record<StepId, string> = {
  1: 'Perfil',
  2: 'Urgência',
  3: 'Resultado',
};

function getTempoEspera(urgencia: string): string {
  if (urgencia.includes('48')) return 'Até 48 horas';
  if (urgencia.includes('7 dias')) return '7 dias úteis';
  return 'Até 30 dias corridos';
}

function JornadaHumanizadaPreview() {
  const [state, setState] = useState<WizardState>({
    step: 1,
    tipoPaciente: '',
    urgencia: '',
  });

  const reiniciar = () => setState({ step: 1, tipoPaciente: '', urgencia: '' });

  return (
    <div className="space-y-5 p-5">
      {/* Stepper */}
      <div className="flex items-center gap-2">
        {([1, 2, 3] as StepId[]).map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all ${
                state.step === s
                  ? 'bg-primary text-white ring-2 ring-primary/30'
                  : state.step > s
                    ? 'bg-primary/20 text-primary'
                    : 'bg-slate-100 text-slate-400'
              }`}
            >
              {state.step > s ? '✓' : s}
            </div>
            <span
              className={`hidden text-xs sm:block ${
                state.step === s ? 'font-semibold text-slate-800' : 'text-slate-400'
              }`}
            >
              {STEP_LABELS[s]}
            </span>
            {i < 2 && <span className="text-slate-200">—</span>}
          </div>
        ))}
      </div>

      {/* Step 1 */}
      {state.step === 1 && (
        <div className="space-y-3">
          <p className="font-semibold text-slate-800">Qual é o perfil do paciente?</p>
          <div className="grid gap-2">
            {TIPOS_PACIENTE.map((tipo) => (
              <button
                key={tipo}
                onClick={() => setState((prev) => ({ ...prev, tipoPaciente: tipo, step: 2 }))}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm text-slate-700 transition hover:border-primary hover:bg-primary/5 hover:text-primary"
              >
                {tipo}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2 */}
      {state.step === 2 && (
        <div className="space-y-3">
          <div>
            <p className="text-xs text-slate-500">
              Paciente: <strong>{state.tipoPaciente}</strong>
            </p>
            <p className="mt-1 font-semibold text-slate-800">Qual é o nível de urgência?</p>
          </div>
          <div className="grid gap-2">
            {NIVEIS_URGENCIA.map((nivel) => (
              <button
                key={nivel}
                onClick={() => setState((prev) => ({ ...prev, urgencia: nivel, step: 3 }))}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm text-slate-700 transition hover:border-primary hover:bg-primary/5 hover:text-primary"
              >
                {nivel}
              </button>
            ))}
          </div>
          <button
            onClick={() => setState((prev) => ({ ...prev, step: 1 }))}
            className="text-xs text-slate-400 hover:text-slate-600"
          >
            ← Voltar
          </button>
        </div>
      )}

      {/* Step 3 — Resultado */}
      {state.step === 3 && (
        <div className="space-y-4">
          <div className="space-y-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✅</span>
              <p className="font-bold text-emerald-800">Triagem concluída com sucesso!</p>
            </div>
            <div className="space-y-1.5 text-sm text-emerald-900">
              <p>
                <strong>Perfil:</strong> {state.tipoPaciente}
              </p>
              <p>
                <strong>Urgência:</strong> {state.urgencia}
              </p>
              <p>
                <strong>Tempo estimado de espera:</strong> {getTempoEspera(state.urgencia)}
              </p>
            </div>
            <p className="text-xs text-emerald-700">
              O paciente será notificado por SMS/e-mail quando um voluntário for designado.
            </p>
          </div>
          <button
            onClick={reiniciar}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-primary hover:text-primary"
          >
            Reiniciar triagem
          </button>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Wrapper principal
───────────────────────────────────────────────────────────────── */

export function SolucaoPreview({ solutionId }: SolucaoPreviewProps) {
  return (
    <section className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-xl font-bold text-dark">Prévia do módulo</h2>
        <span className="rounded-full border border-amber-300/60 bg-amber-50 px-3 py-0.5 text-xs font-semibold text-amber-700">
          Demo interativa
        </span>
      </div>
      <p className="text-sm text-slate-500">
        Simulação ilustrativa para fins de apresentação. Os dados exibidos são fictícios.
      </p>
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md">
        {solutionId === 'hub-comunicacao'    && <HubComunicacaoPreview />}
        {solutionId === 'painel-inteligente' && <PainelInteligentePreview />}
        {solutionId === 'jornada-humanizada' && <JornadaHumanizadaPreview />}
      </div>
    </section>
  );
}
