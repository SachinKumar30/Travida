import { useState } from 'react';
import { Loader2, KeyRound } from 'lucide-react';
import { useSectionDraft, EditorShell, Field } from '../editorShell';
import { api, extractErrorMessage } from '../../../api/client';

function ChangePasswordCard() {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    if (next.length < 8) {
      setError('New password must be at least 8 characters');
      return;
    }
    if (next !== confirm) {
      setError('New password and confirmation do not match');
      return;
    }
    setLoading(true);
    try {
      await api.post('/auth/change-password', { currentPassword: current, newPassword: next });
      setSuccess(true);
      setCurrent('');
      setNext('');
      setConfirm('');
    } catch (err) {
      setError(extractErrorMessage(err, 'Could not change password.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md rounded-xl border border-navy-900/10 bg-white p-6">
      <div className="mb-4 flex items-center gap-2">
        <KeyRound size={18} className="text-navy-900/60" />
        <h2 className="font-semibold text-navy-900">Change Admin Password</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Current Password">
          <input
            type="password"
            className="input"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            required
          />
        </Field>
        <Field label="New Password">
          <input
            type="password"
            className="input"
            value={next}
            onChange={(e) => setNext(e.target.value)}
            required
            minLength={8}
          />
        </Field>
        <Field label="Confirm New Password">
          <input
            type="password"
            className="input"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            minLength={8}
          />
        </Field>
        {error && <p className="text-sm text-red-600">{error}</p>}
        {success && <p className="text-sm text-green-600">Password updated successfully.</p>}
        <button type="submit" disabled={loading} className="btn-primary">
          {loading && <Loader2 size={16} className="animate-spin" />}
          {loading ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </div>
  );
}

export default function SiteSettingsEditor() {
  const { draft, setDraft, save, saving, savedTick, error } = useSectionDraft('meta');

  const set = (key) => (e) => setDraft({ ...draft, [key]: e.target.value });

  return (
    <div className="space-y-10">
      <EditorShell
        title="Site Settings"
        description="Site name and footer tagline shown across the site."
        draft={draft}
        saving={saving}
        savedTick={savedTick}
        error={error}
        save={save}
      >
        {draft && (
          <>
            <Field label="Site Name">
              <input className="input" value={draft.siteName} onChange={set('siteName')} />
            </Field>
            <Field label="Footer Tagline">
              <input
                className="input"
                value={draft.footerTagline}
                onChange={set('footerTagline')}
              />
            </Field>
          </>
        )}
      </EditorShell>

      <ChangePasswordCard />
    </div>
  );
}
