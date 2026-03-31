interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({ eyebrow, title, description, centered = false, className = '' }: SectionHeaderProps) {
  const alignment = centered ? 'text-center mx-auto' : '';

  return (
    <header className={`space-y-2 ${alignment} ${className}`.trim()}>
      {eyebrow && <span className="text-xs font-semibold uppercase tracking-wider text-teal-700">{eyebrow}</span>}
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      {description && <p className="max-w-3xl text-sm text-slate-600 md:text-base">{description}</p>}
    </header>
  );
}
