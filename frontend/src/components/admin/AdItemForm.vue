<template>
  <div class="admin-item">
    <div class="admin-item__fields">
      <input
        class="admin-item__input"
        v-model="item.title"
        :placeholder="t('admin.adTitlePlaceholder')"
      />
      <div class="admin-item__row">
        <select class="admin-item__input admin-item__input--type" v-model="item.mediaType">
          <option value="IMAGE">{{ t('admin.mediaPhoto') }}</option>
          <option value="VIDEO">{{ t('admin.mediaVideo') }}</option>
        </select>
        <label class="admin-item__upload-btn">
          {{
            uploading
              ? t('common.uploadProgress', { percent: uploadProgress })
              : t('admin.selectFile')
          }}
          <input
            class="admin-item__upload-input"
            type="file"
            :accept="acceptValue"
            :disabled="uploading"
            @change="onFileChange"
          />
        </label>
      </div>
      <div class="admin-item__row">
        <input
          class="admin-item__input"
          v-model="item.mediaUrl"
          :placeholder="t('admin.mediaUrlPlaceholder')"
        />
      </div>
      <p v-if="uploadError" class="admin-item__upload-error">{{ uploadError }}</p>
      <p v-else-if="uploadSuccess" class="admin-item__upload-success">{{ uploadSuccess }}</p>
      <div v-if="previewUrl" class="admin-item__preview">
        <video v-if="item.mediaType === 'VIDEO' && isLocalFile" :src="previewUrl" controls muted class="admin-item__preview-video" />
        <img v-else-if="isLocalFile || item.mediaType === 'IMAGE'" :src="previewUrl" :alt="t('common.preview')" class="admin-item__preview-image" />
      </div>
      <div class="admin-item__row">
        <input
          type="color"
          class="admin-item__color"
          v-model="item.backgroundColor"
          :title="t('common.bgColor')"
        />
        <div>
          <span class="admin-item__label">{{ t('common.seconds') }}</span>
          <input
            class="admin-item__input admin-item__input--small"
            v-model.number="item.durationSeconds"
            type="number"
            min="3"
            max="300"
          />
        </div>
        <input
          class="admin-item__input admin-item__input--small"
          v-model.number="item.sortOrder"
          type="number"
          min="1"
          :title="t('common.order')"
        />
        <label class="admin-item__toggle">
          <input type="checkbox" v-model="item.active" />
          {{ t('common.active') }}
        </label>
      </div>
    </div>
    <button class="admin-item__delete" @click="$emit('remove')" :title="t('common.delete')">✕</button>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { uploadAdMedia, toAbsoluteMediaUrl } from '../../api/displayApi'

const props = defineProps({ item: { type: Object, required: true } })
defineEmits(['remove', 'uploading'])

const { t } = useI18n()
const uploading = ref(false)
const uploadProgress = ref(0)
const uploadError = ref('')
const uploadSuccess = ref('')

const acceptValue = computed(() =>
  props.item.mediaType === 'VIDEO' ? 'video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov' : 'image/*'
)

const isLocalFile = computed(() => (props.item.mediaUrl || '').startsWith('/uploads/'))

const previewUrl = computed(() => {
  const url = props.item.mediaUrl || ''
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return toAbsoluteMediaUrl(url)
})

async function onFileChange(e) {
  const file = e.target.files?.[0]
  if (!file) return

  uploadError.value = ''
  uploadSuccess.value = ''
  uploading.value = true
  uploadProgress.value = 0

  try {
    const res = await uploadAdMedia(file, (event) => {
      if (event.total) {
        uploadProgress.value = Math.round((event.loaded / event.total) * 100)
      }
    })
    props.item.mediaUrl = res.url
    uploadSuccess.value = t('admin.fileUploaded', { name: res.originalFilename || file.name })
  } catch (err) {
    uploadError.value = err.message || t('admin.uploadFileFailed')
  } finally {
    uploading.value = false
    e.target.value = ''
  }
}

defineExpose({ uploading })
</script>

<style src="../../styles/admin-item.css"></style>
