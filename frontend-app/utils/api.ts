// utils/api.ts
export interface ApiOptions extends RequestInit {
  body?: any; 
  token?: string; 
}

export async function api<T = any>(
  url: string,
  { method = 'GET', body, token, headers = {}, ...options }: ApiOptions = {}
): Promise<T> {
  try {
    const apiUrl = `http://localhost:8080/${url}`;
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    const res = await fetch(apiUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    });

    const data = await res.json();

    if (!res.ok || res.status !== 200) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (err: any) {
    console.error('API Error:', err);
    throw err;
  }
}
