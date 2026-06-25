import { ref, onMounted, onUnmounted } from 'vue'

export function useKioskClock() {
  const currentTime = ref('')
  let clockTimer = null

  function updateClock() {
    currentTime.value = new Date().toLocaleString('ru-RU', {
      weekday: 'long',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  onMounted(() => {
    updateClock()
    clockTimer = setInterval(updateClock, 1000)
  })

  onUnmounted(() => {
    if (clockTimer) clearInterval(clockTimer)
  })

  return { currentTime }
}
