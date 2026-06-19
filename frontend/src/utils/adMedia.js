const VIDEO_EXT = /\.(mp4|webm|mov|m4v|ogv)(\?.*)?$/i

export function hasPlayableMedia(ad) {
  return Boolean((ad?.mediaUrl || '').trim())
}

export function isYoutubeUrl(url) {
  const u = (url || '').toLowerCase()
  return u.includes('youtube.com') || u.includes('youtu.be')
}

export function isVimeoUrl(url) {
  const u = (url || '').toLowerCase()
  return u.includes('vimeo.com')
}

export function isDirectVideoUrl(url) {
  if (!url) return false
  if (isYoutubeUrl(url) || isVimeoUrl(url)) return false
  return VIDEO_EXT.test(url) || url.startsWith('/uploads/')
}

export function extractYoutubeId(raw) {
  if (!raw) return ''
  try {
    const u = new URL(raw)
    if (u.hostname.includes('youtu.be')) {
      return u.pathname.replace('/', '').split('/')[0]
    }
    const fromQuery = u.searchParams.get('v')
    if (fromQuery) return fromQuery.split('&')[0]

    const parts = u.pathname.split('/').filter(Boolean)
    if (parts[0] === 'shorts' && parts[1]) return parts[1]
    if (parts[0] === 'embed' && parts[1]) return parts[1]
    if (parts[0] === 'live' && parts[1]) return parts[1]
  } catch {
    return ''
  }
  return ''
}

export function getYoutubeEmbedUrl(raw) {
  const id = extractYoutubeId(raw)
  if (!id) return ''
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const params = new URLSearchParams({
    autoplay: '1',
    mute: '0',
    controls: '0',
    rel: '0',
    playsinline: '1',
    modestbranding: '1',
    loop: '1',
    playlist: id,
    enablejsapi: '1'
  })
  if (origin) params.set('origin', origin)
  return `https://www.youtube.com/embed/${id}?${params.toString()}`
}

export function getYoutubeThumbnail(raw) {
  const id = extractYoutubeId(raw)
  if (!id) return ''
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`
}

export function extractVimeoId(raw) {
  if (!raw) return ''
  try {
    const u = new URL(raw)
    const parts = u.pathname.split('/').filter(Boolean)
    const last = parts[parts.length - 1]
    return /^\d+$/.test(last) ? last : ''
  } catch {
    return ''
  }
}

export function getVimeoEmbedUrl(raw) {
  const id = extractVimeoId(raw)
  if (!id) return ''
  return `https://player.vimeo.com/video/${id}?autoplay=1&muted=0&loop=1&background=0`
}

export function resolveMediaMode(ad) {
  const url = (ad?.mediaUrl || '').trim()
  if (!url) return 'empty'

  const type = (ad?.mediaType || 'IMAGE').toUpperCase()

  if (isYoutubeUrl(url)) return 'youtube'
  if (isVimeoUrl(url)) return 'vimeo'
  if (type === 'VIDEO' || isDirectVideoUrl(url)) return 'video'
  return 'image'
}
