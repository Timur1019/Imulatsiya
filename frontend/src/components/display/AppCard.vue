<template>
  <div class="app-card" role="button" tabindex="0">
    <div class="app-card__icon-wrap">
      <img
        v-if="showImage"
        class="app-card__icon-image"
        :src="iconImage"
        :alt="name"
        @error="imageFailed = true"
      />
      <span v-else class="app-card__icon">{{ fallbackIcon }}</span>
    </div>
    <span class="app-card__name">{{ name }}</span>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { toAbsoluteMediaUrl } from '../../api/displayApi'

const props = defineProps({
  name: { type: String, required: true },
  icon: { type: String, default: '📱' },
  iconUrl: { type: String, default: '' }
})

const imageFailed = ref(false)

watch(
  () => props.iconUrl,
  () => {
    imageFailed.value = false
  }
)

const iconImage = computed(() => {
  const url = props.iconUrl || ''
  if (!url || imageFailed.value) return ''
  if (url.startsWith('/')) return toAbsoluteMediaUrl(url)
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return ''
})

const showImage = computed(() => Boolean(iconImage.value))
const fallbackIcon = computed(() => props.icon || '📱')
</script>

<style src="../../styles/app-card.css"></style>
