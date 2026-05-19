import { mockTriagens } from '../mocks/mockData';
import type { Triagem } from '../types';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { apiDelete, apiGet, apiPost, apiPut, isApiEnabled } from './api';

const KEY = 'centraldobem_triagens';
const read = () => loadFromStorage<Triagem[]>(KEY, mockTriagens);
const write = (data: Triagem[]) => saveToStorage(KEY, data);
const nextId = (items: Triagem[]) => Math.max(0, ...items.map((i) => i.id ?? 0)) + 1;

export const triagemService = {
  listar:      async ()                          => isApiEnabled() ? apiGet<Triagem[]>('/triagem')          : read(),
  buscarPorId: async (id: number)               => isApiEnabled() ? apiGet<Triagem>(`/triagem/${id}`)      : (read().find((i) => i.id === id) as Triagem),
  criar:       async (payload: Triagem)         => {
    if (isApiEnabled()) return apiPost<Triagem, Triagem>('/triagem', payload);
    const items = read(); const created = { ...payload, id: nextId(items) }; write([...items, created]); return created;
  },
  atualizar:   async (id: number, p: Triagem)   => {
    if (isApiEnabled()) return apiPut<Triagem, Triagem>(`/triagem/${id}`, p);
    const updated = { ...p, id }; write(read().map((i) => (i.id === id ? updated : i))); return updated;
  },
  remover:     async (id: number)               => { if (isApiEnabled()) return apiDelete(`/triagem/${id}`); write(read().filter((i) => i.id !== id)); },
};
