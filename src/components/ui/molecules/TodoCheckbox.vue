<template>
  <Checkbox
    :checked="modelValue"
    @update:checked="$emit('update:modelValue', $event)"
    class="transition-all"
  />
</template>

<script setup lang="ts">
import { Checkbox } from "@/components/ui/atoms/checkbox";

defineProps<{
  modelValue: boolean;
}>();

defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();
</script>