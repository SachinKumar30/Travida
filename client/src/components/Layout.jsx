import { Outlet } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

export default function Layout() {
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
      <ScrollToTop />
      <Navbar siteName={content?.meta?.siteName} />
      <main>
        <Outlet />
      </main>
      <Footer meta={content?.meta} contact={content?.contact} />
    </div>
  );
}
