<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-semibold">My Todos</h2>
      <div class="flex gap-2">
        <TodoFilter v-model="activeFilter" />
        <Button size="sm" @click="$emit('add')" class="gap-1">
          <Plus class="h-4 w-4" /> Add
        </Button>
      </div>
    </div>
    
    <Card>
      <CardContent class="p-0">
        <div v-if="isLoading" class="p-4 text-center">
          <Loader2 class="h-6 w-6 animate-spin mx-auto" />
          <p class="text-sm text-muted-foreground mt-2">Loading todos...</p>
        </div>
        
        <div v-else-if="isError" class="p-4 text-center">
          <AlertCircle class="h-6 w-6 text-destructive mx-auto" />
          <p class="text-sm text-destructive mt-2">Failed to load todos</p>
          <Button variant="outline" size="sm" class="mt-2" @click="refetch">
            Retry
          </Button>
        </div>
        
        <div v-else-if="!filteredTodos.length" class="p-4 text-center">
          <p class="text-muted-foreground">
            {{ 
              activeFilter === 'all' 
                ? 'No todos yet. Create your first one!' 
                : `No ${activeFilter === 'active' ? 'active' : 'completed'} todos found.` 
            }}
          </p>
        </div>
        
        <template v-else>
          <TodoItem
            v-for="todo in filteredTodos"
            :key="todo.id"
            :todo="todo"
            @update="handleUpdate"
            @delete="handleDelete"
            @edit="$emit('edit', todo)"
          />
        </template>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Loader2, AlertCircle, Plus } from 'lucide-vue-next';
import { Card, CardContent } from '@/components/ui/atoms/card/index';
import { Button } from '@/components/ui/atoms/button';
import TodoItem from '@/components/ui/molecules/TodoItem.vue';
import TodoFilter from '@/components/ui/molecules/TodoFilter.vue';
import { useTodosQuery, useUpdateTodoMutation, useDeleteTodoMutation } from '@/api/todoQueries';
import { type Todo, TodoFilter as FilterType } from '@/types';

const emit = defineEmits<{
  (e: 'add'): void;
  (e: 'edit', todo: Todo): void;
}>();

// Queries and mutations
const { data: todos, isLoading, isError, refetch } = useTodosQuery();
const updateTodoMutation = useUpdateTodoMutation();
const deleteTodoMutation = useDeleteTodoMutation();

// Filtering
const activeFilter = ref<FilterType>(FilterType.ALL);

const filteredTodos = computed(() => {
  if (!todos.value) return [];
  
  switch (activeFilter.value) {
    case 'active':
      return todos.value.filter(todo => !todo.completed);
    case 'completed':
      return todos.value.filter(todo => todo.completed);
    default:
      return todos.value;
  }
});

// Event handlers
const handleUpdate = (id: string, completed: boolean) => {
  updateTodoMutation.mutate({ id, completed });
};

const handleDelete = (id: string) => {
  deleteTodoMutation.mutate(id);
};
</script>
