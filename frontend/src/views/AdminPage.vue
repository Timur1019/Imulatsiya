<template>
  <div class="admin-page">
    <div class="admin-page__header">
      <h1 class="admin-page__title">Админ-панель</h1>
      <router-link to="/" class="admin-page__back">← На главную</router-link>
    </div>

    <div v-if="error" class="admin-page__alert admin-page__alert--error">{{ error }}</div>
    <div v-if="successMessage" class="admin-page__alert admin-page__alert--success">
      {{ successMessage }}
    </div>

    <div class="admin-page__actions">
      <button
        class="admin-page__publish-btn"
        :disabled="publishing || loading"
        @click="handlePublish"
      >
        {{ publishing ? 'Публикация...' : '🚀 Опубликовать на экраны' }}
      </button>
    </div>

    <div v-if="loading" class="admin-section__empty">Загрузка...</div>

    <div v-else class="admin-page__sections">
      <section class="admin-section">
        <div class="admin-section__header">
          <h2 class="admin-section__title">Приложения киоска</h2>
          <button class="admin-section__add-btn" @click="addApp">+ Добавить</button>
        </div>
        <div class="admin-section__list">
          <AppItemForm
            v-for="(app, idx) in apps"
            :key="app._key || app.id || idx"
            :item="app"
            @remove="removeApp(idx)"
          />
          <div v-if="apps.length === 0" class="admin-section__empty">
            Нет приложений. Добавьте хотя бы одно.
          </div>
        </div>
      </section>

      <section class="admin-section">
        <div class="admin-section__header">
          <h2 class="admin-section__title">Рекламные баннеры</h2>
          <button class="admin-section__add-btn" @click="addAd">+ Добавить</button>
        </div>
        <div class="admin-section__list">
          <AdItemForm
            v-for="(ad, idx) in ads"
            :key="ad._key || ad.id || idx"
            :item="ad"
            @remove="removeAd(idx)"
          />
          <div v-if="ads.length === 0" class="admin-section__empty">
            Нет рекламы. Добавьте баннеры для ротации.
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAdminConfig } from '../composables/useAdminConfig'
import { publishDisplayConfig } from '../api/displayApi'
import AppItemForm from '../components/admin/AppItemForm.vue'
import AdItemForm from '../components/admin/AdItemForm.vue'

const { apps, ads, loading, error, successMessage, showSuccess } = useAdminConfig()
const publishing = ref(false)
let keyCounter = 0

function addApp() {
  apps.value.push({
    _key: `new-app-${++keyCounter}`,
    name: 'Новое приложение',
    iconUrl: '📱',
    linkUrl: '',
    sortOrder: apps.value.length + 1,
    active: true
  })
}

function removeApp(idx) {
  apps.value.splice(idx, 1)
}

function addAd() {
  ads.value.push({
    _key: `new-ad-${++keyCounter}`,
    title: 'Новая реклама',
    mediaType: 'IMAGE',
    mediaUrl: '',
    backgroundColor: '#1e3a5f',
    durationSeconds: 10,
    sortOrder: ads.value.length + 1,
    active: true
  })
}

function removeAd(idx) {
  ads.value.splice(idx, 1)
}

async function handlePublish() {
  publishing.value = true
  error.value = null
  try {
    const invalidAd = ads.value.find(
      ad => ad.active !== false && !((ad.mediaUrl || '').trim())
    )
    if (invalidAd) {
      throw new Error(`У баннера «${invalidAd.title}» нет файла или ссылки. Сначала загрузите медиа.`)
    }

    const payload = {
      apps: apps.value.map(({ _key, ...rest }) => ({
        ...rest,
        sortOrder: rest.sortOrder || 1,
        active: rest.active !== false
      })),
      ads: ads.value.map(({ _key, ...rest }) => ({
        ...rest,
        mediaType: rest.mediaType || 'IMAGE',
        durationSeconds: rest.durationSeconds || 10,
        sortOrder: rest.sortOrder || 1,
        active: rest.active !== false
      }))
    }
    const result = await publishDisplayConfig(payload.apps, payload.ads)
    apps.value = result.apps
    ads.value = result.ads
    showSuccess('Конфигурация опубликована! Экраны обновятся автоматически.')
  } catch (e) {
    error.value = e.message
  } finally {
    publishing.value = false
  }
}
</script>

<style src="../styles/admin-page.css"></style>
<style src="../styles/admin-section.css"></style>
