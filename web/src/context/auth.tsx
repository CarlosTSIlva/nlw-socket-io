import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

interface User {
  id: string;
  avatar_url: string;
  name: string;
  login: string;
}

interface AuthContextData {
  user: User | null;
  sigInUrl: string;
  sigOut: () => void;
}

interface AuthProvider {
  children: ReactNode;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
  };
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProvider) {
  const [user, setUser] = useState<User | null>(null);

  const sigInUrl = `https://github.com/login/oauth/authorize?client_id=9c947bb38dc791d04f01`;

  const signIn = async (githubCode: string) => {
    const response = await api.post<AuthResponse>(`authenticate`, {
      code: githubCode,
    });

    const { token, user } = response.data;
    localStorage.setItem("@duewhile:token", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    setUser(user);
  };

  const sigOut = () => {
    setUser(null);
    localStorage.removeItem("@duewhile:token");
  };

  useEffect(() => {
    const token = localStorage.getItem("@duewhile:token");

    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      api.get<User>("profile").then((response) => {
        setUser(response.data);
      });
    }
  }, []);

  useEffect(() => {
    const url = window.location.href;
    const haGithubCode = url.includes("?code=");
    if (haGithubCode) {
      const [urlWinthout, code] = url.split("?code=");
      signIn(code);
      window.history.pushState({}, "", urlWinthout);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ sigInUrl, user, sigOut }}>
      {children}
    </AuthContext.Provider>
  );
}
