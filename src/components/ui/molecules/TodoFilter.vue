<template>
  <div class="flex space-x-1 bg-muted p-1 rounded-md">
    <Button
      v-for="filter in filters"
      :key="filter.value"
      :variant="modelValue === filter.value ? 'default' : 'ghost'"
      size="sm"
      @click="$emit('update:modelValue', filter.value)"
    >
      {{ filter.label }}
    </Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/atoms/button'
import { TodoFilter as FilterType } from '@/types'

defineProps<{
  modelValue: FilterType
}>()

defineEmits<{
  (e: 'update:modelValue', value: FilterType): void
}>()

const filters = [
  { label: 'All', value: FilterType.ALL },
  { label: 'Active', value: FilterType.ACTIVE },
  { label: 'Completed', value: FilterType.COMPLETED },
]
</script>
