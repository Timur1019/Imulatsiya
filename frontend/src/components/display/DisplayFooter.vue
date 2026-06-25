<template>
  <footer class="display-footer">
    <span class="display-footer__badge">
      <svg class="display-footer__icon" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M21 2H3a1 1 0 00-1 1v11a1 1 0 001 1h6l4 3 4-3h6a1 1 0 001-1V3a1 1 0 00-1-1zm-1 11H4V4h16v9z"
        />
      </svg>
      {{ t('display.screenLarge') }}
    </span>
  </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style src="../../styles/display-footer.css"></style>
