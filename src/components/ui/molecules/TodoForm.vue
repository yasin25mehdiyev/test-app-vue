<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div class="space-y-2">
      <Label for="title">Title</Label>
      <Input
        id="title"
        v-model="form.title"
        placeholder="What needs to be done?"
        required
      />
    </div>
    
    <div class="space-y-2">
      <Label for="description">Description (optional)</Label>
      <Textarea
        id="description"
        v-model="form.description"
        placeholder="Add details..."
        rows="3"
      />
    </div>
    
    <div class="flex items-center space-x-2">
      <Checkbox id="completed" v-model="form.completed" />
      <Label for="completed">Mark as completed</Label>
    </div>
    
    <div class="flex justify-end gap-2">
      <Button variant="outline" type="button" @click="$emit('cancel')">
        Cancel
      </Button>
      <Button type="submit" :disabled="!form.title">
        {{ todoId ? 'Update' : 'Add' }} Todo
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import { Input } from '@/components/atoms/input';
import { Label } from '@/components/atoms/label';
import { Button } from '@/components/ui/atoms/button';
import { Checkbox } from '@/components/ui/atoms/checkbox';
import { Textarea } from '@/components/atoms/textarea';
import type { Todo, CreateTodoInput, UpdateTodoInput } from '@/types';

const props = defineProps<{
  todoId?: string;
  initialData?: Todo;
}>();

const emit = defineEmits<{
  (e: 'submit', data: CreateTodoInput | UpdateTodoInput): void;
  (e: 'cancel'): void;
}>();

const form = reactive<{
  title: string;
  description: string;
  completed: boolean;
}>({
  title: '',
  description: '',
  completed: false,
});

onMounted(() => {
  if (props.initialData) {
    form.title = props.initialData.title;
    form.description = props.initialData.description || '';
    form.completed = props.initialData.completed;
  }
});

const handleSubmit = () => {
  if (props.todoId) {
    emit('submit', {
      id: props.todoId,
      title: form.title,
      description: form.description || undefined,
      completed: form.completed,
    });
  } else {
    emit('submit', {
      title: form.title,
      description: form.description || undefined,
      completed: form.completed,
    });
  }
};
</script>
