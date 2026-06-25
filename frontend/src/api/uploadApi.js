import axios from 'axios'
import { API_ORIGIN } from './axiosInstance'
import { i18n } from '../i18n'

const uploadClient = axios.create({
  baseURL: `${API_ORIGIN}/api`,
  timeout: 300000
})

uploadClient.interceptors.response.use(
  response => response,
  error => {
    const message = error.response?.data?.message || error.message || i18n.global.t('errors.upload')
    return Promise.reject(new Error(message))
  }
)

export const uploadAdMediaFile = (file, onProgress) => {
  const form = new FormData()
  form.append('file', file)
  return uploadClient
    .post('/files/ad-media', form, {
      onUploadProgress: onProgress
    })
    .then(r => r.data)
}

export const uploadAppIconFile = (file, onProgress) => {
  const form = new FormData()
  form.append('file', file)
  return uploadClient
    .post('/files/app-icon', form, {
      onUploadProgress: onProgress
    })
    .then(r => r.data)
}
