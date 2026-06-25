import axios from 'axios'
import { resolveApiOrigin } from '../utils/apiOrigin'
import { i18n } from '../i18n'

export const API_ORIGIN = resolveApiOrigin()

const apiClient = axios.create({
  baseURL: `${API_ORIGIN}/api`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

apiClient.interceptors.response.use(
  response => response,
  error => {
    const message = error.response?.data?.message || error.message || i18n.global.t('errors.network')
    return Promise.reject(new Error(message))
  }
)

export default apiClient
