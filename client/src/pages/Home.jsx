import { useContent } from '../context/ContentContext';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProblemStatement from '../components/ProblemStatement';
import Services from '../components/Services';
import ProcessTimeline from '../components/ProcessTimeline';
import Stakeholders from '../components/Stakeholders';
import WhyChoose from '../components/WhyChoose';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const { content, loading, error, refresh } = useContent();

  if (loading && !content) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy-950">
        <Loader2 className="animate-spin text-green-400" size={36} />
      </div>
    );
  }

  if (error && !content) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-navy-950 px-6 text-center text-white">
        <p className="text-lg font-semibold">Could not load the site content.</p>
        <p className="text-white/60">{error}</p>
        <button type="button" onClick={refresh} className="btn-primary">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <Navbar siteName={content?.meta?.siteName} />
      <main>
        <Hero data={content?.hero} />
        <ProblemStatement data={content?.problem} />
        <Services data={content?.services} />
        <ProcessTimeline data={content?.process} />
        <Stakeholders data={content?.stakeholders} />
        <WhyChoose data={content?.whyChoose} />
        <ContactSection data={content?.contact} />
      </main>
      <Footer meta={content?.meta} contact={content?.contact} />
    </div>
  );
}
