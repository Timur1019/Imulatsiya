import { resolveApiOrigin } from '../utils/apiOrigin'

export async function triggerSos() {
  const response = await fetch(`${resolveApiOrigin()}/api/kiosk/devices/sos`, {
    method: 'GET',
    mode: 'cors'
  })
  if (!response.ok) {
    throw new Error(`SOS error: ${response.status}`)
  }
  return response.json()
}
