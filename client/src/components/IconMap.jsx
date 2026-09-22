import {
  Layers,
  Sun,
  ShieldCheck,
  TrendingUp,
  Building2,
  Factory,
  Landmark,
  CheckCircle2,
  FileCheck2,
  FlameKindling,
  Hammer,
  Zap,
} from 'lucide-react';

export const ICONS = {
  Layers,
  Sun,
  ShieldCheck,
  TrendingUp,
  Building2,
  Factory,
  Landmark,
  CheckCircle2,
  FileCheck2,
  FlameKindling,
  Hammer,
  Zap,
};

export const ICON_NAMES = Object.keys(ICONS);

export default function DynamicIcon({ name, className }) {
  const Cmp = ICONS[name] || Layers;
  return <Cmp className={className} />;
}
