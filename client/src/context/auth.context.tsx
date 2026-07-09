import React, { createContext, useContext, useEffect, useState } from "react";
import type { AuthContext, UserResponse } from "../types/user.type";

const AuthContext = createContext<AuthContext | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const isLoggedIn = !!token && !!user;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    const handleStorage = () => {
      const newToken = localStorage.getItem("token");
      const newUser = localStorage.getItem("user");
      setToken(newToken);
      setUser(newUser ? JSON.parse(newUser) : null);
    };

    window.addEventListener("storage", handleStorage);
    setLoading(false);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const setAuthUser = ({
    token,
    user,
  }: {
    token: string;
    user: UserResponse;
  }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, token, user, setUser, loading, setAuthUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
