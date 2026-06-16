<template>
  <div class="info-display">
    <div class="info-display__bus-panel">
      <header class="info-display__header">
        <h1 class="info-display__title">Расписание автобусов</h1>
        <p class="info-display__subtitle">Данные обновляются в реальном времени (симуляция)</p>
      </header>

      <div v-if="busLoading" class="admin-section__empty" style="color: rgba(255,255,255,0.5)">
        Загрузка...
      </div>
      <BusCard v-for="bus in buses" :key="bus.routeNumber" :bus="bus" />
    </div>

    <div class="info-display__ad-panel">
      <AdCarousel :ads="ads" />
    </div>

    <span class="info-display__badge">Экран: 32" — Автобусы + Реклама</span>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { fetchActiveAds } from '../api/displayApi'
import { useBusStatus } from '../composables/useBusStatus'
import BusCard from '../components/display/BusCard.vue'
import AdCarousel from '../components/display/AdCarousel.vue'

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
  pollTimer = setInterval(loadAds, 5000)
})

onUnmounted(() => {
  if (pollTimer) clearInterval(pollTimer)
})
</script>

<style src="../styles/info-display.css"></style>
<style src="../styles/admin-section.css"></style>
