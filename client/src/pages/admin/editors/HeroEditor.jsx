import { useSectionDraft, EditorShell, Field } from '../editorShell';

export default function HeroEditor() {
  const { draft, setDraft, save, saving, savedTick, error } = useSectionDraft('hero');

  const set = (key) => (e) => setDraft({ ...draft, [key]: e.target.value });

  return (
    <EditorShell
      title="Hero Section"
      description="The first thing visitors see. Keep the headline sharp and outcome-focused."
      draft={draft}
      saving={saving}
      savedTick={savedTick}
      error={error}
      save={save}
    >
      {draft && (
        <>
          <Field label="Eyebrow (small label above headline)">
            <input className="input" value={draft.eyebrow} onChange={set('eyebrow')} />
          </Field>
          <Field label="Headline">
            <textarea
              className="input resize-none"
              rows={2}
              value={draft.headline}
              onChange={set('headline')}
            />
          </Field>
          <Field label="Subheading">
            <textarea
              className="input resize-none"
              rows={2}
              value={draft.subheading}
              onChange={set('subheading')}
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Primary CTA label">
              <input
                className="input"
                value={draft.ctaPrimaryLabel}
                onChange={set('ctaPrimaryLabel')}
              />
            </Field>
            <Field label="Secondary CTA label">
              <input
                className="input"
                value={draft.ctaSecondaryLabel}
                onChange={set('ctaSecondaryLabel')}
              />
            </Field>
          </div>
        </>
      )}
    </EditorShell>
  );
}
