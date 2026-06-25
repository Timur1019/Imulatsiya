<template>
  <div class="bus-card" :class="{ 'bus-card--arriving': isApproaching }">
    <div class="bus-card__header">
      <div class="bus-card__route">
        <span class="bus-card__number">{{ bus.routeNumber }}</span>
        <span class="bus-card__name">{{ bus.routeName }}</span>
      </div>
      <span
        class="bus-card__status"
        :class="{ 'bus-card__status--stop': isAtStop }"
      >
        {{ statusLabel }}
      </span>
    </div>

    <div class="bus-card__info">
      <div>
        <div class="bus-card__stop-label">{{ t('bus.now') }}</div>
        <div class="bus-card__stop-name">{{ bus.currentStop }}</div>
      </div>
      <div>
        <div class="bus-card__stop-label">{{ t('bus.next') }}</div>
        <div class="bus-card__stop-name">{{ bus.nextStop }}</div>
      </div>
      <div class="bus-card__eta">
        <div class="bus-card__eta-value">{{ bus.etaMinutes }}</div>
        <div class="bus-card__eta-unit">{{ t('bus.minutes') }}</div>
      </div>
    </div>

    <div class="bus-card__track">
      <div class="bus-card__track-fill" :style="{ width: bus.progressPercent + '%' }"></div>
    </div>

    <div class="bus-card__stops">
      <span
        v-for="(stop, idx) in bus.stops"
        :key="stop"
        class="bus-card__stop-dot"
        :class="stopDotClass(idx)"
        :title="stop"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  BUS_STATUS_APPROACHING,
  BUS_STATUS_AT_STOP,
  translateBusStatus
} from '../../utils/busStatus'

const props = defineProps({
  bus: { type: Object, required: true }
})

const { t } = useI18n()

const isApproaching = computed(() => props.bus.status === BUS_STATUS_APPROACHING)
const isAtStop = computed(() => props.bus.status === BUS_STATUS_AT_STOP)
const statusLabel = computed(() => translateBusStatus(props.bus.status, t))

function stopDotClass(idx) {
  const currentIdx = props.bus.stops.indexOf(props.bus.currentStop)
  if (idx < currentIdx) return 'bus-card__stop-dot--passed'
  if (idx === currentIdx) return 'bus-card__stop-dot--active'
  return ''
}
</script>

<style src="../../styles/bus-card.css"></style>
