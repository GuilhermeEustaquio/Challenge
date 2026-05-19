/** Strip all non-digit characters */
export function digits(value: string): string {
  return value.replace(/\D/g, '');
}

/** CPF: 000.000.000-00 */
export function maskCpf(value: string): string {
  const d = digits(value).slice(0, 11);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
  if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
}

/** CNPJ: 00.000.000/0000-00 */
export function maskCnpj(value: string): string {
  const d = digits(value).slice(0, 14);
  if (d.length <= 2) return d;
  if (d.length <= 5) return `${d.slice(0, 2)}.${d.slice(2)}`;
  if (d.length <= 8) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5)}`;
  if (d.length <= 12) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8)}`;
  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`;
}

/** CPF or CNPJ — switches automatically based on digit count */
export function maskCpfCnpj(value: string): string {
  const d = digits(value);
  return d.length <= 11 ? maskCpf(d) : maskCnpj(d);
}

/**
 * Phone: (00) 0000-0000 for landlines, (00) 00000-0000 for mobiles.
 * Switches to 9-digit format when the 3rd digit (after DDD) is 9.
 */
export function maskPhone(value: string): string {
  const d = digits(value).slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : '';
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  const isMobile = d.length === 11 || (d.length >= 7 && d[2] === '9');
  if (isMobile) {
    if (d.length <= 11)
      return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  }
  return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
}

/** Validate CPF digit count (11 digits) */
export function isCpfComplete(value: string): boolean {
  return digits(value).length === 11;
}

/** Validate CNPJ digit count (14 digits) */
export function isCnpjComplete(value: string): boolean {
  return digits(value).length === 14;
}

/** Validate CPF or CNPJ digit count */
export function isCpfCnpjComplete(value: string): boolean {
  const len = digits(value).length;
  return len === 11 || len === 14;
}

/** Validate phone digit count (10 landline or 11 mobile) */
export function isPhoneComplete(value: string): boolean {
  const len = digits(value).length;
  return len === 10 || len === 11;
}

/** CEP: 00000-000 */
export function maskCep(value: string): string {
  const d = digits(value).slice(0, 8);
  if (d.length <= 5) return d;
  return `${d.slice(0, 5)}-${d.slice(5)}`;
}

/** Validate CEP digit count (8 digits) */
export function isCepComplete(value: string): boolean {
  return digits(value).length === 8;
}
