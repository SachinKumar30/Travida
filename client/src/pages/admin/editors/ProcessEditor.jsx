import { Plus } from 'lucide-react';
import { useSectionDraft, EditorShell, Field } from '../editorShell';
import ArrayItemCard, { moveItem } from '../ArrayItemCard';

const BLANK_PHASE = { phase: 'Phase', title: '', points: [] };

export default function ProcessEditor() {
  const { draft, setDraft, save, saving, savedTick, error } = useSectionDraft('process');
  const phases = draft || [];

  const setPhase = (idx, key) => (e) => {
    const next = [...phases];
    next[idx] = { ...next[idx], [key]: e.target.value };
    setDraft(next);
  };
  const setPoints = (idx) => (e) => {
    const next = [...phases];
    next[idx] = { ...next[idx], points: e.target.value.split('\n') };
    setDraft(next);
  };
  const addPhase = () => setDraft([...phases, { ...BLANK_PHASE }]);
  const removePhase = (idx) => setDraft(phases.filter((_, i) => i !== idx));
  const move = (idx, dir) => setDraft(moveItem(phases, idx, idx + dir));

  return (
    <EditorShell
      title="Process Timeline"
      description="The phased retrofit process shown on the Process page."
      draft={draft}
      saving={saving}
      savedTick={savedTick}
      error={error}
      save={save}
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="label mb-0">Phases</span>
        <button type="button" onClick={addPhase} className="btn-outline-dark text-xs">
          <Plus size={14} /> Add Phase
        </button>
      </div>
      <div className="space-y-4">
        {phases.map((p, idx) => (
          <ArrayItemCard
            key={idx}
            index={idx}
            total={phases.length}
            label={p.title || `Phase ${idx + 1}`}
            onRemove={() => removePhase(idx)}
            onMoveUp={() => move(idx, -1)}
            onMoveDown={() => move(idx, 1)}
          >
            <div className="grid gap-4 sm:grid-cols-[140px_1fr]">
              <Field label="Phase Label">
                <input className="input" value={p.phase} onChange={setPhase(idx, 'phase')} />
              </Field>
              <Field label="Title">
                <input className="input" value={p.title} onChange={setPhase(idx, 'title')} />
              </Field>
            </div>
            <Field label="Points (one per line)">
              <textarea
                className="input resize-none"
                rows={4}
                value={(p.points || []).join('\n')}
                onChange={setPoints(idx)}
              />
            </Field>
          </ArrayItemCard>
        ))}
      </div>
    </EditorShell>
  );
}
