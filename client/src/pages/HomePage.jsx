import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import Hero from '../components/Hero';
import ProblemStatement from '../components/ProblemStatement';

export default function HomePage() {
  const { content } = useContent();
  useDocumentTitle('Travida Logistics | Grade-A Warehouse Retrofit & Compliance');

  return (
    <div>
      <Hero data={content?.hero} />
      <ProblemStatement data={content?.problem} />

      <section className="bg-navy-950 py-20 sm:py-24">
        <div className="container-x flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-2xl text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            See how Travida turns Grade-B assets into Grade-A infrastructure
          </h2>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link to="/services" className="btn-primary text-base">
              Explore Our Services
              <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="btn-outline text-base">
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
