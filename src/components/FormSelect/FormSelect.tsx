import type { UseFormRegisterReturn } from 'react-hook-form';

interface Option { label: string; value: string; }
interface Props { label: string; registration: UseFormRegisterReturn; options: Option[]; error?: any; disabled?: boolean; }

export function FormSelect({ label, registration, options, error, disabled }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">{label}</label>
      <select
        {...registration}
        disabled={disabled}
        className={`w-full rounded-xl border px-3 py-2 text-sm outline-none transition
          ${disabled
            ? 'cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400'
            : 'border-slate-300 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20'
          }`}
      >
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {error && <small className="text-xs font-medium text-rose-600">{error.message}</small>}
    </div>
  );
}
