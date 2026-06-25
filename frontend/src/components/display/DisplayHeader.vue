<template>
  <header class="display-header">
    <SosButton :loading="sosLoading" @click="$emit('sos')" />
    <h1 class="display-header__title">Информационный киоск</h1>
    <div class="display-header__time">{{ currentTime }}</div>
  </header>
</template>

<script setup>
import SosButton from './SosButton.vue'

defineProps({
  currentTime: { type: String, default: '' },
  sosLoading: { type: Boolean, default: false }
})

defineEmits(['sos'])
</script>

<style src="../../styles/display-header.css"></style>
