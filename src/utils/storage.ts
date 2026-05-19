export const loadFromStorage = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

export const saveToStorage = <T,>(key: string, data: T): void => {
  try { localStorage.setItem(key, JSON.stringify(data)); } catch {}
};

export const resetStorageKey = (key: string): void => {
  try { localStorage.removeItem(key); } catch {}
};
