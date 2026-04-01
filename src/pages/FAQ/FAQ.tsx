import { useState } from 'react';
import { Accordion } from '../../components/Accordion/Accordion';
import { SectionHeader } from '../../components/SectionHeader/SectionHeader';

const perguntas: Array<{ pergunta: string; resposta: string; icone: string }> = [
  {
    icone: '🧩',
    pergunta: 'Qual problema o CRM Inteligente resolve dentro da Turma do Bem?',
    resposta:
      'O sistema foi desenvolvido para solucionar três desafios críticos: comunicação fragmentada, perda de informações importantes e falta de métricas confiáveis para tomada de decisão. Ele centraliza toda a operação em uma única plataforma, conectando dados, pessoas e processos de forma organizada e acessível.',
  },
  {
    icone: '💬',
    pergunta: 'Como o CRM organiza a comunicação entre equipe, dentistas e pacientes?',
    resposta:
      'Toda a comunicação é centralizada em um Hub Integrado de Mensagens, onde e-mails, mensagens e registros de ligações são automaticamente vinculados ao caso ou paciente correspondente. O sistema classifica as demandas por tipo e urgência, eliminando perda de contexto e reduzindo retrabalho entre as áreas.',
  },
  {
    icone: '📊',
    pergunta: 'O CRM oferece inteligência para apoiar decisões estratégicas?',
    resposta:
      'Vai muito além de um banco de dados. O CRM reúne dashboards analíticos em tempo real, histórico automático de casos e base de conhecimento para consulta de protocolos internos. Com dados consolidados em um único painel, o time consegue priorizar demandas, acompanhar metas e antecipar oportunidades de impacto.',
  },
  {
    icone: '🤝',
    pergunta: 'Como posso me voluntariar ou contribuir com a Turma do Bem?',
    resposta:
      'Para voluntários dentistas, o cadastro é feito pelo portal oficial da Turma do Bem em turmadobem.org.br. Após validação do CRO, o profissional recebe acesso ao módulo de jornada humanizada para gerenciar triagens e atendimentos diretamente pela plataforma.',
  },
  {
    icone: '🔒',
    pergunta: 'Meus dados estão seguros na plataforma?',
    resposta:
      'Sim. A Central do Bem segue as diretrizes da LGPD. Dados pessoais são armazenados com criptografia em repouso e em trânsito. O acesso é controlado por perfis — voluntário, coordenador e administrador — e cada usuário visualiza apenas o escopo necessário para sua função.',
  },
  {
    icone: '📱',
    pergunta: 'A plataforma funciona em dispositivos móveis?',
    resposta:
      'Sim, a interface é mobile-first e totalmente responsiva. Voluntários em campo conseguem registrar atendimentos, consultar históricos e enviar mensagens diretamente pelo smartphone, sem necessidade de aplicativo nativo instalado.',
  },
  {
    icone: '💸',
    pergunta: 'Qual é o custo de adoção da Central do Bem?',
    resposta:
      'A Central do Bem é um projeto de impacto social desenvolvido exclusivamente para a Turma do Bem. Os custos de infraestrutura são cobertos por parceiros institucionais e não há nenhuma cobrança para voluntários ou beneficiários da rede.',
  },
  {
    icone: '🌍',
    pergunta: 'Em quais regiões do Brasil a plataforma está disponível?',
    resposta:
      'A plataforma foi projetada para cobertura nacional e suporta as operações nos 23 países onde a Turma do Bem já atua. A expansão segue o crescimento da rede — novas regionais são integradas sem necessidade de configurações complexas.',
  },
  {
    icone: '⚡',
    pergunta: 'Em que a Central do Bem se diferencia de um CRM genérico de mercado?',
    resposta:
      'CRMs genéricos foram desenhados para vendas e atendimento corporativo. A Central do Bem foi construída do zero para as necessidades específicas da odontologia solidária: triagem por vulnerabilidade, gestão de voluntários, rastreabilidade de tratamentos e prestação de contas para doadores — funcionalidades que não existem em ferramentas off-the-shelf.',
  },
];

export function FAQ() {
  const [aberta, setAberta] = useState<number | null>(null);

  return (
    <div className="space-y-8">
      <SectionHeader
        centered
        title="FAQ Central do Bem"
        description="Conheça os detalhes do CRM Inteligente desenvolvido para a Turma do Bem. Reunimos as perguntas mais frequentes e explicamos como a solução transforma a rotina de atendimento e gestão."
      />

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <p className="mb-5 text-center text-xs text-slate-400">
          {perguntas.length} perguntas — clique para expandir
        </p>
        <Accordion
          items={perguntas.map((item) => ({
            id: item.pergunta,
            title: item.pergunta,
            leading: (
              <span className="text-xl leading-none" aria-hidden="true">
                {item.icone}
              </span>
            ),
            content: <p className="leading-relaxed">{item.resposta}</p>,
          }))}
          activeIndex={aberta}
          onToggle={(index) => setAberta(aberta === index ? null : index)}
          bordered={false}
        />
      </section>
    </div>
  );
}
