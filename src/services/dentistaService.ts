import { mockDentistas } from '../mocks/mockData';
import type { Dentista } from '../types';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { apiDelete, apiGet, apiPost, apiPut, isApiEnabled } from './api';

const KEY = 'centraldobem_dentistas';
const read = () => loadFromStorage<Dentista[]>(KEY, mockDentistas);
const write = (data: Dentista[]) => saveToStorage(KEY, data);
const nextId = (items: Dentista[]) => Math.max(0, ...items.map((i) => i.id ?? 0)) + 1;

export const dentistaService = {
  listar:      async ()                           => isApiEnabled() ? apiGet<Dentista[]>('/dentista')         : read(),
  buscarPorId: async (id: number)                => isApiEnabled() ? apiGet<Dentista>(`/dentista/${id}`)     : (read().find((i) => i.id === id) as Dentista),
  criar:       async (payload: Dentista)         => {
    if (isApiEnabled()) return apiPost<Dentista, Dentista>('/dentista', payload);
    const items = read(); const created = { ...payload, id: nextId(items) }; write([...items, created]); return created;
  },
  atualizar:   async (id: number, p: Dentista)   => {
    if (isApiEnabled()) return apiPut<Dentista, Dentista>(`/dentista/${id}`, p);
    const updated = { ...p, id }; write(read().map((i) => (i.id === id ? updated : i))); return updated;
  },
  remover:     async (id: number)                => { if (isApiEnabled()) return apiDelete(`/dentista/${id}`); write(read().filter((i) => i.id !== id)); },
};
