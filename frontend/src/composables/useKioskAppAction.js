import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { executeAppLink } from '../utils/appLink'
import { translateApiMessage } from '../utils/apiMessage'

export function useKioskAppAction() {
  const { t } = useI18n()
  const toastMessage = ref('')
  const toastError = ref(false)
  let toastTimer = null

  function showToast(message, isError = false) {
    toastMessage.value = message
    toastError.value = isError
    if (toastTimer) clearTimeout(toastTimer)
    toastTimer = setTimeout(() => {
      toastMessage.value = ''
    }, 3000)
  }

  async function openApp(app) {
    try {
      const result = await executeAppLink(app, t)
      if (result.message) {
        showToast(translateApiMessage(result.message, t), !result.ok)
      }
    } catch (err) {
      showToast(err.message || t('errors.execution'), true)
    }
  }

  return { toastMessage, toastError, openApp, showToast }
}
