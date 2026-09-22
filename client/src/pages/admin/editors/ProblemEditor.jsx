import { Plus } from 'lucide-react';
import { useSectionDraft, EditorShell, Field } from '../editorShell';
import ArrayItemCard, { moveItem } from '../ArrayItemCard';

const BLANK_PROBLEM = { title: '', description: '' };

export default function ProblemEditor() {
  const { draft, setDraft, save, saving, savedTick, error } = useSectionDraft('problem');

  if (!draft) {
    return (
      <EditorShell title="Problem Statement" draft={draft} saving={saving} savedTick={savedTick} error={error} save={save} />
    );
  }

  const set = (key) => (e) => setDraft({ ...draft, [key]: e.target.value });
  const problems = draft.problems || [];

  const setProblem = (idx, key) => (e) => {
    const next = [...problems];
    next[idx] = { ...next[idx], [key]: e.target.value };
    setDraft({ ...draft, problems: next });
  };
  const addProblem = () => setDraft({ ...draft, problems: [...problems, { ...BLANK_PROBLEM }] });
  const removeProblem = (idx) =>
    setDraft({ ...draft, problems: problems.filter((_, i) => i !== idx) });
  const move = (idx, dir) =>
    setDraft({ ...draft, problems: moveItem(problems, idx, idx + dir) });

  return (
    <EditorShell
      title="Problem Statement"
      description="Frame the industry challenge before presenting Travida's solution."
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
        <textarea className="input resize-none" rows={3} value={draft.intro} onChange={set('intro')} />
      </Field>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <span className="label mb-0">Problem Points</span>
          <button type="button" onClick={addProblem} className="btn-outline-dark text-xs">
            <Plus size={14} /> Add Point
          </button>
        </div>
        <div className="space-y-4">
          {problems.map((p, idx) => (
            <ArrayItemCard
              key={idx}
              index={idx}
              total={problems.length}
              onRemove={() => removeProblem(idx)}
              onMoveUp={() => move(idx, -1)}
              onMoveDown={() => move(idx, 1)}
            >
              <Field label="Title">
                <input className="input" value={p.title} onChange={setProblem(idx, 'title')} />
              </Field>
              <Field label="Description">
                <textarea
                  className="input resize-none"
                  rows={2}
                  value={p.description}
                  onChange={setProblem(idx, 'description')}
                />
              </Field>
            </ArrayItemCard>
          ))}
        </div>
      </div>

      <Field label="Solution Title">
        <input className="input" value={draft.solutionTitle} onChange={set('solutionTitle')} />
      </Field>
      <Field label="Solution Text">
        <textarea
          className="input resize-none"
          rows={3}
          value={draft.solutionText}
          onChange={set('solutionText')}
        />
      </Field>
    </EditorShell>
  );
}
