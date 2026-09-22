import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { api, extractErrorMessage } from '../api/client';

const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/content');
      setContent(res.data);
    } catch (err) {
      setError(extractErrorMessage(err, 'Could not load site content.'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const updateSection = useCallback(async (section, data) => {
    const res = await api.put(`/content/${section}`, data);
    setContent((prev) => ({ ...prev, [section]: res.data }));
    return res.data;
  }, []);

  return (
    <ContentContext.Provider value={{ content, loading, error, refresh, updateSection }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within ContentProvider');
  return ctx;
}
