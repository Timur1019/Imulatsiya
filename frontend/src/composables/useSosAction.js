import { ref } from 'vue'
import { triggerSos } from '../api/kioskDeviceApi'

export function useSosAction(onResult) {
  const loading = ref(false)

  async function handleSos() {
    if (loading.value) return
    loading.value = true
    try {
      const data = await triggerSos()
      onResult?.(data?.message || 'SOS сигнал отправлен', false)
    } catch {
      onResult?.('Не удалось отправить SOS', true)
    } finally {
      loading.value = false
    }
  }

  return { loading, handleSos }
}
