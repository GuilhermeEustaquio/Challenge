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

// ── Union Types ──────────────────────────────────────────────────────────────
export type Status = 'ativo' | 'inativo' | 'pendente';

export type Especialidade =
  | 'ortodontia'
  | 'endodontia'
  | 'pediatria'
  | 'cirurgia'
  | 'geral';

export type Regional =
  | 'São Paulo'
  | 'Rio de Janeiro'
  | 'Belo Horizonte'
  | 'Curitiba'
  | 'Porto Alegre'
  | 'Salvador'
  | 'Fortaleza'
  | 'Outras';

// ── Domain Interfaces ────────────────────────────────────────────────────────
export interface IEndereco {
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

export interface IPaciente {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  status: Status;
  regional: Regional;
}

export interface IVoluntario {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  especialidade: Especialidade;
  status: Status;
  regional: Regional;
}

// ── Intersection Types ───────────────────────────────────────────────────────
export type PacienteCompleto = IPaciente & IEndereco;

export type VoluntarioCompleto = IVoluntario & IEndereco;

// ── API / Form helpers ───────────────────────────────────────────────────────
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface VoluntarioFormValues {
  nome: string;
  email: string;
  telefone: string;
  especialidade: Especialidade;
  status: Status;
  regional: Regional;
}
