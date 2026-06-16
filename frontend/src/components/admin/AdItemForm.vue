<template>
  <div class="admin-item">
    <div class="admin-item__fields">
      <input
        class="admin-item__input"
        v-model="item.title"
        placeholder="Текст рекламы"
      />
      <div class="admin-item__row">
        <select class="admin-item__input admin-item__input--type" v-model="item.mediaType">
          <option value="IMAGE">Фото</option>
          <option value="VIDEO">Видео</option>
        </select>
        <input class="admin-item__input admin-item__input--file" type="file" :accept="acceptValue" @change="onFileChange" />
      </div>
      <div class="admin-item__row">
        <input
          class="admin-item__input"
          v-model="item.mediaUrl"
          placeholder="Ссылка (YouTube или прямой файл) или оставьте после загрузки"
        />
      </div>
      <div class="admin-item__row">
        <input
          type="color"
          class="admin-item__color"
          v-model="item.backgroundColor"
          title="Цвет фона"
        />
        <div>
          <span class="admin-item__label">Секунд</span>
          <input
            class="admin-item__input admin-item__input--small"
            v-model.number="item.durationSeconds"
            type="number"
            min="3"
            max="60"
          />
        </div>
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
import { computed } from 'vue'
import { uploadAdMedia } from '../../api/displayApi'

const props = defineProps({ item: { type: Object, required: true } })
defineEmits(['remove'])

const acceptValue = computed(() => {
  return props.item.mediaType === 'VIDEO' ? 'video/*' : 'image/*'
})

async function onFileChange(e) {
  const file = e.target.files?.[0]
  if (!file) return
  const res = await uploadAdMedia(file)
  props.item.mediaUrl = res.url
}
</script>

<style src="../../styles/admin-item.css"></style>
