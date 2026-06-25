<template>
  <div class="home-page">
    <h1 class="home-page__title">{{ t('app.title') }}</h1>
    <p class="home-page__subtitle">{{ t('home.subtitle') }}</p>

    <div class="home-page__grid">
      <router-link to="/admin" class="home-page__card">
        <div class="home-page__card-icon">⚙️</div>
        <div class="home-page__card-title">{{ t('home.adminTitle') }}</div>
        <div class="home-page__card-desc">{{ t('home.adminDesc') }}</div>
      </router-link>

      <router-link to="/display/apps" class="home-page__card" target="_blank">
        <div class="home-page__card-icon">🖥️</div>
        <div class="home-page__card-title">{{ t('home.appsTitle') }}</div>
        <div class="home-page__card-desc">{{ t('home.appsDesc') }}</div>
      </router-link>

      <router-link to="/display/info" class="home-page__card" target="_blank">
        <div class="home-page__card-icon">📺</div>
        <div class="home-page__card-title">{{ t('home.infoTitle') }}</div>
        <div class="home-page__card-desc">{{ t('home.infoDesc') }}</div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style src="../styles/home-page.css"></style>
