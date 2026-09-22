import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { api, setAuthToken, extractErrorMessage } from '../api/client';

const AuthContext = createContext(null);
const TOKEN_KEY = 'travida_admin_token';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [username, setUsername] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    setAuthToken(token);
    if (!token) {
      setUsername(null);
      setChecking(false);
      return;
    }
    let cancelled = false;
    api
      .get('/auth/me')
      .then((res) => {
        if (!cancelled) setUsername(res.data.username);
      })
      .catch(() => {
        if (!cancelled) {
          setToken(null);
          localStorage.removeItem(TOKEN_KEY);
        }
      })
      .finally(() => {
        if (!cancelled) setChecking(false);
      });
    return () => {
      cancelled = true;
    };
  }, [token]);

  const login = useCallback(async (usernameInput, password) => {
    try {
      const res = await api.post('/auth/login', { username: usernameInput, password });
      localStorage.setItem(TOKEN_KEY, res.data.token);
      setToken(res.data.token);
      setUsername(res.data.username);
      return { success: true };
    } catch (err) {
      return { success: false, error: extractErrorMessage(err, 'Invalid credentials') };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUsername(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ token, username, isAuthenticated: !!token, checking, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
