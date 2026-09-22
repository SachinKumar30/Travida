import { CheckCircle2 } from 'lucide-react';

export default function ProcessTimeline({ data }) {
  if (!data) return null;

  return (
    <section className="bg-navy-950 py-20 sm:py-28">
      <div className="container-x">
        <div className="max-w-2xl">
          <span className="section-eyebrow text-green-400">Our Process</span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            A Structured, Four-Phase Approach
          </h2>
          <p className="mt-5 text-lg text-white/70">
            Every engagement follows a phased methodology so owners and occupiers always know
            what stage a property is at, and what compliance milestones remain.
          </p>
        </div>

        <ol className="relative mt-16 space-y-8 border-l border-white/15 pl-8 sm:pl-10">
          {(data || []).map((phase, idx) => (
            <li key={phase.phase} className="relative">
              <span className="absolute -left-[2.55rem] top-0 flex h-9 w-9 items-center justify-center rounded-full border-2 border-green-500 bg-navy-950 text-sm font-bold text-green-400 sm:-left-[3.05rem] sm:h-10 sm:w-10">
                {idx + 1}
              </span>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                <span className="text-xs font-bold uppercase tracking-widest text-green-400">
                  {phase.phase}
                </span>
                <h3 className="mt-2 text-xl font-bold text-white">{phase.title}</h3>
                <ul className="mt-3 space-y-2">
                  {(phase.points || []).map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-white/65">
                      <CheckCircle2 className="mt-0.5 shrink-0 text-green-500" size={16} />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
