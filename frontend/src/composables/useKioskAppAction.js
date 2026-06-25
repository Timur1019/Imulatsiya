import { ref } from 'vue'
import { executeAppLink } from '../utils/appLink'

export function useKioskAppAction() {
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
      const result = await executeAppLink(app)
      if (result.message) {
        showToast(result.message, !result.ok)
      }
    } catch (err) {
      showToast(err.message || 'Ошибка выполнения', true)
    }
  }

  return { toastMessage, toastError, openApp, showToast }
}
