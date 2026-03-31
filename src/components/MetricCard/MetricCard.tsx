interface MetricCardProps {
  value: string;
  label: string;
  className?: string;
}

export function MetricCard({ value, label, className = '' }: MetricCardProps) {
  return (
    <article className={`rounded-2xl border border-primary/20 bg-gradient-to-b from-white to-brand-50 p-5 text-center shadow-sm transition hover:shadow-md hover:border-primary/40 ${className}`.trim()}>
      <strong className="text-3xl font-extrabold text-primary">{value}</strong>
      <span className="mt-1 block text-sm text-slate-600">{label}</span>
    </article>
  );
}
