import { Link } from 'react-router-dom';
import { LogoMark } from './Logo';

const FOOTER_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/process', label: 'Process' },
  { to: '/who-we-serve', label: 'Who We Serve' },
  { to: '/why-travida', label: 'Why Travida' },
  { to: '/contact', label: 'Contact' },
];

export default function Footer({ meta, contact }) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 py-10 text-white/60">
      <div className="container-x flex flex-col gap-8 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <LogoMark size={32} />
          <div>
            <p className="text-sm font-bold text-white">
              {meta?.siteName || 'Travida Logistics'}
            </p>
            <p className="mt-1 text-xs">{meta?.footerTagline}</p>
          </div>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-medium sm:justify-end">
          {FOOTER_LINKS.map((link) => (
            <Link key={link.to} to={link.to} className="hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="container-x mt-8 flex flex-col items-center gap-1 text-center text-xs sm:items-end sm:text-right">
        <p>
          &copy; {year} {meta?.siteName || 'Travida Logistics'}. All rights reserved.
        </p>
        {contact?.email && <p>{contact.email}</p>}
      </div>

      <div className="container-x mt-6 border-t border-white/10 pt-4 text-center text-[11px] text-white/35">
        <Link to="/admin/login" className="hover:text-white/60">
          Admin
        </Link>
      </div>
    </footer>
  );
}
