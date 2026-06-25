<template>
  <button
    type="button"
    class="sos-button"
    :class="{ 'sos-button--loading': loading }"
    :disabled="loading"
    :aria-label="t('display.sosAria')"
    @click="$emit('click')"
  >
    <span class="sos-button__label">SOS</span>
    <svg class="sos-button__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.36 11.36 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.58 1 1 0 01-.25 1.01l-2.2 2.2z"
      />
    </svg>
  </button>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

defineProps({
  loading: { type: Boolean, default: false }
})

defineEmits(['click'])

const { t } = useI18n()
</script>

<style src="../../styles/sos-button.css"></style>
