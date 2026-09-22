import { Plus } from 'lucide-react';
import { useSectionDraft, EditorShell, Field } from '../editorShell';
import ArrayItemCard, { moveItem } from '../ArrayItemCard';

const BLANK_DIFF = { title: '', description: '' };
const BLANK_METRIC = { label: '', value: '' };

export default function WhyChooseEditor() {
  const { draft, setDraft, save, saving, savedTick, error } = useSectionDraft('whyChoose');

  if (!draft) {
    return (
      <EditorShell title="Why Choose Travida" draft={draft} saving={saving} savedTick={savedTick} error={error} save={save} />
    );
  }

  const set = (key) => (e) => setDraft({ ...draft, [key]: e.target.value });
  const differentiators = draft.differentiators || [];
  const metrics = draft.metrics || [];

  const setDiff = (idx, key) => (e) => {
    const next = [...differentiators];
    next[idx] = { ...next[idx], [key]: e.target.value };
    setDraft({ ...draft, differentiators: next });
  };
  const addDiff = () =>
    setDraft({ ...draft, differentiators: [...differentiators, { ...BLANK_DIFF }] });
  const removeDiff = (idx) =>
    setDraft({ ...draft, differentiators: differentiators.filter((_, i) => i !== idx) });
  const moveDiff = (idx, dir) =>
    setDraft({ ...draft, differentiators: moveItem(differentiators, idx, idx + dir) });

  const setMetric = (idx, key) => (e) => {
    const next = [...metrics];
    next[idx] = { ...next[idx], [key]: e.target.value };
    setDraft({ ...draft, metrics: next });
  };
  const addMetric = () => setDraft({ ...draft, metrics: [...metrics, { ...BLANK_METRIC }] });
  const removeMetric = (idx) =>
    setDraft({ ...draft, metrics: metrics.filter((_, i) => i !== idx) });
  const moveMetric = (idx, dir) =>
    setDraft({ ...draft, metrics: moveItem(metrics, idx, idx + dir) });

  return (
    <EditorShell
      title="Why Choose Travida"
      description="Differentiators and trust metrics shown near the bottom of the homepage."
      draft={draft}
      saving={saving}
      savedTick={savedTick}
      error={error}
      save={save}
    >
      <Field label="Section Title">
        <input className="input" value={draft.title} onChange={set('title')} />
      </Field>
      <Field label="Intro Paragraph">
        <textarea className="input resize-none" rows={2} value={draft.intro} onChange={set('intro')} />
      </Field>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <span className="label mb-0">Differentiators</span>
          <button type="button" onClick={addDiff} className="btn-outline-dark text-xs">
            <Plus size={14} /> Add
          </button>
        </div>
        <div className="space-y-4">
          {differentiators.map((d, idx) => (
            <ArrayItemCard
              key={idx}
              index={idx}
              total={differentiators.length}
              label={d.title || `Item ${idx + 1}`}
              onRemove={() => removeDiff(idx)}
              onMoveUp={() => moveDiff(idx, -1)}
              onMoveDown={() => moveDiff(idx, 1)}
            >
              <Field label="Title">
                <input className="input" value={d.title} onChange={setDiff(idx, 'title')} />
              </Field>
              <Field label="Description">
                <textarea
                  className="input resize-none"
                  rows={2}
                  value={d.description}
                  onChange={setDiff(idx, 'description')}
                />
              </Field>
            </ArrayItemCard>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <span className="label mb-0">Metrics</span>
          <button type="button" onClick={addMetric} className="btn-outline-dark text-xs">
            <Plus size={14} /> Add
          </button>
        </div>
        <div className="space-y-4">
          {metrics.map((m, idx) => (
            <ArrayItemCard
              key={idx}
              index={idx}
              total={metrics.length}
              label={m.label || `Metric ${idx + 1}`}
              onRemove={() => removeMetric(idx)}
              onMoveUp={() => moveMetric(idx, -1)}
              onMoveDown={() => moveMetric(idx, 1)}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Value (e.g. 98%)">
                  <input className="input" value={m.value} onChange={setMetric(idx, 'value')} />
                </Field>
                <Field label="Label">
                  <input className="input" value={m.label} onChange={setMetric(idx, 'label')} />
                </Field>
              </div>
            </ArrayItemCard>
          ))}
        </div>
      </div>
    </EditorShell>
  );
}
