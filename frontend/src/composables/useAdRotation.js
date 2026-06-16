import { ref, watch, computed, onUnmounted } from 'vue'

export function useAdRotation(ads) {
  const currentIndex = ref(0)
  const currentAd = ref(null)
  let timer = null

  const clearTimer = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  const activeList = computed(() => (ads.value || []).filter(a => a.active))

  const adsKey = computed(() => {
    // stable key: if backend polling returns identical list, rotation must NOT reset
    return activeList.value
      .map(a => `${a.id ?? ''}:${a.sortOrder ?? ''}:${a.durationSeconds ?? ''}:${a.mediaType ?? ''}:${a.mediaUrl ?? ''}:${a.title ?? ''}`)
      .join('|')
  })

  const scheduleNext = () => {
    clearTimer()
    const list = activeList.value
    if (list.length === 0) {
      currentAd.value = null
      return
    }
    if (currentIndex.value >= list.length) currentIndex.value = 0
    currentAd.value = list[currentIndex.value]
    const duration = (currentAd.value.durationSeconds || 8) * 1000
    timer = setTimeout(() => {
      currentIndex.value = (currentIndex.value + 1) % list.length
      scheduleNext()
    }, duration)
  }

  watch(adsKey, () => {
    // preserve current ad on list refresh (polling) if still exists
    const list = activeList.value
    if (currentAd.value?.id != null) {
      const idx = list.findIndex(a => a.id === currentAd.value.id)
      if (idx >= 0) currentIndex.value = idx
    }
    scheduleNext()
  }, { immediate: true })

  onUnmounted(clearTimer)

  return { currentAd, currentIndex }
}
