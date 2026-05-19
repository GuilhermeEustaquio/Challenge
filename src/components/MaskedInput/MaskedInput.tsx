import { Controller, type Control, type RegisterOptions } from 'react-hook-form';

interface Props {
  label: string;
  name: string;
  control: Control<any>;
  mask: (value: string) => string;
  rules?: RegisterOptions;
  error?: any;
  disabled?: boolean;
  placeholder?: string;
}

export function MaskedInput({ label, name, control, mask, rules, error, disabled, placeholder }: Props) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">{label}</label>
          <input
            value={mask(field.value ?? '')}
            onChange={(e) => field.onChange(mask(e.target.value))}
            onBlur={field.onBlur}
            disabled={disabled}
            placeholder={placeholder}
            inputMode="numeric"
            className={`w-full rounded-xl border px-3 py-2 text-sm outline-none transition
              ${disabled
                ? 'cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400'
                : error
                  ? 'border-rose-400 bg-white ring-2 ring-rose-200 focus:border-rose-500'
                  : 'border-slate-300 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20'
              }`}
          />
          {error && (
            <small className="text-xs font-medium text-rose-600">{error.message}</small>
          )}
        </div>
      )}
    />
  );
}
