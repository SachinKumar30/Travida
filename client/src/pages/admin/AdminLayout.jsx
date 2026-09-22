import { NavLink, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Sparkles,
  AlertOctagon,
  Layers,
  GitBranch,
  Users,
  Award,
  Contact,
  Settings as SettingsIcon,
  Inbox,
  LogOut,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { LogoMark } from '../../components/Logo';

const NAV_ITEMS = [
  { to: '/admin', end: true, label: 'Overview', icon: LayoutDashboard },
  { to: '/admin/hero', label: 'Hero Section', icon: Sparkles },
  { to: '/admin/problem', label: 'Problem Statement', icon: AlertOctagon },
  { to: '/admin/services', label: 'Services', icon: Layers },
  { to: '/admin/process', label: 'Process Timeline', icon: GitBranch },
  { to: '/admin/stakeholders', label: 'Stakeholder Tabs', icon: Users },
  { to: '/admin/why-choose', label: 'Why Choose Travida', icon: Award },
  { to: '/admin/contact-info', label: 'Contact Info', icon: Contact },
  { to: '/admin/submissions', label: 'Submissions', icon: Inbox },
  { to: '/admin/site-settings', label: 'Site Settings', icon: SettingsIcon },
];

export default function AdminLayout() {
  const { username, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#f6f8fc]">
      <div className="flex">
        <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r border-navy-900/10 bg-navy-950 lg:flex">
          <div className="flex h-16 items-center gap-2.5 px-6 text-lg font-extrabold text-white">
            <LogoMark size={30} />
            Travida Admin
          </div>
          <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
            {NAV_ITEMS.map(({ to, end, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-green-500/15 text-green-400'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <Icon size={17} />
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="border-t border-white/10 p-3">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white"
            >
              <ExternalLink size={17} /> View Live Site
            </a>
            <button
              type="button"
              onClick={logout}
              className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white"
            >
              <LogOut size={17} /> Log Out
            </button>
          </div>
        </aside>

        <div className="flex-1 lg:pl-64">
          <header className="flex h-16 items-center justify-between border-b border-navy-900/10 bg-white px-5 lg:hidden">
            <span className="flex items-center gap-2 font-bold text-navy-900">
              <LogoMark size={26} />
              Travida Admin
            </span>
            <button type="button" onClick={logout} className="text-sm font-medium text-navy-900/60">
              Log out
            </button>
          </header>

          <div className="border-b border-navy-900/10 bg-white px-5 py-3 text-right text-xs text-navy-900/50 lg:px-8">
            Signed in as <span className="font-semibold text-navy-900">{username}</span>
          </div>

          <main className="px-5 py-8 pb-24 lg:px-8 lg:pb-8">
            <Outlet />
          </main>

          <nav className="fixed inset-x-0 bottom-0 z-20 flex overflow-x-auto border-t border-navy-900/10 bg-navy-950 lg:hidden">
            {NAV_ITEMS.map(({ to, end, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex shrink-0 flex-col items-center gap-1 px-4 py-2.5 text-[10px] font-medium ${
                    isActive ? 'text-green-400' : 'text-white/60'
                  }`
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
