import { Plus, Trash2 } from 'lucide-react';
import { useSectionDraft, EditorShell, Field } from '../editorShell';

export default function ContactInfoEditor() {
  const { draft, setDraft, save, saving, savedTick, error } = useSectionDraft('contact');

  if (!draft) {
    return (
      <EditorShell title="Contact Information" draft={draft} saving={saving} savedTick={savedTick} error={error} save={save} />
    );
  }

  const set = (key) => (e) => setDraft({ ...draft, [key]: e.target.value });
  const inquiryTypes = draft.inquiryTypes || [];

  const setType = (idx) => (e) => {
    const next = [...inquiryTypes];
    next[idx] = e.target.value;
    setDraft({ ...draft, inquiryTypes: next });
  };
  const addType = () => setDraft({ ...draft, inquiryTypes: [...inquiryTypes, ''] });
  const removeType = (idx) =>
    setDraft({ ...draft, inquiryTypes: inquiryTypes.filter((_, i) => i !== idx) });

  return (
    <EditorShell
      title="Contact Information"
      description="Shown in the contact section footer and used for the inquiry-type dropdown."
      draft={draft}
      saving={saving}
      savedTick={savedTick}
      error={error}
      save={save}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Email">
          <input className="input" value={draft.email} onChange={set('email')} />
        </Field>
        <Field label="Phone">
          <input className="input" value={draft.phone} onChange={set('phone')} />
        </Field>
      </div>
      <Field label="Address">
        <input className="input" value={draft.address} onChange={set('address')} />
      </Field>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <span className="label mb-0">Inquiry Type Options</span>
          <button type="button" onClick={addType} className="btn-outline-dark text-xs">
            <Plus size={14} /> Add Option
          </button>
        </div>
        <div className="space-y-2">
          {inquiryTypes.map((type, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input className="input" value={type} onChange={setType(idx)} />
              <button
                type="button"
                onClick={() => removeType(idx)}
                className="shrink-0 rounded p-2 text-red-500 hover:bg-red-50"
                aria-label="Remove option"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </EditorShell>
  );
}
