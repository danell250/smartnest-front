import React, { createContext, useContext, useEffect, useState } from "react";
import {
  API_BASE,
  clearStoredAuthToken,
  getAuthHeaders,
  getStoredAuthToken,
  storeAuthToken,
} from "@/lib/api";

export interface AuthUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  createdAt: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  authToken: string | null;
  isLoading: boolean;
  login: (payload: { email: string; password: string }) => Promise<AuthUser>;
  register: (payload: { firstName: string; lastName: string; email: string; password: string }) => Promise<AuthUser>;
  logout: () => Promise<void>;
  updateProfile: (payload: {
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    city: string;
    province: string;
    postalCode: string;
  }) => Promise<AuthUser>;
  refreshUser: () => Promise<AuthUser | null>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

async function parseAuthResponse(response: Response) {
  const data = await response.json().catch(() => null);

  if (!response.ok || !data?.success) {
    throw new Error(data?.error || "Authentication request failed");
  }

  return data;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    const token = getStoredAuthToken();

    if (!token) {
      setAuthToken(null);
      setUser(null);
      setIsLoading(false);
      return null;
    }

    try {
      const response = await fetch(`${API_BASE}/api/auth/me`, {
        headers: {
          ...getAuthHeaders(token),
        },
      });
      const data = await parseAuthResponse(response);
      const currentUser = data.user as AuthUser | null;

      if (!currentUser) {
        clearStoredAuthToken();
        setAuthToken(null);
        setUser(null);
        return null;
      }

      setAuthToken(token);
      setUser(currentUser);
      return currentUser;
    } catch {
      clearStoredAuthToken();
      setAuthToken(null);
      setUser(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async ({ email, password }: { email: string; password: string }) => {
    const response = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await parseAuthResponse(response);

    storeAuthToken(data.token);
    setAuthToken(data.token);
    setUser(data.user);
    return data.user as AuthUser;
  };

  const register = async ({
    firstName,
    lastName,
    email,
    password,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    const response = await fetch(`${API_BASE}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });
    const data = await parseAuthResponse(response);

    storeAuthToken(data.token);
    setAuthToken(data.token);
    setUser(data.user);
    return data.user as AuthUser;
  };

  const logout = async () => {
    const token = authToken || getStoredAuthToken();

    if (token) {
      await fetch(`${API_BASE}/api/auth/logout`, {
        method: "POST",
        headers: {
          ...getAuthHeaders(token),
        },
      }).catch(() => null);
    }

    clearStoredAuthToken();
    setAuthToken(null);
    setUser(null);
  };

  const updateProfile = async (payload: {
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    city: string;
    province: string;
    postalCode: string;
  }) => {
    const token = authToken || getStoredAuthToken();

    if (!token) {
      throw new Error("You need to sign in before updating your profile");
    }

    const response = await fetch(`${API_BASE}/api/auth/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(token),
      },
      body: JSON.stringify(payload),
    });
    const data = await parseAuthResponse(response);

    setUser(data.user);
    return data.user as AuthUser;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authToken,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
