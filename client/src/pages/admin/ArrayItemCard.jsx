import { Trash2, ChevronUp, ChevronDown } from 'lucide-react';

export default function ArrayItemCard({ index, total, onRemove, onMoveUp, onMoveDown, children, label }) {
  return (
    <div className="rounded-lg border border-navy-900/10 bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-navy-900/50">
          {label || `Item ${index + 1}`}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onMoveUp}
            disabled={index === 0}
            className="rounded p-1.5 text-navy-900/50 hover:bg-navy-900/5 disabled:opacity-30"
            aria-label="Move up"
          >
            <ChevronUp size={16} />
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            disabled={index === total - 1}
            className="rounded p-1.5 text-navy-900/50 hover:bg-navy-900/5 disabled:opacity-30"
            aria-label="Move down"
          >
            <ChevronDown size={16} />
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="rounded p-1.5 text-red-500 hover:bg-red-50"
            aria-label="Remove"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

export function moveItem(arr, from, to) {
  const next = [...arr];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}
