<template>
  <div class="admin-item">
    <div class="admin-item__icon">
      <img v-if="iconImage" class="admin-item__icon-image" :src="iconImage" :alt="item.name" />
      <span v-else class="admin-item__icon-emoji">{{ emojiFallback }}</span>
    </div>
    <div class="admin-item__fields">
      <input
        class="admin-item__input"
        v-model="item.name"
        :placeholder="t('admin.appNamePlaceholder')"
      />
      <div class="admin-item__row">
        <select class="admin-item__input admin-item__input--type" v-model="item.linkType">
          <option value="OPEN_URL">{{ t('admin.linkOpenUrl') }}</option>
          <option value="TRIGGER_GET">{{ t('admin.linkTriggerGet') }}</option>
        </select>
        <input
          class="admin-item__input"
          v-model="item.linkUrl"
          :placeholder="linkPlaceholder"
        />
      </div>
      <div class="admin-item__row">
        <label class="admin-item__upload-btn">
          {{
            uploading
              ? t('common.uploadProgress', { percent: uploadProgress })
              : t('admin.uploadIcon')
          }}
          <input
            class="admin-item__upload-input"
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            :disabled="uploading"
            @change="onIconChange"
          />
        </label>
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
      <p v-if="item.iconUrl && item.iconUrl.startsWith('/')" class="admin-item__hint">
        {{ t('admin.iconPath', { path: item.iconUrl }) }}
      </p>
      <p v-if="uploadError" class="admin-item__upload-error">{{ uploadError }}</p>
      <p v-else-if="uploadSuccess" class="admin-item__upload-success">{{ uploadSuccess }}</p>
    </div>
    <button class="admin-item__delete" @click="$emit('remove')" :title="t('common.delete')">✕</button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { toAbsoluteMediaUrl } from '../../api/displayApi'
import { APP_LINK_TYPES } from '../../utils/appLink'
import { useAppIconUpload } from '../../composables/useAppIconUpload'

const props = defineProps({ item: { type: Object, required: true } })
defineEmits(['remove'])

const { t } = useI18n()
const { uploading, uploadProgress, uploadError, uploadSuccess, uploadIcon } = useAppIconUpload(props.item)

const iconImage = computed(() => {
  const url = props.item?.iconUrl || ''
  if (!url) return ''
  if (url.startsWith('/')) return toAbsoluteMediaUrl(url)
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return ''
})

const emojiFallback = computed(() => {
  const url = props.item?.iconUrl || ''
  if (url && !url.startsWith('/') && !url.startsWith('http')) return url
  return '📱'
})

const linkPlaceholder = computed(() => {
  if (props.item?.linkType === APP_LINK_TYPES.TRIGGER_GET) {
    return '/api/kiosk/devices/water'
  }
  return 'https://example.com'
})

async function onIconChange(e) {
  const file = e.target.files?.[0]
  await uploadIcon(file)
  e.target.value = ''
}
</script>

<style src="../../styles/admin-item.css"></style>
