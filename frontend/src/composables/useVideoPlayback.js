import { nextTick } from 'vue'

export async function playVideoWithSound(videoEl) {
  if (!videoEl) return

  videoEl.muted = false
  videoEl.volume = 1

  try {
    await videoEl.play()
    return
  } catch {
    videoEl.muted = true
    try {
      await videoEl.play()
      videoEl.muted = false
    } catch {
      /* autoplay blocked */
    }
  }
}

export async function restartVideo(videoRef) {
  await nextTick()
  const video = videoRef?.value
  if (!video) return
  video.load()
  await playVideoWithSound(video)
}
