interface TabItem { key: string; label: string; }
interface Props { tabs: TabItem[]; active: string; onChange: (key: string) => void; }

export function CrudTabs({ tabs, active, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
      {tabs.map((t) => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
            active === t.key
              ? 'bg-primary text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
