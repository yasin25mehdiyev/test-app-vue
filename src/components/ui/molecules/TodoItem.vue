<template>
  <div class="flex items-center gap-2 p-2 border-b">
    <TodoCheckbox v-model="isCompleted" />
    <div class="flex-1" @click="$emit('edit', todo)">
      <TodoTitle :title="todo.title" :completed="todo.completed" />
      <p v-if="todo.description" class="text-xs text-muted-foreground">
        {{ todo.description }}
      </p>
    </div>
    <Button variant="ghost" size="icon" @click="$emit('delete', todo.id)">
      <Trash class="h-4 w-4" />
    </Button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Trash } from 'lucide-vue-next';
import { Button } from '@/components/ui/atoms/button';
import TodoCheckbox from '@/components/ui/molecules/TodoCheckbox.vue';
import TodoTitle from '@/components/ui/molecules/TodoTitle.vue';
import type { Todo } from '@/types';

const props = defineProps<{
  todo: Todo;
}>();

const emit = defineEmits<{
  (e: 'update', id: string, completed: boolean): void;
  (e: 'delete', id: string): void;
  (e: 'edit', todo: Todo): void;
}>();

const isCompleted = ref(props.todo.completed);

watch(isCompleted, (newValue) => {
  emit('update', props.todo.id, newValue);
});
</script>