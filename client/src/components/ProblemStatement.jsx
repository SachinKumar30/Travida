import { AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function ProblemStatement({ data }) {
  if (!data) return null;

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-x">
        <div className="max-w-2xl">
          <span className="section-eyebrow">The Challenge</span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
            {data.title}
          </h2>
          <p className="mt-5 text-lg text-navy-900/70">{data.intro}</p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {(data.problems || []).map((problem) => (
            <div key={problem.title} className="card border-red-900/10">
              <AlertTriangle className="mb-4 text-navy-900/40" size={28} strokeWidth={1.75} />
              <h3 className="text-lg font-bold text-navy-900">{problem.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-900/65">
                {problem.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl bg-navy-950 p-8 sm:p-10">
          <div className="flex items-start gap-4">
            <CheckCircle2 className="mt-1 shrink-0 text-green-400" size={28} />
            <div>
              <h3 className="text-xl font-bold text-white">{data.solutionTitle}</h3>
              <p className="mt-3 max-w-3xl text-white/75">{data.solutionText}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
