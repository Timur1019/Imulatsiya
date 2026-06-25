import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { uploadAppIcon } from '../api/displayApi'

export function useAppIconUpload(item) {
  const { t } = useI18n()
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
      uploadSuccess.value = t('admin.iconUploaded')
    } catch (err) {
      uploadError.value = err.message || t('admin.iconUploadFailed')
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
