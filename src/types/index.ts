export interface NavItem {
  label: string;
  path: string;
}

export interface TeamMember {
  nome: string;
  rm: string;
  turma: string;
  foto: string;
  github: string;
  linkedin: string;
}

export interface SolutionItem {
  id: string;
  titulo: string;
  descricao: string;
  imagem: string;
  objetivo: string;
  tag: string;
  publicoAlvo: string;
  funcionalidades: string[];
  beneficios: string[];
  tecnologias: string[];
}

export interface ContactFormValues {
  nome: string;
  email: string;
  telefone?: string;
  mensagem: string;
}

// ── Shared address object (maps to Java Endereco class) ────────────────────
export interface Endereco {
  cep: string;         // 8 raw digits — backend validates cep.length() == 8
  logradouro: string;
  bairro: string;
  uf: string;          // 2-letter state code
  localidade: string;
  numero?: string;
  complemento?: string;
}

// ── Entities aligned with Java domain classes & Oracle DB ─────────────────

/** Maps to Java Beneficiario extends Pessoa */
export interface Beneficiario {
  id?: number;
  nome: string;
  cpf: string;         // 11 raw digits
  dtNasc: string;      // ISO date YYYY-MM-DD
  email: string;
  telefone: string;    // 10 or 11 raw digits
  endereco: Endereco;  // nested object
}

/** Maps to Java Dentista extends Pessoa */
export interface Dentista {
  id?: number;
  cro: string;
  nome: string;
  cpf: string;
  dtNasc: string;
  email: string;
  telefone: string;
  endereco: Endereco;
}

/** Maps to Java Voluntario extends Pessoa */
export interface Voluntario {
  id?: number;
  cro: string;
  nome: string;
  cpf: string;
  dtNasc: string;
  email: string;
  telefone: string;
  endereco: Endereco;
  dtCadastro: string;  // Java field: dtCadastro
}

/** Maps to Java Doador extends Pessoa (cpf is null; uses documento instead) */
export interface Doador {
  id?: number;
  nome: string;
  documento: string;   // Java field: documento (DB column DOCUMANTO has a typo)
  dtNasc: string;
  email: string;
  telefone: string;
  endereco: Endereco;
}

/** Maps to Java Doacao */
export interface Doacao {
  id?: number;
  valor: number;
  descricao?: string;
  doadorId: number;    // Java field: doadorId
}

/** Maps to Java Triagem + ResultadoTriagem enum */
export interface Triagem {
  id?: number;
  idBenef: number;     // Java field: idBenef
  idVolun: number;     // Java field: idVolun
  dtInicio: string;    // Java field: dtInicio
  dtFim?: string;      // Java field: dtFim (nullable)
  resultado: 'APROVADO' | 'REPROVADO' | 'PENDENTE';
}

export interface DashboardResumo {
  totalBeneficiarios: number;
  totalDentistas: number;
  totalVoluntarios: number;
  totalDoadores: number;
  totalDoacoes: number;
  totalTriagens: number;
  triagensEmAndamento: number;
}

export type BeneficiarioFormValues = Omit<Beneficiario, 'id'>;
export type DentistaFormValues    = Omit<Dentista, 'id'>;
export type DoadorFormValues      = Omit<Doador, 'id'>;
export type DoacaoFormValues      = Omit<Doacao, 'id'>;
export type VoluntarioFormValues  = Omit<Voluntario, 'id'>;
export type TriagemFormValues     = Omit<Triagem, 'id'>;
