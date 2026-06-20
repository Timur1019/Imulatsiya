import { ref, onMounted } from 'vue'
import { fetchApps, fetchAds } from '../api/displayApi'

export function useAdminConfig() {
  const apps = ref([])
  const ads = ref([])
  const loading = ref(true)
  const error = ref(null)
  const successMessage = ref('')

  const load = async () => {
    loading.value = true
    error.value = null
    try {
      const [appsData, adsData] = await Promise.all([fetchApps(), fetchAds()])
      apps.value = appsData.map(app => ({
        ...app,
        linkType: app.linkType || 'OPEN_URL'
      }))
      ads.value = adsData
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  onMounted(load)

  const showSuccess = (msg) => {
    successMessage.value = msg
    setTimeout(() => { successMessage.value = '' }, 3000)
  }

  return { apps, ads, loading, error, successMessage, reload: load, showSuccess }
}
