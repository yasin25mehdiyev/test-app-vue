<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ isEditing ? 'Edit' : 'Add' }} Todo</CardTitle>
    </CardHeader>
    <CardContent>
      <div v-if="isLoading" class="p-4 text-center">
        <Loader2 class="h-6 w-6 animate-spin mx-auto" />
        <p class="text-sm text-muted-foreground mt-2">Loading todo...</p>
      </div>
      
      <div v-else-if="isLoadError" class="p-4 text-center">
        <AlertCircle class="h-6 w-6 text-destructive mx-auto" />
        <p class="text-sm text-destructive mt-2">Failed to load todo</p>
        <Button variant="outline" size="sm" class="mt-2" @click="$emit('cancel')">
          Go back
        </Button>
      </div>
      
      <TodoForm
        v-else
        :todo-id="todoId"
        :initial-data="todo"
        @submit="handleSubmit"
        @cancel="$emit('cancel')"
      />
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Loader2, AlertCircle } from 'lucide-vue-next';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/atoms/card';
import { Button } from '@/components/ui/atoms/button';
import TodoForm from '@/components/ui/molecules/TodoForm.vue';
import { useTodoQuery, useCreateTodoMutation, useUpdateTodoMutation } from '@/api/todoQueries';
import type { CreateTodoInput, UpdateTodoInput } from '@/types';

const props = defineProps<{
  todoId?: string;
}>();

const emit = defineEmits<{
  (e: 'success'): void;
  (e: 'cancel'): void;
}>();

const isEditing = !!props.todoId;

// Queries and mutations
const { 
  data: todo, 
  isLoading, 
  isError: isLoadError 
} = useTodoQuery(props.todoId || '');

const createTodoMutation = useCreateTodoMutation();
const updateTodoMutation = useUpdateTodoMutation();

// Event handlers
const handleSubmit = (data: CreateTodoInput | UpdateTodoInput) => {
  if (isEditing) {
    updateTodoMutation.mutate(data as UpdateTodoInput, {
      onSuccess: () => emit('success'),
    });
  } else {
    createTodoMutation.mutate(data as CreateTodoInput, {
      onSuccess: () => emit('success'),
    });
  }
};
</script>
