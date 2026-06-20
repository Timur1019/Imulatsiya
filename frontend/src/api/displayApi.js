import apiClient from './axiosInstance'
import { resolveApiOrigin } from '../utils/apiOrigin'
import { uploadAdMediaFile, uploadAppIconFile } from './uploadApi'

export const fetchApps = () => apiClient.get('/apps').then(r => r.data)

export const fetchActiveApps = () => apiClient.get('/apps/active').then(r => r.data)

export const fetchAds = () => apiClient.get('/ads').then(r => r.data)

export const fetchActiveAds = () => apiClient.get('/ads/active').then(r => r.data)

export const fetchDisplayConfig = () => apiClient.get('/display/config').then(r => r.data)

export const publishDisplayConfig = (apps, ads) =>
  apiClient.post('/display/publish', { apps, ads }).then(r => r.data)

export const fetchBusStatus = () => apiClient.get('/buses/status').then(r => r.data)

export const uploadAdMedia = (file, onProgress) => uploadAdMediaFile(file, onProgress)

export const uploadAppIcon = (file, onProgress) => uploadAppIconFile(file, onProgress)

export const toAbsoluteMediaUrl = (url) => {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return `${resolveApiOrigin()}${url}`
}
