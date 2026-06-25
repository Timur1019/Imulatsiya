const API_MESSAGE_KEYS = {
  'Команда отправлена на кулер': 'api.waterCoolerSent',
  'SOS сигнал отправлен': 'api.sosSent',
  'Команда отправлена': 'api.commandSent',
  'Command sent': 'api.commandSent',
  'Water cooler command sent': 'api.waterCoolerSent',
  'SOS signal sent': 'api.sosSent'
}

export function translateApiMessage(message, t) {
  if (!message) return ''
  const key = API_MESSAGE_KEYS[message]
  return key ? t(key) : message
}
