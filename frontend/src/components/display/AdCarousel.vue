<template>
  <div class="ad-carousel">
    <div
      v-if="currentAd"
      class="ad-carousel__slide"
      :style="{ backgroundColor: currentAd.backgroundColor || '#1e3a5f' }"
      :key="`${currentAd.id}-${rotationTick}`"
    >
      <iframe
        v-if="mediaMode === 'youtube' && youtubeEmbedUrl"
        class="ad-carousel__iframe"
        :src="youtubeEmbedUrl"
        :key="youtubeEmbedUrl"
        :title="t('ad.videoTitle')"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
        allowfullscreen
        referrerpolicy="strict-origin-when-cross-origin"
      ></iframe>

      <iframe
        v-else-if="mediaMode === 'vimeo' && vimeoEmbedUrl"
        class="ad-carousel__iframe"
        :src="vimeoEmbedUrl"
        :key="vimeoEmbedUrl"
        :title="t('ad.videoTitle')"
        frameborder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowfullscreen
      ></iframe>

      <video
        v-else-if="mediaMode === 'video'"
        ref="videoRef"
        class="ad-carousel__video"
        :src="mediaSrc"
        :key="mediaSrc"
        autoplay
        loop
        playsinline
        preload="auto"
        @loadeddata="onVideoReady"
        @error="onVideoError"
      ></video>

      <img
        v-else-if="mediaMode === 'image'"
        :src="mediaSrc"
        :alt="currentAd.title"
        class="ad-carousel__image"
        @error="mediaError = true"
      />

      <div v-else-if="mediaMode === 'empty' || mediaError" class="ad-carousel__fallback">
        <img
          v-if="youtubeThumb"
          :src="youtubeThumb"
          class="ad-carousel__fallback-image"
          alt=""
        />
        <p class="ad-carousel__fallback-text">
          {{ fallbackMessage }}
        </p>
      </div>

      <h2 class="ad-carousel__title">{{ currentAd.title }}</h2>
    </div>

    <div v-else class="ad-carousel__empty">{{ t('ad.noActive') }}</div>

    <div v-if="playableAds.length > 0" class="ad-carousel__progress">
      <div
        class="ad-carousel__progress-fill"
        :style="{ width: progressPercent + '%' }"
      ></div>
    </div>

    <div v-if="playableAds.length > 1" class="ad-carousel__dots">
      <span
        v-for="(ad, idx) in playableAds"
        :key="ad.id || idx"
        class="ad-carousel__dot"
        :class="{ 'ad-carousel__dot--active': idx === currentIndex }"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAdRotation } from '../../composables/useAdRotation'
import { toAbsoluteMediaUrl } from '../../api/displayApi'
import { playVideoWithSound } from '../../composables/useVideoPlayback'
import {
  resolveMediaMode,
  getYoutubeEmbedUrl,
  getVimeoEmbedUrl,
  getYoutubeThumbnail,
  hasPlayableMedia
} from '../../utils/adMedia'

const props = defineProps({
  ads: { type: Array, default: () => [] }
})

const { t } = useI18n()

const playableAds = computed(() =>
  (props.ads || []).filter(a => a.active && hasPlayableMedia(a))
)

const { currentAd, currentIndex, rotationTick, progressPercent } = useAdRotation(playableAds)

const videoRef = ref(null)
const mediaError = ref(false)

const mediaSrc = computed(() => toAbsoluteMediaUrl(currentAd.value?.mediaUrl || ''))
const mediaMode = computed(() => resolveMediaMode(currentAd.value))
const youtubeEmbedUrl = computed(() => getYoutubeEmbedUrl(currentAd.value?.mediaUrl || ''))
const vimeoEmbedUrl = computed(() => getVimeoEmbedUrl(currentAd.value?.mediaUrl || ''))
const youtubeThumb = computed(() => getYoutubeThumbnail(currentAd.value?.mediaUrl || ''))

const fallbackMessage = computed(() => {
  if (!hasPlayableMedia(currentAd.value)) {
    return t('ad.noVideo')
  }
  return t('ad.playbackError')
})

async function onVideoReady() {
  mediaError.value = false
  await playVideoWithSound(videoRef.value)
}

async function onVideoError() {
  mediaError.value = true
  const video = videoRef.value
  if (!video) return
  video.muted = true
  try {
    await video.play()
  } catch {
    /* ignore */
  }
}

watch(
  () => [currentAd.value?.id, mediaSrc.value, mediaMode.value],
  () => {
    mediaError.value = false
    if (mediaMode.value === 'video') {
      onVideoReady()
    }
  }
)
</script>

<style src="../../styles/ad-carousel.css"></style>
