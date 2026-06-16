<template>
  <div class="admin-item">
    <div class="admin-item__icon">
      <img v-if="iconImage" class="admin-item__icon-image" :src="iconImage" :alt="item.name" />
      <span v-else class="admin-item__icon-emoji">{{ (item.iconUrl && !item.iconUrl.startsWith('/')) ? item.iconUrl : '📱' }}</span>
    </div>
    <div class="admin-item__fields">
      <input
        class="admin-item__input"
        v-model="item.name"
        placeholder="Название приложения"
      />
      <div v-if="item.iconUrl && item.iconUrl.startsWith('/')" class="admin-item__hint">
        Иконка загружена: {{ item.iconUrl }}
      </div>
      <div class="admin-item__row">
        <input
          class="admin-item__input"
          v-model="item.linkUrl"
          placeholder="Ссылка (https://...)"
        />
        <input class="admin-item__input admin-item__input--file" type="file" accept="image/*" @change="onIconChange" />
        <input
          class="admin-item__input admin-item__input--small"
          v-model.number="item.sortOrder"
          type="number"
          min="1"
          title="Порядок"
        />
        <label class="admin-item__toggle">
          <input type="checkbox" v-model="item.active" />
          Активно
        </label>
      </div>
    </div>
    <button class="admin-item__delete" @click="$emit('remove')" title="Удалить">✕</button>
  </div>
</template>

<script setup>
import { uploadAppIcon } from '../../api/displayApi'
import { computed } from 'vue'
import { toAbsoluteMediaUrl } from '../../api/displayApi'

const props = defineProps({ item: { type: Object, required: true } })
defineEmits(['remove'])

const iconImage = computed(() => {
  const url = props.item?.iconUrl || ''
  if (!url) return ''
  if (url.startsWith('/')) return toAbsoluteMediaUrl(url)
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return ''
})

async function onIconChange(e) {
  const file = e.target.files?.[0]
  if (!file) return
  const res = await uploadAppIcon(file)
  props.item.iconUrl = res.url
}
</script>

<style src="../../styles/admin-item.css"></style>
