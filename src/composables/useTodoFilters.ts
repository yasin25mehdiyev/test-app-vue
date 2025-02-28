import { ref, computed } from 'vue'
import { TodoFilter } from '@/types'

export function useTodoFilters<T extends { completed: boolean }>(
  items: T[] | undefined
) {
  const activeFilter = ref<TodoFilter>(TodoFilter.ALL)

  const filteredItems = computed(() => {
    if (!items) return []

    switch (activeFilter.value) {
      case TodoFilter.ACTIVE:
        return items.filter(item => !item.completed)
      case TodoFilter.COMPLETED:
        return items.filter(item => item.completed)
      default:
        return items
    }
  })

  return {
    activeFilter,
    filteredItems,
    setFilter: (filter: TodoFilter) => {
      activeFilter.value = filter
    },
  }
}
