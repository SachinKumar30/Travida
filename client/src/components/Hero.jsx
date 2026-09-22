import { ArrowRight } from 'lucide-react';

export default function Hero({ data }) {
  if (!data) return null;

  const scrollTo = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden bg-navy-950 pt-24 pb-20 sm:pt-28"
    >
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-green-500/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-navy-500/40 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-x relative z-10">
        <div className="max-w-3xl">
          <span className="section-eyebrow text-green-400">{data.eyebrow}</span>
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {data.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/75 sm:text-xl">{data.subheading}</p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#contact"
              onClick={(e) => scrollTo(e, '#contact')}
              className="btn-primary text-base"
            >
              {data.ctaPrimaryLabel}
              <ArrowRight size={18} />
            </a>
            <a
              href="#process"
              onClick={(e) => scrollTo(e, '#process')}
              className="btn-outline text-base"
            >
              {data.ctaSecondaryLabel}
            </a>
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs font-semibold uppercase tracking-wider text-white/50">
            <span>Aligned with National Logistics Policy</span>
            <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:block" />
            <span>Aligned with PM Gati Shakti</span>
          </div>
        </div>
      </div>
    </section>
  );
}
