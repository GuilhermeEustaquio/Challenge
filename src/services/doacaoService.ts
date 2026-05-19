import { mockDoacoes } from '../mocks/mockData';
import type { Doacao } from '../types';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { apiDelete, apiGet, apiPost, apiPut, isApiEnabled } from './api';

const KEY = 'centraldobem_doacoes';
const read = () => loadFromStorage<Doacao[]>(KEY, mockDoacoes);
const write = (data: Doacao[]) => saveToStorage(KEY, data);
const nextId = (items: Doacao[]) => Math.max(0, ...items.map((i) => i.id ?? 0)) + 1;

export const doacaoService = {
  listar:      async ()                         => isApiEnabled() ? apiGet<Doacao[]>('/doacao')         : read(),
  buscarPorId: async (id: number)              => isApiEnabled() ? apiGet<Doacao>(`/doacao/${id}`)     : (read().find((i) => i.id === id) as Doacao),
  criar:       async (payload: Doacao)         => {
    if (isApiEnabled()) return apiPost<Doacao, Doacao>('/doacao', payload);
    const items = read(); const created = { ...payload, id: nextId(items) }; write([...items, created]); return created;
  },
  atualizar:   async (id: number, p: Doacao)   => {
    if (isApiEnabled()) return apiPut<Doacao, Doacao>(`/doacao/${id}`, p);
    const updated = { ...p, id }; write(read().map((i) => (i.id === id ? updated : i))); return updated;
  },
  remover:     async (id: number)              => { if (isApiEnabled()) return apiDelete(`/doacao/${id}`); write(read().filter((i) => i.id !== id)); },
};
