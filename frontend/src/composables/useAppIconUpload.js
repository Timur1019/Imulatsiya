import { ref } from 'vue'
import { uploadAppIcon } from '../api/displayApi'

export function useAppIconUpload(item) {
  const uploading = ref(false)
  const uploadProgress = ref(0)
  const uploadError = ref('')
  const uploadSuccess = ref('')

  async function uploadIcon(file) {
    if (!file) return

    uploading.value = true
    uploadProgress.value = 0
    uploadError.value = ''
    uploadSuccess.value = ''

    try {
      const result = await uploadAppIcon(file, (event) => {
        if (!event.total) return
        uploadProgress.value = Math.round((event.loaded / event.total) * 100)
      })
      item.iconUrl = result.url
      uploadSuccess.value = 'Иконка загружена'
    } catch (err) {
      uploadError.value = err.message || 'Не удалось загрузить иконку'
    } finally {
      uploading.value = false
    }
  }

  return {
    uploading,
    uploadProgress,
    uploadError,
    uploadSuccess,
    uploadIcon
  }
}
