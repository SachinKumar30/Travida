import { Plus } from 'lucide-react';
import { useSectionDraft, EditorShell, Field } from '../editorShell';
import ArrayItemCard, { moveItem } from '../ArrayItemCard';
import { ICON_NAMES } from '../../../components/IconMap';

const BLANK_SERVICE = { icon: 'Layers', title: '', description: '' };

export default function ServicesEditor() {
  const { draft, setDraft, save, saving, savedTick, error } = useSectionDraft('services');
  const services = draft || [];

  const setService = (idx, key) => (e) => {
    const next = [...services];
    next[idx] = { ...next[idx], [key]: e.target.value };
    setDraft(next);
  };
  const addService = () => setDraft([...services, { ...BLANK_SERVICE }]);
  const removeService = (idx) => setDraft(services.filter((_, i) => i !== idx));
  const move = (idx, dir) => setDraft(moveItem(services, idx, idx + dir));

  return (
    <EditorShell
      title="Services"
      description="The four core service cards shown on the homepage."
      draft={draft}
      saving={saving}
      savedTick={savedTick}
      error={error}
      save={save}
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="label mb-0">Service Cards</span>
        <button type="button" onClick={addService} className="btn-outline-dark text-xs">
          <Plus size={14} /> Add Service
        </button>
      </div>
      <div className="space-y-4">
        {services.map((s, idx) => (
          <ArrayItemCard
            key={idx}
            index={idx}
            total={services.length}
            label={s.title || `Service ${idx + 1}`}
            onRemove={() => removeService(idx)}
            onMoveUp={() => move(idx, -1)}
            onMoveDown={() => move(idx, 1)}
          >
            <div className="grid gap-4 sm:grid-cols-[140px_1fr]">
              <Field label="Icon">
                <select className="input" value={s.icon} onChange={setService(idx, 'icon')}>
                  {ICON_NAMES.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Title">
                <input className="input" value={s.title} onChange={setService(idx, 'title')} />
              </Field>
            </div>
            <Field label="Description">
              <textarea
                className="input resize-none"
                rows={2}
                value={s.description}
                onChange={setService(idx, 'description')}
              />
            </Field>
          </ArrayItemCard>
        ))}
      </div>
    </EditorShell>
  );
}
