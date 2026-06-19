import { ref, watch, computed, onUnmounted } from 'vue'

function parseDurationSeconds(ad) {
  const sec = Number(ad?.durationSeconds)
  if (!Number.isFinite(sec)) return 8
  return Math.min(300, Math.max(3, sec))
}

export function useAdRotation(ads) {
  const currentIndex = ref(0)
  const currentAd = ref(null)
  const rotationTick = ref(0)
  const progressPercent = ref(100)

  let switchTimer = null
  let progressTimer = null
  let slideStartedAt = 0
  let slideDurationMs = 8000

  const clearTimers = () => {
    if (switchTimer) {
      clearTimeout(switchTimer)
      switchTimer = null
    }
    if (progressTimer) {
      clearInterval(progressTimer)
      progressTimer = null
    }
  }

  const activeList = computed(() => (ads.value || []).filter(a => a?.active !== false))

  const adsKey = computed(() =>
    activeList.value
      .map(a =>
        [
          a.id ?? '',
          a.sortOrder ?? '',
          a.durationSeconds ?? '',
          a.mediaType ?? '',
          a.mediaUrl ?? '',
          a.title ?? ''
        ].join(':')
      )
      .join('|')
  )

  const startProgress = () => {
    if (progressTimer) clearInterval(progressTimer)
    slideStartedAt = Date.now()
    progressPercent.value = 100

    progressTimer = setInterval(() => {
      const elapsed = Date.now() - slideStartedAt
      const left = Math.max(0, 100 - (elapsed / slideDurationMs) * 100)
      progressPercent.value = left
      if (elapsed >= slideDurationMs && progressTimer) {
        clearInterval(progressTimer)
        progressTimer = null
      }
    }, 200)
  }

  const showCurrent = () => {
    const list = activeList.value
    if (list.length === 0) {
      currentAd.value = null
      progressPercent.value = 0
      return false
    }

    if (currentIndex.value >= list.length) currentIndex.value = 0
    currentAd.value = list[currentIndex.value]
    rotationTick.value += 1
    slideDurationMs = parseDurationSeconds(currentAd.value) * 1000
    startProgress()
    return true
  }

  const scheduleSwitch = () => {
    clearTimers()
    if (!showCurrent()) return

    switchTimer = setTimeout(() => {
      const list = activeList.value
      if (list.length === 0) return

      if (list.length === 1) {
        // один баннер — перезапускаем цикл по durationSeconds
        scheduleSwitch()
        return
      }

      currentIndex.value = (currentIndex.value + 1) % list.length
      scheduleSwitch()
    }, slideDurationMs)
  }

  watch(
    adsKey,
    (newKey, oldKey) => {
      if (newKey === oldKey && currentAd.value) return

      const list = activeList.value
      if (currentAd.value?.id != null) {
        const idx = list.findIndex(a => a.id === currentAd.value.id)
        if (idx >= 0) currentIndex.value = idx
      }

      scheduleSwitch()
    },
    { immediate: true }
  )

  onUnmounted(clearTimers)

  return { currentAd, currentIndex, rotationTick, progressPercent }
}
