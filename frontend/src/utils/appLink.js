import { resolveApiOrigin } from './apiOrigin'
import { i18n } from '../i18n'

export const APP_LINK_TYPES = {
  OPEN_URL: 'OPEN_URL',
  TRIGGER_GET: 'TRIGGER_GET'
}

export function resolveLinkTarget(url) {
  const trimmed = (url || '').trim()
  if (!trimmed) return ''
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed
  if (trimmed.startsWith('/')) return `${resolveApiOrigin()}${trimmed}`
  return trimmed
}

export async function executeAppLink(app, t = i18n.global.t) {
  const url = (app?.linkUrl || '').trim()
  if (!url) {
    return { ok: false, message: t('errors.linkNotSet') }
  }

  const linkType = app?.linkType || APP_LINK_TYPES.OPEN_URL

  if (linkType === APP_LINK_TYPES.TRIGGER_GET) {
    const target = resolveLinkTarget(url)
    const response = await fetch(target, { method: 'GET', mode: 'cors' })
    if (!response.ok) {
      throw new Error(t('errors.serverError', { status: response.status }))
    }
    const data = await response.json().catch(() => ({}))
    return {
      ok: true,
      message: data.message || t('api.commandSent')
    }
  }

  const target = url.startsWith('/') ? resolveLinkTarget(url) : url
  window.open(target, '_blank', 'noopener,noreferrer')
  return { ok: true, message: '' }
}
