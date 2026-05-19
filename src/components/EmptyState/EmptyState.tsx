export function EmptyState({ message = 'Nenhum registro encontrado.' }: { message?: string }) {
  return <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">{message}</p>;
}
