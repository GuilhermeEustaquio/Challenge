import type { Beneficiario, DashboardResumo, Dentista, Doacao, Doador, Triagem, Voluntario } from '../types';

export const mockBeneficiarios: Beneficiario[] = [
  {
    id: 1, nome: 'Ana Souza', cpf: '12345678900', dtNasc: '2012-03-15',
    email: 'ana@email.com', telefone: '11988881111',
    endereco: { cep: '01001000', logradouro: 'Praça da Sé', bairro: 'Sé', uf: 'SP', localidade: 'São Paulo', numero: '10' },
  },
  {
    id: 2, nome: 'Bruno Lima', cpf: '98765432100', dtNasc: '2008-07-22',
    email: 'bruno@email.com', telefone: '11977772222',
    endereco: { cep: '20040020', logradouro: 'Av. Rio Branco', bairro: 'Centro', uf: 'RJ', localidade: 'Rio de Janeiro', numero: '200' },
  },
];

export const mockDentistas: Dentista[] = [
  {
    id: 1, cro: 'CRO-SP 12345', nome: 'Dra. Camila Ferreira', cpf: '11122233344',
    dtNasc: '1985-06-10', email: 'camila@clinic.com', telefone: '11966661111',
    endereco: { cep: '01310100', logradouro: 'Av. Paulista', bairro: 'Bela Vista', uf: 'SP', localidade: 'São Paulo', numero: '1000', complemento: 'Sala 42' },
  },
  {
    id: 2, cro: 'CRO-SP 54321', nome: 'Dr. Renato Alves', cpf: '55566677788',
    dtNasc: '1979-11-05', email: 'renato@clinic.com', telefone: '11955552222',
    endereco: { cep: '01310200', logradouro: 'Av. Paulista', bairro: 'Bela Vista', uf: 'SP', localidade: 'São Paulo', numero: '2000' },
  },
];

export const mockDoadores: Doador[] = [
  {
    id: 1, nome: 'João Pedro', documento: '11122233344', dtNasc: '1975-04-18',
    email: 'joao@exemplo.com', telefone: '11944441111',
    endereco: { cep: '04538133', logradouro: 'Av. Brigadeiro Faria Lima', bairro: 'Itaim Bibi', uf: 'SP', localidade: 'São Paulo', numero: '3900' },
  },
  {
    id: 2, nome: 'Empresa Sorriso Ltda', documento: '12345678000199', dtNasc: '2000-01-01',
    email: 'contato@sorriso.com', telefone: '11933332222',
    endereco: { cep: '04543011', logradouro: 'Rua Funchal', bairro: 'Vila Olímpia', uf: 'SP', localidade: 'São Paulo', numero: '418', complemento: '3º andar' },
  },
];

export const mockDoacoes: Doacao[] = [
  { id: 1, doadorId: 1, valor: 300.00, descricao: 'Materiais odontológicos' },
  { id: 2, doadorId: 2, valor: 1200.00, descricao: 'Campanha de triagem' },
];

export const mockVoluntarios: Voluntario[] = [
  {
    id: 1, cro: 'CRO-MG 11111', nome: 'Fernanda Alves', cpf: '22233344455',
    dtNasc: '1990-09-25', email: 'fernanda@voluntario.com', telefone: '11922221111',
    endereco: { cep: '30140071', logradouro: 'Av. Afonso Pena', bairro: 'Centro', uf: 'MG', localidade: 'Belo Horizonte', numero: '1500' },
    dtCadastro: '2025-01-10',
  },
  {
    id: 2, cro: 'CRO-SP 22222', nome: 'Lucas Rocha', cpf: '66677788899',
    dtNasc: '1995-02-14', email: 'lucas@voluntario.com', telefone: '11911112222',
    endereco: { cep: '01310100', logradouro: 'Av. Paulista', bairro: 'Bela Vista', uf: 'SP', localidade: 'São Paulo', numero: '900' },
    dtCadastro: '2025-03-05',
  },
];

export const mockTriagens: Triagem[] = [
  { id: 1, idBenef: 1, idVolun: 2, dtInicio: '2026-05-12', resultado: 'PENDENTE' },
];

export const mockDashboardResumo: DashboardResumo = {
  totalBeneficiarios: mockBeneficiarios.length,
  totalDentistas: mockDentistas.length,
  totalVoluntarios: mockVoluntarios.length,
  totalDoadores: mockDoadores.length,
  totalDoacoes: mockDoacoes.length,
  totalTriagens: mockTriagens.length,
  triagensEmAndamento: mockTriagens.filter((t) => !t.dtFim).length,
};
