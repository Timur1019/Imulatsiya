const BUS_STATUS_KEYS = {
  'На остановке': 'bus.statusAtStop',
  'Подъезжает': 'bus.statusApproaching'
}

export const BUS_STATUS_APPROACHING = 'Подъезжает'
export const BUS_STATUS_AT_STOP = 'На остановке'

export function translateBusStatus(status, t) {
  const key = BUS_STATUS_KEYS[status]
  return key ? t(key) : status
}
