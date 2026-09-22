import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const NAV_LINKS = [
  { to: '/services', label: 'Services' },
  { to: '/process', label: 'Process' },
  { to: '/who-we-serve', label: 'Who We Serve' },
  { to: '/why-travida', label: 'Why Travida' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar({ siteName }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-navy-950/95 shadow-lg backdrop-blur">
      <nav className="container-x flex h-16 items-center justify-between sm:h-20">
        <Link to="/" onClick={() => setOpen(false)} className="shrink-0">
          <Logo
            siteName={siteName}
            size={36}
            textClassName="text-lg font-extrabold tracking-tight text-white sm:text-xl"
          />
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-green-400 ${
                  isActive ? 'text-green-400' : 'text-white/80'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/contact" className="btn-primary">
            Schedule Consultation
          </Link>
        </div>

        <button
          type="button"
          className="text-white lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle navigation menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-navy-950 px-5 pb-6 pt-2 lg:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-md px-2 py-3 text-sm font-medium ${
                    isActive ? 'text-green-400' : 'text-white/85 hover:bg-white/5'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary mt-3 w-full">
              Schedule Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
