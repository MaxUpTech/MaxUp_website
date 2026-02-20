export const locales = ['ar', 'en', 'he'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'ar';
export const localeNames: Record<Locale, string> = { ar: 'العربية', en: 'English', he: 'עברית' };
export const rtlLocales: Locale[] = ['ar', 'he'];
export const isRTL = (locale: Locale) => rtlLocales.includes(locale);
