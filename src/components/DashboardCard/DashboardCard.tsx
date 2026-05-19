type CardColor = 'teal' | 'cyan' | 'green' | 'emerald' | 'amber' | 'blue';

interface Props {
  title: string;
  value: number;
  icon?: string;
  color?: CardColor;
}

const colorMap: Record<CardColor, { bg: string; text: string; border: string }> = {
  teal:    { bg: 'bg-teal-50',    text: 'text-teal-700',    border: 'border-teal-200' },
  cyan:    { bg: 'bg-cyan-50',    text: 'text-cyan-700',    border: 'border-cyan-200' },
  green:   { bg: 'bg-green-50',   text: 'text-green-700',   border: 'border-green-200' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  amber:   { bg: 'bg-amber-50',   text: 'text-amber-700',   border: 'border-amber-200' },
  blue:    { bg: 'bg-blue-50',    text: 'text-blue-700',    border: 'border-blue-200' },
};

export function DashboardCard({ title, value, icon, color = 'teal' }: Props) {
  const c = colorMap[color];
  return (
    <div className={`flex items-center gap-4 rounded-2xl border ${c.border} ${c.bg} p-4 shadow-sm transition hover:shadow-md`}>
      {icon && (
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
          {icon}
        </span>
      )}
      <div className="min-w-0">
        <p className="truncate text-xs font-medium text-slate-500">{title}</p>
        <p className={`mt-0.5 text-2xl font-bold ${c.text}`}>{value}</p>
      </div>
    </div>
  );
}
