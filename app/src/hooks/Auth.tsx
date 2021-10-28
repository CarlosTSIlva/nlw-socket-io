import React, { createContext, useContext, useState, useEffect } from "react";
import * as AuthSession from "expo-auth-session";
import { api } from "../service/api";
import AsyncStprage from "@react-native-async-storage/async-storage";

interface User {
  id: string;
  name: string;
  avatar_url: string;
  login: string;
}

interface AuthContextData {
  user: User | null;
  isSigningIng: boolean;
  sigIn: () => Promise<void>;
  sigOut: () => Promise<void>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthResponse {
  token: string;
  user: User;
}

interface AuthorizationResponse {
  params: {
    code?: string;
    error?: string;
  };
  type?: string;
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [isSigningIng, setIsSigningIng] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const CLIENTE_ID = "3a3e8ced3bafccbca180";
  const SCOOPE = "read:user";
  const USER_STORAGE = "@nlwheat:user";
  const TOKEN_STORAGE = "@nlwheat:token";

  async function sigIn() {
    try {
      setIsSigningIng(true);
      const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENTE_ID}&scope=${SCOOPE}`;
      const authSessionResponse = (await AuthSession.startAsync({
        authUrl,
      })) as AuthorizationResponse;

      if (
        authSessionResponse.type === "success" &&
        authSessionResponse.params.error !== "access_denied"
      ) {
        const authResponse = await api.post("/authenticate", {
          code: authSessionResponse.params.code,
        });

        const { token, user } = authResponse.data as AuthResponse;
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        await AsyncStprage.setItem(USER_STORAGE, JSON.stringify(user));
        await AsyncStprage.setItem(TOKEN_STORAGE, token);

        setUser(user);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsSigningIng(false);
    }
  }

  async function sigOut() {
    setUser(null);
    await AsyncStprage.removeItem(USER_STORAGE);
    await AsyncStprage.removeItem(TOKEN_STORAGE);
  }

  useEffect(() => {
    async function loadStorageData() {
      const user = await AsyncStprage.getItem(USER_STORAGE);
      const token = await AsyncStprage.getItem(TOKEN_STORAGE);

      if (user && token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setUser(JSON.parse(user));
      }
      setIsSigningIng(false);
    }
    loadStorageData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isSigningIng, sigIn, sigOut }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
