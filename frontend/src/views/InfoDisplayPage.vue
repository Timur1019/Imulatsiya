<template>
  <div class="info-display">
    <div class="info-display__bus-panel">
      <header class="info-display__header">
        <h1 class="info-display__title">{{ t('display.busSchedule') }}</h1>
        <p class="info-display__subtitle">{{ t('display.busSubtitle') }}</p>
      </header>

      <div v-if="busLoading" class="admin-section__empty" style="color: rgba(255,255,255,0.5)">
        {{ t('common.loading') }}
      </div>
      <BusCard v-for="bus in buses" :key="bus.routeNumber" :bus="bus" />
    </div>

    <div class="info-display__ad-panel">
      <AdCarousel :ads="ads" />
    </div>

    <span class="info-display__badge">{{ t('display.screenInfo') }}</span>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { fetchActiveAds } from '../api/displayApi'
import { useBusStatus } from '../composables/useBusStatus'
import BusCard from '../components/display/BusCard.vue'
import AdCarousel from '../components/display/AdCarousel.vue'

const { t } = useI18n()
const { buses, loading: busLoading } = useBusStatus(2000)
const ads = ref([])
let pollTimer = null

async function loadAds() {
  try {
    ads.value = await fetchActiveAds()
  } catch {
    /* keep previous */
  }
}

onMounted(() => {
  loadAds()
  pollTimer = setInterval(loadAds, 30000)
})

onUnmounted(() => {
  if (pollTimer) clearInterval(pollTimer)
})
</script>

<style src="../styles/info-display.css"></style>
<style src="../styles/admin-section.css"></style>
