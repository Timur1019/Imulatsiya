import { createI18n } from 'vue-i18n'
import uz from './locales/uz'
import ru from './locales/ru'
import en from './locales/en'

export const LOCALE_STORAGE_KEY = 'imulatsiya-locale'
export const DEFAULT_LOCALE = 'uz'
export const SUPPORTED_LOCALES = ['uz', 'ru', 'en']

export const LOCALE_INTL_MAP = {
  uz: 'uz-UZ',
  ru: 'ru-RU',
  en: 'en-US'
}

function readStoredLocale() {
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY)
  return SUPPORTED_LOCALES.includes(stored) ? stored : DEFAULT_LOCALE
}

export const i18n = createI18n({
  legacy: false,
  locale: readStoredLocale(),
  fallbackLocale: 'ru',
  messages: { uz, ru, en }
})

export function setDocumentLocale(locale) {
  document.documentElement.lang = locale
  document.title = i18n.global.t('app.title')
}

setDocumentLocale(i18n.global.locale.value)
