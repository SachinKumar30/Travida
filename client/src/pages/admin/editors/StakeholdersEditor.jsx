import { Plus } from 'lucide-react';
import { useSectionDraft, EditorShell, Field } from '../editorShell';
import ArrayItemCard, { moveItem } from '../ArrayItemCard';

const BLANK_TAB = { key: '', label: '', heading: '', points: [] };

export default function StakeholdersEditor() {
  const { draft, setDraft, save, saving, savedTick, error } = useSectionDraft('stakeholders');
  const tabs = draft || [];

  const setTab = (idx, key) => (e) => {
    const next = [...tabs];
    next[idx] = { ...next[idx], [key]: e.target.value };
    setDraft(next);
  };
  const setPoints = (idx) => (e) => {
    const next = [...tabs];
    next[idx] = {
      ...next[idx],
      points: e.target.value.split('\n'),
    };
    setDraft(next);
  };
  const addTab = () =>
    setDraft([...tabs, { ...BLANK_TAB, key: `tab-${Date.now().toString(36)}` }]);
  const removeTab = (idx) => setDraft(tabs.filter((_, i) => i !== idx));
  const move = (idx, dir) => setDraft(moveItem(tabs, idx, idx + dir));

  return (
    <EditorShell
      title="Stakeholder Tabs"
      description="Tabbed content for Corporates/FMCGs/MSMEs, Developers, and Government."
      draft={draft}
      saving={saving}
      savedTick={savedTick}
      error={error}
      save={save}
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="label mb-0">Tabs</span>
        <button type="button" onClick={addTab} className="btn-outline-dark text-xs">
          <Plus size={14} /> Add Tab
        </button>
      </div>
      <div className="space-y-4">
        {tabs.map((tab, idx) => (
          <ArrayItemCard
            key={tab.key || idx}
            index={idx}
            total={tabs.length}
            label={tab.label || `Tab ${idx + 1}`}
            onRemove={() => removeTab(idx)}
            onMoveUp={() => move(idx, -1)}
            onMoveDown={() => move(idx, 1)}
          >
            <Field label="Tab Label (shown on tab button)">
              <input className="input" value={tab.label} onChange={setTab(idx, 'label')} />
            </Field>
            <Field label="Heading (shown in tab content)">
              <input className="input" value={tab.heading} onChange={setTab(idx, 'heading')} />
            </Field>
            <Field label="Points (one per line)">
              <textarea
                className="input resize-none"
                rows={5}
                value={(tab.points || []).join('\n')}
                onChange={setPoints(idx)}
              />
            </Field>
          </ArrayItemCard>
        ))}
      </div>
    </EditorShell>
  );
}
