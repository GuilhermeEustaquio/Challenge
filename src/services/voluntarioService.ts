import { mockVoluntarios } from '../mocks/mockData';
import type { Voluntario } from '../types';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { apiDelete, apiGet, apiPost, apiPut, isApiEnabled } from './api';

const KEY = 'centraldobem_voluntarios';
const read = () => loadFromStorage<Voluntario[]>(KEY, mockVoluntarios);
const write = (data: Voluntario[]) => saveToStorage(KEY, data);
const nextId = (items: Voluntario[]) => Math.max(0, ...items.map((i) => i.id ?? 0)) + 1;

export const voluntarioService = {
  listar:      async ()                            => isApiEnabled() ? apiGet<Voluntario[]>('/voluntario')          : read(),
  buscarPorId: async (id: number)                 => isApiEnabled() ? apiGet<Voluntario>(`/voluntario/${id}`)      : (read().find((i) => i.id === id) as Voluntario),
  criar:       async (payload: Voluntario)        => {
    if (isApiEnabled()) return apiPost<Voluntario, Voluntario>('/voluntario', payload);
    const items = read(); const created = { ...payload, id: nextId(items) }; write([...items, created]); return created;
  },
  atualizar:   async (id: number, p: Voluntario)  => {
    if (isApiEnabled()) return apiPut<Voluntario, Voluntario>(`/voluntario/${id}`, p);
    const updated = { ...p, id }; write(read().map((i) => (i.id === id ? updated : i))); return updated;
  },
  remover:     async (id: number)                 => { if (isApiEnabled()) return apiDelete(`/voluntario/${id}`); write(read().filter((i) => i.id !== id)); },
};
