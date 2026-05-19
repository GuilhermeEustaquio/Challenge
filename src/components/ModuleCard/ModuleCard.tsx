interface Props { title: string; description: string; onAccess: () => void; }
export function ModuleCard({ title, description, onAccess }: Props) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h3 className="text-lg font-bold text-slate-900">{title}</h3><p className="mt-2 text-sm text-slate-600">{description}</p><button onClick={onAccess} className="mt-4 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white">Acessar módulo</button></div>;
}
