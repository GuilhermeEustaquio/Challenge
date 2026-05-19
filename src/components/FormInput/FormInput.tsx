import type { UseFormRegisterReturn } from 'react-hook-form';

interface Props {
  label: string;
  type?: string;
  registration: UseFormRegisterReturn;
  error?: any;
  disabled?: boolean;
  placeholder?: string;
}

export function FormInput({ label, type = 'text', registration, error, disabled, placeholder }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">{label}</label>
      <input
        type={type}
        {...registration}
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full rounded-xl border px-3 py-2 text-sm outline-none transition
          ${disabled
            ? 'cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400'
            : error
              ? 'border-rose-400 bg-white ring-2 ring-rose-200 focus:border-rose-500'
              : 'border-slate-300 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20'
          }`}
      />
      {error && <small className="text-xs font-medium text-rose-600">{error.message}</small>}
    </div>
  );
}
