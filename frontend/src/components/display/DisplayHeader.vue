<template>
  <header class="display-header">
    <SosButton :loading="sosLoading" @click="$emit('sos')" />
    <h1 class="display-header__title">{{ t('display.kioskTitle') }}</h1>
    <div class="display-header__time">{{ currentTime }}</div>
  </header>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import SosButton from './SosButton.vue'

defineProps({
  currentTime: { type: String, default: '' },
  sosLoading: { type: Boolean, default: false }
})

defineEmits(['sos'])

const { t } = useI18n()
</script>

<style src="../../styles/display-header.css"></style>
