import { ref, watch } from 'vue'

export function useDebounce<T>(value: T, delay = 300) {
  const debouncedValue = ref(value)
  let timeout: number | undefined

  watch(
    () => value,
    newValue => {
      clearTimeout(timeout)
      timeout = window.setTimeout(() => {
        debouncedValue.value = newValue
      }, delay)
    },
    { immediate: true }
  )

  return debouncedValue
}
