const BASE_URL = "http://localhost:3001";

export const get = async <T = unknown>(path: string): Promise<T> => {
  const res = await fetch(`${BASE_URL}${path}`);
  
  if (!res.ok) {
    throw new Error("Erro ao buscar dados");
  }

  return res.json();
};

export const post = async (path: string, data: unknown) => {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw result;
  }

  return result;
};

export const put = async (path: string, data: unknown) => {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw result;
  }

  return result;
};

export const del = async (path: string) => {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw await res.json();
  }

  return true;
};
