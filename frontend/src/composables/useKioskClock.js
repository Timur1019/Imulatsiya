import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { LOCALE_INTL_MAP } from '../i18n'

export function useKioskClock() {
  const { locale } = useI18n()
  const currentTime = ref('')
  let clockTimer = null

  function updateClock() {
    const intlLocale = LOCALE_INTL_MAP[locale.value] || LOCALE_INTL_MAP.uz
    currentTime.value = new Date().toLocaleString(intlLocale, {
      weekday: 'long',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  watch(locale, updateClock)

  onMounted(() => {
    updateClock()
    clockTimer = setInterval(updateClock, 1000)
  })

  onUnmounted(() => {
    if (clockTimer) clearInterval(clockTimer)
  })

  return { currentTime }
}
