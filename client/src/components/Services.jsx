import DynamicIcon from './IconMap';

export default function Services({ data }) {
  if (!data) return null;

  return (
    <section id="services" className="bg-navy-50 bg-[#f6f8fc] py-20 sm:py-28">
      <div className="container-x">
        <div className="max-w-2xl">
          <span className="section-eyebrow">What We Do</span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
            Integrated Solutions Across the Retrofit Lifecycle
          </h2>
          <p className="mt-5 text-lg text-navy-900/70">
            From land title to leasing, Travida manages every step of turning a Grade-B warehouse
            into compliant, revenue-ready infrastructure.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {(data || []).map((service) => (
            <div
              key={service.title}
              className="card flex flex-col bg-white transition-transform hover:-translate-y-1"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-navy-950">
                <DynamicIcon name={service.icon} className="text-green-400" />
              </div>
              <h3 className="text-lg font-bold text-navy-900">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-900/65">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
