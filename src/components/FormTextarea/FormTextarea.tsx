import type { UseFormRegisterReturn } from 'react-hook-form';

interface Props { label: string; registration: UseFormRegisterReturn; error?: any; }

export function FormTextarea({ label, registration, error }: Props) {
  return (
    <div className="flex flex-col gap-1 md:col-span-2">
      <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">{label}</label>
      <textarea
        {...registration}
        rows={3}
        className={`w-full resize-y rounded-xl border px-3 py-2 text-sm outline-none transition
          ${error
            ? 'border-rose-400 ring-2 ring-rose-200 focus:border-rose-500'
            : 'border-slate-300 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20'
          }`}
      />
      {error && <small className="text-xs font-medium text-rose-600">{error.message}</small>}
    </div>
  );
}
