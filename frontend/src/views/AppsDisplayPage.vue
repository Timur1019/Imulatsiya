<template>
  <div class="apps-display">
    <header class="apps-display__header">
      <h1 class="apps-display__title">Информационный киоск</h1>
      <div class="apps-display__time">{{ currentTime }}</div>
    </header>

    <div v-if="loading" class="apps-display__loading">Загрузка...</div>
    <div v-else-if="apps.length === 0" class="apps-display__empty">
      Нет приложений. Настройте в админке.
    </div>
    <div v-else class="apps-display__grid">
      <AppCard
        v-for="app in apps"
        :key="app.id"
        :name="app.name"
        :icon="getIcon(app)"
        :icon-url="app.iconUrl"
        @click="openApp(app)"
      />
    </div>

    <span class="apps-display__badge">Экран: Большой киоск</span>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { fetchActiveApps } from '../api/displayApi'
import AppCard from '../components/display/AppCard.vue'

const apps = ref([])
const loading = ref(true)
const currentTime = ref('')
let pollTimer = null
let clockTimer = null

function updateClock() {
  currentTime.value = new Date().toLocaleString('ru-RU', {
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit'
  })
}

async function loadApps() {
  try {
    apps.value = await fetchActiveApps()
  } catch {
    /* keep previous */
  } finally {
    loading.value = false
  }
}

function openApp(app) {
  const url = app?.linkUrl
  if (!url) return
  window.open(url, '_blank', 'noopener,noreferrer')
}

function getIcon(app) {
  const icon = app?.iconUrl
  if (!icon) return '📱'
  // if it's emoji/text – show as-is; if it's /uploads/... – still show as text fallback
  return icon.startsWith('/') ? '📱' : icon
}

onMounted(() => {
  updateClock()
  loadApps()
  clockTimer = setInterval(updateClock, 1000)
  pollTimer = setInterval(loadApps, 5000)
})

onUnmounted(() => {
  if (pollTimer) clearInterval(pollTimer)
  if (clockTimer) clearInterval(clockTimer)
})
</script>

<style src="../styles/apps-display.css"></style>
