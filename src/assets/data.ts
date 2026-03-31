import type { NavItem, SolutionItem, TeamMember } from '../types';

export const navItems: NavItem[] = [
  { label: 'Home', path: '/home' },
  { label: 'Sobre', path: '/sobre' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contato', path: '/contato' },
  { label: 'Integrantes', path: '/integrantes' },
  { label: 'Solução', path: '/solucao' },
];

export const teamMembers: TeamMember[] = [
  {
    nome: 'Guilherme Pinto Eustáquio',
    rm: '566784',
    turma: '1TDSPS',
    foto: '/imagem/eustaquio.PNG',
    github: 'https://github.com/GuilhermeEustaquio',
    linkedin: 'https://www.linkedin.com/in/guilhermeeustaquio/',
  },
  {
    nome: 'Caio Cantini Couto',
    rm: '563452',
    turma: '1TDSPS',
    foto: '/imagem/caioperfil.jpeg',
    github: 'https://github.com/caioccouto',
    linkedin: 'https://www.linkedin.com/in/caio-couto-44b849326/',
  },
  {
    nome: 'Matheus Tavares da Silva',
    rm: '566844',
    turma: '1TDSPS',
    foto: '/imagem/euperfil.jpg',
    github: 'https://github.com/manovares',
    linkedin: 'https://www.linkedin.com/in/manovares/',
  },
];

export const solutions: SolutionItem[] = [
  {
    id: 'hub-comunicacao',
    titulo: 'Hub Integrado de Comunicação',
    descricao:
      'Centraliza e-mails, mensagens e histórico de atendimento para eliminar ruídos e retrabalho entre voluntários, coordenadores e beneficiários.',
    imagem: '/imagem/dentistas-voluntarios.png',
    objetivo:
      'Garantir visão 360º de cada caso para voluntários, coordenação e beneficiários.',
    tag: 'Comunicação',
    publicoAlvo: 'Dentistas voluntários, coordenadores regionais e beneficiários da rede TdB.',
    funcionalidades: [
      'Caixa de entrada unificada para e-mail e mensagens internas',
      'Histórico completo de interações por paciente',
      'Alertas automáticos para retornos e follow-ups pendentes',
      'Encaminhamento inteligente de casos entre voluntários',
      'Templates de resposta rápida para perguntas frequentes',
      'Exportação de histórico em PDF para prontuário',
    ],
    beneficios: [
      'Redução de 60% no tempo de resposta ao beneficiário',
      'Eliminação de mensagens duplicadas e retrabalho',
      'Rastreabilidade total de cada atendimento',
      'Menos falhas de comunicação entre equipes',
    ],
    tecnologias: ['React', 'TypeScript', 'WebSocket', 'REST API', 'Tailwind CSS'],
  },
  {
    id: 'painel-inteligente',
    titulo: 'Painel de Inteligência Operacional',
    descricao:
      'Mostra métricas em tempo real para apoiar decisões estratégicas, prever demanda e identificar gargalos na rede de atendimento.',
    imagem: '/imagem/jovens-atendidos.png',
    objetivo:
      'Transformar dados em ações rápidas e com impacto social mensurável.',
    tag: 'Analytics',
    publicoAlvo: 'Liderança estratégica, coordenadores regionais e gestores do programa Turma do Bem.',
    funcionalidades: [
      'Dashboard com KPIs em tempo real (atendimentos, filas, NPS)',
      'Gráficos de tendência mensal e anual',
      'Mapa de calor geográfico por região atendida',
      'Relatórios automatizados para prestação de contas',
      'Previsão de demanda por sazonalidade',
      'Alertas de desvio de meta com notificação push',
    ],
    beneficios: [
      'Decisões baseadas em dados, não em achismos',
      'Identificação antecipada de regiões com alta demanda',
      'Relatórios em segundos, sem planilhas manuais',
      'Evidências sólidas para captação de novos parceiros',
    ],
    tecnologias: ['React', 'Chart.js', 'TypeScript', 'REST API', 'Tailwind CSS'],
  },
  {
    id: 'jornada-humanizada',
    titulo: 'Jornada de Atendimento Humanizada',
    descricao:
      'Fluxos digitais com triagem automatizada, acompanhamento contínuo e alertas inteligentes para acelerar o suporte odontológico.',
    imagem: '/imagem/mulheres-atendidas.png',
    objetivo:
      'Oferecer acolhimento contínuo do primeiro contato até a conclusão do tratamento.',
    tag: 'Atendimento',
    publicoAlvo: 'Jovens em vulnerabilidade, mulheres do programa Apolônia do Bem e voluntários cadastrados.',
    funcionalidades: [
      'Triagem digital com questionário de anamnese simplificado',
      'Fila de espera inteligente com priorização por urgência',
      'Notificações automáticas de confirmação e lembrete de consulta',
      'Registro de evolução do tratamento por fase',
      'Canal de dúvidas pós-atendimento com prazo de resposta garantido',
      'Avaliação de satisfação ao fim de cada atendimento',
    ],
    beneficios: [
      'Redução de faltas em até 40% com lembretes automáticos',
      'Continuidade do cuidado mesmo com troca de voluntário',
      'Experiência humanizada e acolhedora para o beneficiário',
      'Dados de satisfação para melhoria contínua do serviço',
    ],
    tecnologias: ['React', 'TypeScript', 'React Hook Form', 'REST API', 'Tailwind CSS'],
  },
];
