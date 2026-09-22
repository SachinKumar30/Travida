export function LogoMark({ size = 36, className = '' }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-md bg-white ${className}`}
      style={{ width: size, height: size }}
    >
      <img src="/logo-mark.png" alt="" className="h-full w-full object-cover" />
    </span>
  );
}

export default function Logo({ siteName, size = 36, textClassName = '', className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark size={size} />
      <span className={textClassName}>{siteName || 'Travida Logistics'}</span>
    </span>
  );
}
