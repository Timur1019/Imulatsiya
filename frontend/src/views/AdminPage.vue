<template>
  <div class="admin-page">
    <div class="admin-page__header">
      <h1 class="admin-page__title">{{ t('admin.title') }}</h1>
      <router-link to="/" class="admin-page__back">{{ t('admin.backHome') }}</router-link>
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
        {{ publishing ? t('admin.publishing') : t('admin.publish') }}
      </button>
    </div>

    <div v-if="loading" class="admin-section__empty">{{ t('common.loading') }}</div>

    <div v-else class="admin-page__sections">
      <section class="admin-section">
        <div class="admin-section__header">
          <h2 class="admin-section__title">{{ t('admin.appsSection') }}</h2>
          <button class="admin-section__add-btn" @click="addApp">{{ t('admin.add') }}</button>
        </div>
        <div class="admin-section__list">
          <AppItemForm
            v-for="(app, idx) in apps"
            :key="app._key || app.id || idx"
            :item="app"
            @remove="removeApp(idx)"
          />
          <div v-if="apps.length === 0" class="admin-section__empty">
            {{ t('admin.noApps') }}
          </div>
        </div>
      </section>

      <section class="admin-section">
        <div class="admin-section__header">
          <h2 class="admin-section__title">{{ t('admin.adsSection') }}</h2>
          <button class="admin-section__add-btn" @click="addAd">{{ t('admin.add') }}</button>
        </div>
        <div class="admin-section__list">
          <AdItemForm
            v-for="(ad, idx) in ads"
            :key="ad._key || ad.id || idx"
            :item="ad"
            @remove="removeAd(idx)"
          />
          <div v-if="ads.length === 0" class="admin-section__empty">
            {{ t('admin.noAds') }}
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAdminConfig } from '../composables/useAdminConfig'
import { publishDisplayConfig } from '../api/displayApi'
import AppItemForm from '../components/admin/AppItemForm.vue'
import AdItemForm from '../components/admin/AdItemForm.vue'

const { t } = useI18n()
const { apps, ads, loading, error, successMessage, showSuccess } = useAdminConfig()
const publishing = ref(false)
let keyCounter = 0

function addApp() {
  apps.value.push({
    _key: `new-app-${++keyCounter}`,
    name: t('admin.newApp'),
    iconUrl: '📱',
    linkUrl: '',
    linkType: 'OPEN_URL',
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
    title: t('admin.newAd'),
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
      throw new Error(t('admin.adMissingMedia', { title: invalidAd.title }))
    }

    const payload = {
      apps: apps.value.map(({ _key, ...rest }) => ({
        ...rest,
        linkType: rest.linkType || 'OPEN_URL',
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
    showSuccess(t('admin.publishSuccess'))
  } catch (e) {
    error.value = e.message
  } finally {
    publishing.value = false
  }
}
</script>

<style src="../styles/admin-page.css"></style>
<style src="../styles/admin-section.css"></style>
