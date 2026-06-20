/**
 * Адрес backend API.
 *
 * Приоритет:
 * 1) VITE_API_ORIGIN из .env.development / .env.production
 * 2) prod без env — тот же origin, что и страница (nginx reverse proxy)
 * 3) dev без env — hostname:8080
 */
export function resolveApiOrigin() {
  const fromEnv = import.meta.env.VITE_API_ORIGIN?.trim()
  if (fromEnv) {
    return fromEnv.replace(/\/$/, '')
  }

  if (import.meta.env.PROD) {
    return window.location.origin
  }

  const { protocol, hostname } = window.location
  return `${protocol}//${hostname}:8080`
}
