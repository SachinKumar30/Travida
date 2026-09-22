import { useEffect, useState, useCallback } from 'react';
import { Loader2, Trash2, Mail, MailOpen } from 'lucide-react';
import { api, extractErrorMessage } from '../../api/client';

export default function Submissions() {
  const [items, setItems] = useState(null);
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState(null);

  const load = useCallback(async () => {
    setError('');
    try {
      const res = await api.get('/contact');
      setItems(res.data);
    } catch (err) {
      setError(extractErrorMessage(err, 'Could not load submissions.'));
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const toggleRead = async (item) => {
    setBusyId(item.id);
    try {
      await api.patch(`/contact/${item.id}/read`, { read: !item.read });
      setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, read: !i.read } : i)));
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (item) => {
    if (!confirm(`Delete the submission from ${item.name}?`)) return;
    setBusyId(item.id);
    try {
      await api.delete(`/contact/${item.id}`);
      setItems((prev) => prev.filter((i) => i.id !== item.id));
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-900">Contact Submissions</h1>
        <p className="mt-1 text-sm text-navy-900/60">
          Messages submitted through the website contact form.
        </p>
      </div>

      {error && (
        <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
      )}

      {items === null ? (
        <div className="flex items-center gap-2 text-navy-900/60">
          <Loader2 size={18} className="animate-spin" /> Loading submissions...
        </div>
      ) : items.length === 0 ? (
        <p className="text-navy-900/60">No submissions yet.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className={`rounded-lg border p-5 ${
                item.read ? 'border-navy-900/10 bg-white' : 'border-green-500/30 bg-green-50/40'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-navy-900">{item.name}</p>
                  <p className="text-sm text-navy-900/60">
                    {item.email}
                    {item.company ? ` · ${item.company}` : ''}
                    {item.phone ? ` · ${item.phone}` : ''}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-navy-900/5 px-2.5 py-1 text-xs font-medium text-navy-900/70">
                    {item.inquiryType}
                  </span>
                  <button
                    type="button"
                    disabled={busyId === item.id}
                    onClick={() => toggleRead(item)}
                    className="rounded p-1.5 text-navy-900/50 hover:bg-navy-900/5"
                    aria-label={item.read ? 'Mark as unread' : 'Mark as read'}
                    title={item.read ? 'Mark as unread' : 'Mark as read'}
                  >
                    {item.read ? <MailOpen size={16} /> : <Mail size={16} />}
                  </button>
                  <button
                    type="button"
                    disabled={busyId === item.id}
                    onClick={() => remove(item)}
                    className="rounded p-1.5 text-red-500 hover:bg-red-50"
                    aria-label="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm text-navy-900/80">{item.message}</p>
              <p className="mt-3 text-xs text-navy-900/40">
                {new Date(item.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
