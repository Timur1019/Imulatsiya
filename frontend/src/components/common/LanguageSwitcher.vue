<template>
  <div ref="rootRef" class="lang-switch">
    <button
      type="button"
      class="lang-switch__trigger"
      :class="{ 'lang-switch__trigger--open': isOpen }"
      :aria-expanded="isOpen"
      :aria-label="t('common.language')"
      @click="toggleMenu"
    >
      <span class="lang-switch__flag" aria-hidden="true">{{ currentMeta.flag }}</span>
      <span class="lang-switch__label">{{ t(currentMeta.labelKey) }}</span>
      <svg class="lang-switch__chevron" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M7 10l5 5 5-5H7z" />
      </svg>
    </button>

    <Transition name="lang-switch-menu">
      <div v-if="isOpen" class="lang-switch__menu" role="listbox">
        <button
          v-for="code in locales"
          :key="code"
          type="button"
          class="lang-switch__option"
          :class="{ 'lang-switch__option--active': locale === code }"
          role="option"
          :aria-selected="locale === code"
          @click="selectLocale(code)"
        >
          <span class="lang-switch__option-flag" aria-hidden="true">{{ getLocaleMeta(code).flag }}</span>
          <span class="lang-switch__option-label">{{ t(getLocaleMeta(code).labelKey) }}</span>
          <svg
            v-if="locale === code"
            class="lang-switch__check"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
            />
          </svg>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { SUPPORTED_LOCALES } from '../../i18n'
import { getLocaleMeta } from '../../i18n/localeMeta'
import { useLocale } from '../../composables/useLocale'
import { useClickOutside } from '../../composables/useClickOutside'

const { t } = useI18n()
const { locale, setLocale } = useLocale()
const locales = SUPPORTED_LOCALES

const rootRef = ref(null)
const isOpen = ref(false)

const currentMeta = computed(() => getLocaleMeta(locale.value))

function toggleMenu() {
  isOpen.value = !isOpen.value
}

function closeMenu() {
  isOpen.value = false
}

function selectLocale(code) {
  setLocale(code)
  closeMenu()
}

function onEscape(event) {
  if (event.key === 'Escape') closeMenu()
}

useClickOutside(rootRef, closeMenu)

onMounted(() => {
  document.addEventListener('keydown', onEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onEscape)
})
</script>

<style src="../../styles/language-switcher.css"></style>
