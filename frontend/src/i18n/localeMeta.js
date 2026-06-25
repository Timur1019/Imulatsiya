export const LOCALE_META = {
  uz: { flag: '🇺🇿', labelKey: 'lang.uz' },
  ru: { flag: '🇷🇺', labelKey: 'lang.ru' },
  en: { flag: '🇬🇧', labelKey: 'lang.en' }
}

export function getLocaleMeta(code) {
  return LOCALE_META[code] || LOCALE_META.uz
}
