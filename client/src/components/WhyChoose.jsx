import { CheckCircle2 } from 'lucide-react';

export default function WhyChoose({ data }) {
  if (!data) return null;

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-x">
        <div className="max-w-2xl">
          <span className="section-eyebrow">Why Travida</span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
            {data.title}
          </h2>
          <p className="mt-5 text-lg text-navy-900/70">{data.intro}</p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {(data.differentiators || []).map((item) => (
            <div key={item.title} className="flex gap-4">
              <CheckCircle2 className="mt-1 shrink-0 text-green-600" size={24} />
              <div>
                <h3 className="text-base font-bold text-navy-900">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-navy-900/65">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {data.metrics && data.metrics.length > 0 && (
          <div className="mt-16 grid grid-cols-2 gap-6 rounded-2xl bg-navy-950 p-8 sm:grid-cols-4 sm:p-10">
            {data.metrics.map((metric) => (
              <div key={metric.label} className="text-center">
                <div className="text-3xl font-extrabold text-green-400 sm:text-4xl">
                  {metric.value}
                </div>
                <div className="mt-2 text-xs font-medium uppercase tracking-wide text-white/60 sm:text-sm">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
