import { mockDoadores } from '../mocks/mockData';
import type { Doador } from '../types';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { apiDelete, apiGet, apiPost, apiPut, isApiEnabled } from './api';

const KEY = 'centraldobem_doadores';
const read = () => loadFromStorage<Doador[]>(KEY, mockDoadores);
const write = (data: Doador[]) => saveToStorage(KEY, data);
const nextId = (items: Doador[]) => Math.max(0, ...items.map((i) => i.id ?? 0)) + 1;

export const doadorService = {
  listar:      async ()                         => isApiEnabled() ? apiGet<Doador[]>('/doador')         : read(),
  buscarPorId: async (id: number)              => isApiEnabled() ? apiGet<Doador>(`/doador/${id}`)     : (read().find((i) => i.id === id) as Doador),
  criar:       async (payload: Doador)         => {
    if (isApiEnabled()) return apiPost<Doador, Doador>('/doador', payload);
    const items = read(); const created = { ...payload, id: nextId(items) }; write([...items, created]); return created;
  },
  atualizar:   async (id: number, p: Doador)   => {
    if (isApiEnabled()) return apiPut<Doador, Doador>(`/doador/${id}`, p);
    const updated = { ...p, id }; write(read().map((i) => (i.id === id ? updated : i))); return updated;
  },
  remover:     async (id: number)              => { if (isApiEnabled()) return apiDelete(`/doador/${id}`); write(read().filter((i) => i.id !== id)); },
};
