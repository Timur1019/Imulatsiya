import { onMounted, onUnmounted } from 'vue'

export function useClickOutside(targetRef, onOutside) {
  function handlePointer(event) {
    const el = targetRef.value
    if (!el || el.contains(event.target)) return
    onOutside()
  }

  onMounted(() => {
    document.addEventListener('pointerdown', handlePointer)
  })

  onUnmounted(() => {
    document.removeEventListener('pointerdown', handlePointer)
  })
}
