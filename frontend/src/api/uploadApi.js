import axios from 'axios'
import { API_ORIGIN } from './axiosInstance'

const uploadClient = axios.create({
  baseURL: `${API_ORIGIN}/api`,
  timeout: 300000
})

uploadClient.interceptors.response.use(
  response => response,
  error => {
    const message = error.response?.data?.message || error.message || 'Ошибка загрузки файла'
    return Promise.reject(new Error(message))
  }
)

export const uploadAdMediaFile = (file, onProgress) => {
  const form = new FormData()
  form.append('file', file)
  return uploadClient
    .post('/files/ad-media', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: onProgress
    })
    .then(r => r.data)
}

export const uploadAppIconFile = (file, onProgress) => {
  const form = new FormData()
  form.append('file', file)
  return uploadClient
    .post('/files/app-icon', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: onProgress
    })
    .then(r => r.data)
}
