import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { LOCALE_STORAGE_KEY, setDocumentLocale } from '../i18n'

export function useLocale() {
  const { locale } = useI18n()

  function setLocale(code) {
    locale.value = code
    localStorage.setItem(LOCALE_STORAGE_KEY, code)
    setDocumentLocale(code)
  }

  watch(
    locale,
    (value) => {
      localStorage.setItem(LOCALE_STORAGE_KEY, value)
      setDocumentLocale(value)
    },
    { immediate: true }
  )

  return { locale, setLocale }
}
