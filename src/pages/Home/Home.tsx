import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { solutions } from '../../assets/data';
import { Button } from '../../components/Button/Button';
import { Card } from '../../components/Card/Card';
import { SectionHeader } from '../../components/SectionHeader/SectionHeader';

const indicadores = [
  { titulo: 'Jovens atendidos', valor: 82000, descricao: 'Atendimentos gratuitos em toda a rede TdB.' },
  { titulo: 'Dentistas voluntários', valor: 18000, descricao: 'Profissionais ativos na jornada de cuidado.' },
  { titulo: 'Mulheres acolhidas', valor: 1100, descricao: 'Apolônias do Bem com apoio odontológico.' },
];

const etapas = [
  {
    numero: '01',
    titulo: 'Cadastro unificado',
    descricao: 'Voluntários e beneficiários se registram uma única vez. Todos os dados ficam centralizados e acessíveis em tempo real.',
  },
  {
    numero: '02',
    titulo: 'Triagem inteligente',
    descricao: 'O sistema classifica demandas por urgência e direciona cada caso ao voluntário mais adequado na região.',
  },
  {
    numero: '03',
    titulo: 'Acompanhamento contínuo',
    descricao: 'Notificações automáticas, histórico de atendimento e avaliação de satisfação garantem cuidado do início ao fim.',
  },
  {
    numero: '04',
    titulo: 'Análise de impacto',
    descricao: 'Dashboards em tempo real traduzem cada atendimento em dados concretos para prestação de contas e captação de recursos.',
  },
];

const diferenciais = [
  {
    icone: '🤝',
    titulo: '100% voltado à TdB',
    descricao: 'Projetado exclusivamente para a realidade e os processos da Turma do Bem — não é um CRM genérico adaptado.',
  },
  {
    icone: '📱',
    titulo: 'Mobile-first',
    descricao: 'Interface responsiva que funciona em qualquer dispositivo, essencial para voluntários em campo.',
  },
  {
    icone: '🔒',
    titulo: 'Dados protegidos',
    descricao: 'Arquitetura segura com controle de acesso por perfil — voluntário, coordenador e administrador.',
  },
  {
    icone: '⚡',
    titulo: 'Decisões em tempo real',
    descricao: 'Painéis dinâmicos que transformam dados brutos em insights acionáveis para a liderança.',
  },
  {
    icone: '💙',
    titulo: 'Foco na humanização',
    descricao: 'Cada fluxo foi pensado para preservar o vínculo humano entre voluntário e beneficiário.',
  },
  {
    icone: '🌍',
    titulo: 'Escalável e replicável',
    descricao: 'Estrutura modular pronta para crescer junto com a expansão da rede nacional da TdB.',
  },
];

const depoimentos = [
  {
    nome: 'Dra. Fernanda Lima',
    perfil: 'Dentista voluntária — São Paulo/SP',
    texto:
      'Antes eu perdia horas tentando organizar os retornos dos pacientes por WhatsApp. Com a Central do Bem, tudo fica num lugar só. Consigo atender muito mais jovens sem abrir mão da qualidade.',
    avatar: 'FL',
  },
  {
    nome: 'Carlos Eduardo',
    perfil: 'Coordenador regional — Belo Horizonte/MG',
    texto:
      'A visibilidade que o painel nos dá é impressionante. Antes da plataforma, eu ficava no escuro sobre quantas vagas estavam disponíveis. Hoje tomo decisões com dados reais na mão.',
    avatar: 'CE',
  },
  {
    nome: 'Juliana Matos',
    perfil: 'Beneficiária — Recife/PE',
    texto:
      'Recebi lembretes das minhas consultas e nunca mais esqueci de aparecer. O dentista sabia tudo sobre meu histórico e me tratou com muito cuidado. Faz toda diferença.',
    avatar: 'JM',
  },
];

function useContadorAnimado(alvo: number, ativo: boolean) {
  const [valor, setValor] = useState(0);
  useEffect(() => {
    if (!ativo) return;
    const incremento = Math.ceil(alvo / 60);
    const id = setInterval(() => {
      setValor((prev) => {
        if (prev + incremento >= alvo) {
          clearInterval(id);
          return alvo;
        }
        return prev + incremento;
      });
    }, 30);
    return () => clearInterval(id);
  }, [alvo, ativo]);
  return valor;
}

function ContadorCard({ indicador }: { indicador: (typeof indicadores)[0] }) {
  const [visivel, setVisivel] = useState(false);
  const valor = useContadorAnimado(indicador.valor, visivel);

  useEffect(() => {
    const timer = setTimeout(() => setVisivel(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <p className="text-2xl font-extrabold text-primary">{valor.toLocaleString('pt-BR')}+</p>
      <p className="mt-1 font-semibold text-dark">{indicador.titulo}</p>
      <p className="mt-1 text-sm text-slate-500">{indicador.descricao}</p>
    </article>
  );
}

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="space-y-16">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-teal-700 to-secondary p-8 text-white shadow-xl md:p-12">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-white/5 blur-2xl" />
        <span className="relative text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
          Plataforma CRM para a Turma do Bem
        </span>
        <h1 className="relative mt-3 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
          Central do Bem
        </h1>
        <p className="relative mt-4 max-w-2xl text-base text-cyan-50 md:text-lg">
          Conectando voluntários, coordenadores e beneficiários com tecnologia, dados e humanização. Uma plataforma
          feita para ampliar o impacto social da odontologia solidária no Brasil.
        </p>
        <div className="relative mt-7 flex flex-wrap gap-3">
          <Button onClick={() => navigate('/solucao')}>Explorar módulos</Button>
          <Button
            variant="outline"
            className="border-white text-white hover:bg-white/10"
            onClick={() => navigate('/sobre')}
          >
            Conheça a TdB
          </Button>
        </div>
      </div>

      {/* Indicadores */}
      <section className="space-y-5">
        <SectionHeader
          title="Impacto real em números"
          description="A Turma do Bem já transformou a saúde bucal de dezenas de milhares de brasileiros. A Central do Bem existe para escalar ainda mais esse alcance."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {indicadores.map((indicador) => (
            <ContadorCard key={indicador.titulo} indicador={indicador} />
          ))}
        </div>
      </section>

      {/* Como funciona */}
      <section className="space-y-6">
        <SectionHeader
          title="Como funciona"
          description="Da primeira triagem à análise de impacto, a Central do Bem cobre toda a jornada de atendimento."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {etapas.map((etapa, index) => (
            <article
              key={etapa.numero}
              className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              {index < etapas.length - 1 && (
                <span className="absolute -right-2 top-6 hidden text-slate-300 lg:block">→</span>
              )}
              <span className="inline-block rounded-xl bg-primary/10 px-3 py-1 text-lg font-black text-primary">
                {etapa.numero}
              </span>
              <h3 className="mt-3 font-bold text-dark">{etapa.titulo}</h3>
              <p className="mt-1 text-sm text-slate-600">{etapa.descricao}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Frentes de solução */}
      <section className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <SectionHeader title="Frentes de solução" className="space-y-0" />
          <Button variant="outline" onClick={() => navigate('/solucao')}>
            Ver tudo
          </Button>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solucao) => (
            <Card key={solucao.id} title={solucao.titulo} description={solucao.descricao} image={solucao.imagem}>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
                  {solucao.tag}
                </span>
                <Button onClick={() => navigate(`/solucao/${solucao.id}`)}>Ver detalhes</Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Diferenciais */}
      <section className="space-y-6 rounded-3xl bg-gradient-to-br from-slate-900 to-dark p-8 text-white shadow-xl md:p-10">
        <SectionHeader
          title="Por que a Central do Bem?"
          description="Não é apenas software. É infraestrutura para o impacto social."
          className="[&_h2]:text-white [&_p]:text-slate-300"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {diferenciais.map((item) => (
            <article
              key={item.titulo}
              className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 transition hover:bg-white/10"
            >
              <span className="text-3xl">{item.icone}</span>
              <h3 className="mt-3 font-bold">{item.titulo}</h3>
              <p className="mt-1 text-sm text-slate-300">{item.descricao}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Depoimentos */}
      <section className="space-y-6">
        <SectionHeader
          title="Vozes da rede"
          description="Quem usa a Central do Bem conta como a plataforma transforma seu dia a dia."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {depoimentos.map((dep) => (
            <article
              key={dep.nome}
              className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <p className="flex-1 text-sm leading-relaxed text-slate-700">"{dep.texto}"</p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  {dep.avatar}
                </div>
                <div>
                  <p className="font-semibold text-dark">{dep.nome}</p>
                  <p className="text-xs text-slate-500">{dep.perfil}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section className="rounded-3xl bg-gradient-to-r from-secondary to-primary p-8 text-center text-white shadow-lg md:p-12">
        <h2 className="text-2xl font-bold md:text-3xl">Pronto para ampliar o impacto da TdB?</h2>
        <p className="mx-auto mt-3 max-w-xl text-cyan-50">
          Entre em contato com a equipe da Central do Bem e saiba como integrar sua organização à plataforma.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button
            variant="ghost"
            className="bg-white text-primary hover:bg-cyan-50"
            onClick={() => navigate('/contato')}
          >
            Fale conosco
          </Button>
          <Button
            variant="ghost"
            className="border-2 border-white text-white hover:bg-white/10"
            onClick={() => navigate('/integrantes')}
          >
            Conheça a equipe
          </Button>
        </div>
      </section>
    </div>
  );
}
