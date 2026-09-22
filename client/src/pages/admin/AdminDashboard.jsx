import { Link } from 'react-router-dom';
import {
  Sparkles,
  AlertOctagon,
  Layers,
  GitBranch,
  Users,
  Award,
  Contact,
  Settings as SettingsIcon,
} from 'lucide-react';

const CARDS = [
  { to: '/admin/hero', label: 'Hero Section', icon: Sparkles, desc: 'Headline, subheading & CTAs' },
  { to: '/admin/problem', label: 'Problem Statement', icon: AlertOctagon, desc: 'Industry challenge & solution' },
  { to: '/admin/services', label: 'Services', icon: Layers, desc: 'Four homepage service cards' },
  { to: '/admin/process', label: 'Process Timeline', icon: GitBranch, desc: 'Phase I–IV retrofit program' },
  { to: '/admin/stakeholders', label: 'Stakeholder Tabs', icon: Users, desc: 'Occupiers, developers, government' },
  { to: '/admin/why-choose', label: 'Why Choose Travida', icon: Award, desc: 'Differentiators & metrics' },
  { to: '/admin/contact-info', label: 'Contact Info', icon: Contact, desc: 'Email, phone, inquiry types' },
  { to: '/admin/site-settings', label: 'Site Settings', icon: SettingsIcon, desc: 'Site name & footer tagline' },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-900">Welcome back</h1>
      <p className="mt-1 text-sm text-navy-900/60">
        Every section of the homepage is editable here. Changes go live immediately after saving.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map(({ to, label, icon: Icon, desc }) => (
          <Link
            key={to}
            to={to}
            className="card flex items-start gap-4 bg-white hover:border-green-500/40"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-950">
              <Icon size={18} className="text-green-400" />
            </span>
            <div>
              <p className="font-semibold text-navy-900">{label}</p>
              <p className="mt-1 text-sm text-navy-900/55">{desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
