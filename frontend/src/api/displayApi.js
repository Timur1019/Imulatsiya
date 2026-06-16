import apiClient from './axiosInstance'
import { API_ORIGIN } from './axiosInstance'

export const fetchApps = () => apiClient.get('/apps').then(r => r.data)

export const fetchActiveApps = () => apiClient.get('/apps/active').then(r => r.data)

export const fetchAds = () => apiClient.get('/ads').then(r => r.data)

export const fetchActiveAds = () => apiClient.get('/ads/active').then(r => r.data)

export const fetchDisplayConfig = () => apiClient.get('/display/config').then(r => r.data)

export const publishDisplayConfig = (apps, ads) =>
  apiClient.post('/display/publish', { apps, ads }).then(r => r.data)

export const fetchBusStatus = () => apiClient.get('/buses/status').then(r => r.data)

export const uploadAdMedia = (file) => {
  const form = new FormData()
  form.append('file', file)
  return apiClient
    .post('/files/ad-media', form, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then(r => r.data)
}

export const uploadAppIcon = (file) => {
  const form = new FormData()
  form.append('file', file)
  return apiClient
    .post('/files/app-icon', form, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then(r => r.data)
}

export const toAbsoluteMediaUrl = (url) => {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return `${API_ORIGIN}${url}`
}
