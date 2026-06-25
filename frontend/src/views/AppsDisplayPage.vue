<template>
  <div class="apps-display">
    <DisplayHeader
      :current-time="currentTime"
      :sos-loading="sosLoading"
      @sos="handleSos"
    />

    <div class="apps-display__body">
      <div v-if="loading" class="apps-display__loading">Загрузка...</div>
      <div v-else-if="displayApps.length === 0" class="apps-display__empty">
        Нет приложений. Настройте в админке.
      </div>
      <div v-else class="apps-display__grid">
        <AppCard
          v-for="app in displayApps"
          :key="app.id"
          :name="app.name"
          :icon="getIcon(app)"
          :icon-url="app.iconUrl"
          @click="openApp(app)"
        />
      </div>
    </div>

    <Transition name="apps-display-toast">
      <div
        v-if="toastMessage"
        class="apps-display__toast"
        :class="{ 'apps-display__toast--error': toastError }"
      >
        {{ toastMessage }}
      </div>
    </Transition>

    <DisplayFooter />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { fetchActiveApps } from '../api/displayApi'
import { useKioskAppAction } from '../composables/useKioskAppAction'
import { useKioskClock } from '../composables/useKioskClock'
import { useSosAction } from '../composables/useSosAction'
import AppCard from '../components/display/AppCard.vue'
import DisplayHeader from '../components/display/DisplayHeader.vue'
import DisplayFooter from '../components/display/DisplayFooter.vue'

const apps = ref([])
const loading = ref(true)
const { currentTime } = useKioskClock()
const { toastMessage, toastError, openApp, showToast } = useKioskAppAction()
const { loading: sosLoading, handleSos } = useSosAction(showToast)

const displayApps = computed(() => apps.value.slice(0, 10))

let pollTimer = null

async function loadApps() {
  try {
    apps.value = await fetchActiveApps()
  } catch {
    /* keep previous */
  } finally {
    loading.value = false
  }
}

function getIcon(app) {
  const icon = app?.iconUrl
  if (!icon) return '📱'
  return icon.startsWith('/') ? '📱' : icon
}

onMounted(() => {
  loadApps()
  pollTimer = setInterval(loadApps, 5000)
})

onUnmounted(() => {
  if (pollTimer) clearInterval(pollTimer)
})
</script>

<style src="../styles/apps-display.css"></style>
