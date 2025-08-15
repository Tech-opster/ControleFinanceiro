import { auth } from '../firebase/firebase'; // Ajuste o caminho

const baseUrl = import.meta.env.VITE_URL_BACKEND;

// ✅ Função para pegar o token automaticamente
const getAuthHeaders = async () => {
  const user = auth.currentUser;
  
  if (!user) {
    throw new Error("Usuário não autenticado");
  }

  const token = await user.getIdToken();
  
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

export const get = async <T = unknown>(path: string): Promise<T> => {
  try {
    const headers = await getAuthHeaders();
    
    const res = await fetch(`${baseUrl}${path}`, {
      method: 'GET',
      headers
    });
  
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `Erro ${res.status}: ${res.statusText}`);
    }

    return res.json();
  } catch (error: unknown) {
    console.error('Erro na requisição GET:', error);
    throw error;
  }
};

export const post = async <T = unknown>(path: string, data: unknown): Promise<T> => {
  try {
    const headers = await getAuthHeaders();
    
    const res = await fetch(`${baseUrl}${path}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `Erro ${res.status}: ${res.statusText}`);
    }

    return res.json();
  } catch (error: unknown) {
    console.error('Erro na requisição POST:', error);
    throw error;
  }
};

export const put = async <T = unknown>(path: string, data: unknown): Promise<T> => {
  try {
    const headers = await getAuthHeaders();
    
    const res = await fetch(`${baseUrl}${path}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `Erro ${res.status}: ${res.statusText}`);
    }

    return res.json();
  } catch (error: unknown) {
    console.error('Erro na requisição PUT:', error);
    throw error;
  }
};

export const del = async <T = unknown>(path: string): Promise<T> => {
  try {
    const headers = await getAuthHeaders();
    
    const res = await fetch(`${baseUrl}${path}`, {
      method: 'DELETE',
      headers
    });

    if (!res.ok && res.status !== 204) { // 204 = No Content (sucesso sem corpo)
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `Erro ${res.status}: ${res.statusText}`);
    }

    // DELETE geralmente retorna 204 (sem conteúdo)
    if (res.status === 204) {
      return {} as T;
    }

    return res.json();
  } catch (error: unknown) {
    console.error('Erro na requisição DELETE:', error);
    throw error;
  }
};

// ✅ Para rotas públicas (sem autenticação) - ex: registro
export const postPublic = async <T = unknown>(path: string, data: unknown): Promise<T> => {
  try {
    const res = await fetch(`${baseUrl}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `Erro ${res.status}: ${res.statusText}`);
    }

    return res.json();
  } catch (error: unknown) {
    console.error('Erro na requisição POST pública:', error);
    throw error;
  }
};