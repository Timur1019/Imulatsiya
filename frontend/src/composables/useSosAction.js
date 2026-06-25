import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { triggerSos } from '../api/kioskDeviceApi'
import { translateApiMessage } from '../utils/apiMessage'

export function useSosAction(onResult) {
  const { t } = useI18n()
  const loading = ref(false)

  async function handleSos() {
    if (loading.value) return
    loading.value = true
    try {
      const data = await triggerSos()
      onResult?.(translateApiMessage(data?.message, t) || t('api.sosSent'), false)
    } catch {
      onResult?.(t('errors.sosFailed'), true)
    } finally {
      loading.value = false
    }
  }

  return { loading, handleSos }
}
