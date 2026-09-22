import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function Stakeholders({ data }) {
  const [active, setActive] = useState(0);

  if (!data || data.length === 0) return null;
  const current = data[Math.min(active, data.length - 1)];

  return (
    <section className="bg-[#f6f8fc] py-20 sm:py-28">
      <div className="container-x">
        <div className="max-w-2xl">
          <span className="section-eyebrow">Who We Serve</span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
            Built for Every Stakeholder in the Warehousing Value Chain
          </h2>
        </div>

        <div className="mt-10 flex flex-wrap gap-2 border-b border-navy-900/10">
          {data.map((tab, idx) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActive(idx)}
              className={`rounded-t-lg px-4 py-3 text-sm font-semibold transition-colors sm:px-5 ${
                idx === active
                  ? 'border-b-2 border-green-500 text-navy-900'
                  : 'text-navy-900/50 hover:text-navy-900/80'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h3 className="text-2xl font-extrabold text-navy-900 sm:text-3xl">
              {current.heading}
            </h3>
            <ul className="mt-6 space-y-4">
              {(current.points || []).map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-green-600" size={22} />
                  <span className="text-navy-900/75">{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-navy-950 p-10 text-center sm:p-14">
            <span className="text-6xl font-black text-green-400 sm:text-7xl">
              {String(active + 1).padStart(2, '0')}
            </span>
            <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-white/60">
              {current.label}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
