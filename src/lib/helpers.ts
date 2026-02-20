type LocalizedField = { ar: string; en: string; he: string };
type LocalizedArray = { ar: string[]; en: string[]; he: string[] };

export function getLocalizedField(field: LocalizedField, locale: string): string {
  const val = (field as Record<string, string>)[locale];
  if (val) return val;
  return field.en || field.ar;
}

export function getLocalizedArray(field: LocalizedArray, locale: string): string[] {
  const val = (field as Record<string, string[]>)[locale];
  if (val?.length) return val;
  return field.en?.length ? field.en : field.ar;
}
