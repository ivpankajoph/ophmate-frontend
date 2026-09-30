const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081/api/ophmart';

export const getGuestId = (): string => {
  if (typeof window === 'undefined') return 'guest_ssr';
  let guestId = localStorage.getItem('ophmart_guest_id');
  if (!guestId) {
    guestId = `guest_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem('ophmart_guest_id', guestId);
  }
  return guestId;
};

export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('ophmart_token');
};

export async function fetchApi<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ success: boolean; data?: T; message?: string; code?: string; pagination?: any }> {
  const token = getAuthToken();
  const guestId = getGuestId();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'x-guest-id': guestId,
    ...(options.headers as Record<string, string>)
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

  try {
    const res = await fetch(url, {
      ...options,
      headers
    });

    if (!res.ok) {
      let errorMsg = `HTTP ${res.status}: ${res.statusText}`;
      try {
        const errorJson = await res.json();
        if (errorJson?.message) errorMsg = errorJson.message;
      } catch {
        // Response was not JSON
      }
      return {
        success: false,
        message: errorMsg
      };
    }

    const result = await res.json();
    return result;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[API] ${endpoint} request failed:`, (error as Error).message || error);
    }
    return {
      success: false,
      message: (error as Error).message || 'Network request failed'
    };
  }
}
