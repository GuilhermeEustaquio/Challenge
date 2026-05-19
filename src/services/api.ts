const API_BASE_URL = import.meta.env.VITE_API_URL || '';

const getFriendlyError = (status: number): string => {
  if (status >= 500) return 'Serviço indisponível no momento. Tente novamente em instantes.';
  if (status === 404) return 'Registro não encontrado.';
  if (status === 400) return 'Dados inválidos. Revise as informações e tente novamente.';
  return 'Não foi possível concluir a requisição.';
};

const request = async <T>(endpoint: string, init?: RequestInit): Promise<T> => {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(init?.headers ?? {}),
      },
      ...init,
    });
  } catch {
    throw new Error(
      'Não foi possível conectar ao backend. Verifique se a API está ligada, se a URL está correta e se o CORS está liberado.'
    );
  }

  const text = await response.text();

  if (!response.ok) {
    let message = '';

    try {
      const json = text ? JSON.parse(text) : null;
      message = json?.message ?? json?.error ?? '';
    } catch {
      message = text || '';
    }

    throw new Error(message || getFriendlyError(response.status));
  }

  if (response.status === 204 || !text.trim()) {
    return undefined as T;
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    return text as T;
  }
};

export const isApiEnabled = (): boolean => API_BASE_URL.trim().length > 0;

export const apiGet = <T,>(endpoint: string): Promise<T> =>
  request<T>(endpoint, { method: 'GET' });

export const apiPost = <TRequest, TResponse>(
  endpoint: string,
  body: TRequest,
): Promise<TResponse> =>
  request<TResponse>(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
  });

export const apiPut = <TRequest, TResponse>(
  endpoint: string,
  body: TRequest,
): Promise<TResponse> =>
  request<TResponse>(endpoint, {
    method: 'PUT',
    body: JSON.stringify(body),
  });

export const apiDelete = (endpoint: string): Promise<void> =>
  request<void>(endpoint, { method: 'DELETE' });
