import { useEffect, useState } from 'react';
import { Loader2, Save, CheckCircle2 } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { extractErrorMessage } from '../../api/client';

export function useSectionDraft(section) {
  const { content, updateSection } = useContent();
  const [draft, setDraft] = useState(content?.[section] ?? null);
  const [saving, setSaving] = useState(false);
  const [savedTick, setSavedTick] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    setDraft(content?.[section] ?? null);
  }, [content, section]);

  const save = async () => {
    setSaving(true);
    setError('');
    try {
      await updateSection(section, draft);
      setSavedTick((t) => t + 1);
    } catch (err) {
      setError(extractErrorMessage(err, 'Could not save changes.'));
    } finally {
      setSaving(false);
    }
  };

  return { draft, setDraft, save, saving, savedTick, error };
}

export function EditorShell({ title, description, draft, saving, savedTick, error, save, children }) {
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    if (savedTick === 0) return;
    setShowSaved(true);
    const t = setTimeout(() => setShowSaved(false), 2500);
    return () => clearTimeout(t);
  }, [savedTick]);

  if (!draft) {
    return (
      <div className="flex items-center gap-2 text-navy-900/60">
        <Loader2 size={18} className="animate-spin" /> Loading section...
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">{title}</h1>
          {description && <p className="mt-1 text-sm text-navy-900/60">{description}</p>}
        </div>
        <div className="flex items-center gap-3">
          {showSaved && (
            <span className="flex items-center gap-1.5 text-sm font-medium text-green-600">
              <CheckCircle2 size={16} /> Saved
            </span>
          )}
          <button type="button" onClick={save} disabled={saving} className="btn-primary">
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
      {error && (
        <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
      )}
      <div className="space-y-6">{children}</div>
    </div>
  );
}

export function Field({ label, children }) {
  return (
    <div>
      <label className="label">{label}</label>
      {children}
    </div>
  );
}
