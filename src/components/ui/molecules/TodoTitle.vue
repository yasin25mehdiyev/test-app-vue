<template>
  <p :class="[
    'text-sm transition-colors',
    completed ? 'text-muted-foreground line-through' : 'text-foreground'
  ]">
    {{ title }}
  </p>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  completed: boolean;
}>();
</script>
