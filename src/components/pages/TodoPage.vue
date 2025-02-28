<template>
  <MainLayout>
    <div class="max-w-4xl mx-auto">
      <Suspense>
        <template v-if="editMode">
          <TodoEditor 
            :todo-id="selectedTodoId" 
            @success="handleEditSuccess" 
            @cancel="editMode = false" 
          />
        </template>
        <template v-else>
          <TodoList 
            @add="handleAddNew" 
            @edit="handleEdit" 
          />
        </template>
      </Suspense>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MainLayout from '@/components/templates/MainLayout.vue';
import TodoList from '@/components/ui/organisms/TodoList.vue';
import TodoEditor from '@/components/ui/organisms/TodoEditor.vue';
import type { Todo } from '@/types';

const editMode = ref(false);
const selectedTodoId = ref<string | undefined>(undefined);

const handleAddNew = () => {
  selectedTodoId.value = undefined;
  editMode.value = true;
};

const handleEdit = (todo: Todo) => {
  selectedTodoId.value = todo.id;
  editMode.value = true;
};

const handleEditSuccess = () => {
  editMode.value = false;
};
</script>