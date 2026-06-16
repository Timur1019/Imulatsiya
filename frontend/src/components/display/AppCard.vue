<template>
  <div class="app-card" role="button" tabindex="0">
    <img v-if="iconImage" class="app-card__icon-image" :src="iconImage" :alt="name" />
    <span v-else class="app-card__icon">{{ icon }}</span>
    <span class="app-card__name">{{ name }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { toAbsoluteMediaUrl } from '../../api/displayApi'

const props = defineProps({
  name: { type: String, required: true },
  icon: { type: String, default: '📱' },
  iconUrl: { type: String, default: '' }
})

const iconImage = computed(() => {
  if (!props.iconUrl) return ''
  if (props.iconUrl.startsWith('/')) return toAbsoluteMediaUrl(props.iconUrl)
  if (props.iconUrl.startsWith('http://') || props.iconUrl.startsWith('https://')) return props.iconUrl
  return ''
})
</script>

<style src="../../styles/app-card.css"></style>
