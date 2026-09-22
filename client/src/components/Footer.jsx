import { Link } from 'react-router-dom';
import { LogoMark } from './Logo';

export default function Footer({ meta, contact }) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 py-10 text-white/60">
      <div className="container-x flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <LogoMark size={32} />
          <div>
            <p className="text-sm font-bold text-white">
              {meta?.siteName || 'Travida Logistics'}
            </p>
            <p className="mt-1 text-xs">{meta?.footerTagline}</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1 text-xs sm:items-end">
          <p>
            &copy; {year} {meta?.siteName || 'Travida Logistics'}. All rights reserved.
          </p>
          {contact?.email && <p>{contact.email}</p>}
        </div>
      </div>
      <div className="container-x mt-6 border-t border-white/10 pt-4 text-center text-[11px] text-white/35">
        <Link to="/admin/login" className="hover:text-white/60">
          Admin
        </Link>
      </div>
    </footer>
  );
}
