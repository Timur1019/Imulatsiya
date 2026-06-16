import { ref, onMounted, onUnmounted } from 'vue'
import { fetchBusStatus } from '../api/displayApi'

export function useBusStatus(pollIntervalMs = 2000) {
  const buses = ref([])
  const loading = ref(true)
  const error = ref(null)
  let timer = null

  const load = async () => {
    try {
      buses.value = await fetchBusStatus()
      error.value = null
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    load()
    timer = setInterval(load, pollIntervalMs)
  })

  onUnmounted(() => {
    if (timer) clearInterval(timer)
  })

  return { buses, loading, error, reload: load }
}
