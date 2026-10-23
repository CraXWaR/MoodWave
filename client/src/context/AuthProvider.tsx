import React, { useCallback, useEffect, useState } from "react";
import type { UserResponse } from "../types/user.type";
import { AuthContext } from "./auth.context";
import { invalidateCalendarCache } from "../hooks/useGetCalendar";

function readStoredUser(): UserResponse | null {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserResponse | null>(readStoredUser);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

  const isLoggedIn = !!token && !!user;

  useEffect(() => {
    const handleStorage = () => {
      invalidateCalendarCache();
      setToken(localStorage.getItem("token"));
      setUser(readStoredUser());
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const setAuthUser = useCallback(({ token, user }: { token: string; user: UserResponse }) => {
    invalidateCalendarCache();
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(token);
    setUser(user);
  }, []);

  const logout = useCallback(() => {
    invalidateCalendarCache();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, user, setUser, loading: false, setAuthUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
