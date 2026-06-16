import axios from 'axios'

export const API_ORIGIN = 'http://localhost:8080'

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
    const message = error.response?.data?.message || error.message || 'Ошибка сети'
    return Promise.reject(new Error(message))
  }
)

export default apiClient
