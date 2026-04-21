export const API_BASE = import.meta.env.PROD
  ? import.meta.env.VITE_API_BASE || "https://smartnestback.onrender.com"
  : "http://localhost:3001";

export const AUTH_STORAGE_KEY = "smartnest-auth-token";

export function getStoredAuthToken() {
  return localStorage.getItem(AUTH_STORAGE_KEY);
}

export function storeAuthToken(token: string) {
  localStorage.setItem(AUTH_STORAGE_KEY, token);
}

export function clearStoredAuthToken() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function getAuthHeaders(token = getStoredAuthToken()): Record<string, string> {
  if (!token) {
    return {};
  }

  return {
    Authorization: `Bearer ${token}`,
  };
}
