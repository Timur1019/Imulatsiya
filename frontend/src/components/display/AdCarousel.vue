<template>
  <div class="ad-carousel">
    <div
      v-if="currentAd"
      class="ad-carousel__slide"
      :style="{ backgroundColor: currentAd.backgroundColor || '#1e3a5f' }"
      :key="currentAd.id || currentIndex"
    >
      <iframe
        v-if="isVideo && isYoutube && youtubeEmbedUrl"
        class="ad-carousel__iframe"
        :src="youtubeEmbedUrl"
        title="Ad video"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
      <video
        v-else-if="isVideo && currentAd.mediaUrl"
        class="ad-carousel__video"
        :src="mediaSrc"
        autoplay
        muted
        loop
        playsinline
      ></video>
      <img
        v-else-if="currentAd.mediaUrl"
        :src="mediaSrc"
        :alt="currentAd.title"
        class="ad-carousel__image"
      />
      <h2 class="ad-carousel__title">{{ currentAd.title }}</h2>
    </div>
    <div v-else class="ad-carousel__empty">Нет активной рекламы</div>

    <div v-if="ads.length > 1" class="ad-carousel__dots">
      <span
        v-for="(ad, idx) in ads"
        :key="ad.id || idx"
        class="ad-carousel__dot"
        :class="{ 'ad-carousel__dot--active': idx === currentIndex }"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { computed, toRef } from 'vue'
import { useAdRotation } from '../../composables/useAdRotation'
import { toAbsoluteMediaUrl } from '../../api/displayApi'

const props = defineProps({
  ads: { type: Array, default: () => [] }
})

const adsRef = toRef(props, 'ads')
const { currentAd, currentIndex } = useAdRotation(adsRef)

const isVideo = computed(() => (currentAd.value?.mediaType || '') === 'VIDEO')
const mediaSrc = computed(() => toAbsoluteMediaUrl(currentAd.value?.mediaUrl || ''))

const isYoutube = computed(() => {
  const url = (currentAd.value?.mediaUrl || '').toLowerCase()
  return url.includes('youtube.com') || url.includes('youtu.be')
})

const youtubeEmbedUrl = computed(() => {
  const raw = currentAd.value?.mediaUrl || ''
  if (!raw) return ''
  try {
    const u = new URL(raw)
    let id = ''
    if (u.hostname.includes('youtu.be')) {
      id = u.pathname.replace('/', '')
    } else {
      id = u.searchParams.get('v') || ''
      if (!id && u.pathname.startsWith('/shorts/')) id = u.pathname.split('/shorts/')[1] || ''
      if (!id && u.pathname.startsWith('/embed/')) id = u.pathname.split('/embed/')[1] || ''
    }
    id = (id || '').split('?')[0].split('&')[0]
    if (!id) return ''
    // autoplay requires mute in most browsers; use modest branding
    return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&rel=0&playsinline=1&modestbranding=1&loop=1&playlist=${id}`
  } catch {
    return ''
  }
})
</script>

<style src="../../styles/ad-carousel.css"></style>
