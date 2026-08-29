import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getAccessToken, clearTokens } from "../api/client";
import { getMe } from "../api/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadMe = useCallback(async () => {
    if (!getAccessToken()) {
      setUser(null);
      setProfile(null);
      setLoading(false);
      return;
    }
    try {
      const data = await getMe();
      setUser(data.user);
      setProfile(data.profile);
    } catch (err) {
      setUser(null);
      setProfile(null);
      clearTokens();
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMe();
  }, [loadMe]);

  const value = {
    user,
    profile,
    loading,
    isAuthenticated: !!user,
    setUser,
    setProfile,
    refresh: loadMe,
    signOut: () => {
      clearTokens();
      setUser(null);
      setProfile(null);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
