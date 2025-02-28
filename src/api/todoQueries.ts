import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { todoApi } from './todoService'
import type { Todo, CreateTodoInput, UpdateTodoInput } from '../types'

// Query keys
export const todoKeys = {
  all: ['todos'] as const,
  lists: () => [...todoKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) =>
    [...todoKeys.lists(), { filters }] as const,
  details: () => [...todoKeys.all, 'detail'] as const,
  detail: (id: string) => [...todoKeys.details(), id] as const,
}

// Queries
export function useTodosQuery() {
  return useQuery({
    queryKey: todoKeys.lists(),
    queryFn: todoApi.getTodos,
  })
}

export function useTodoQuery(id: string) {
  return useQuery({
    queryKey: todoKeys.detail(id),
    queryFn: () => todoApi.getTodo(id),
    enabled: !!id,
  })
}

// Mutations
export function useCreateTodoMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (newTodo: CreateTodoInput) => todoApi.createTodo(newTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoKeys.lists() })
    },
  })
}

export function useUpdateTodoMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (todo: UpdateTodoInput) => todoApi.updateTodo(todo),
    onSuccess: updatedTodo => {
      queryClient.invalidateQueries({
        queryKey: todoKeys.detail(updatedTodo.id),
      })
      queryClient.invalidateQueries({ queryKey: todoKeys.lists() })
    },
  })
}

export function useDeleteTodoMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => todoApi.deleteTodo(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: todoKeys.lists() })
      queryClient.removeQueries({ queryKey: todoKeys.detail(id) })
    },
  })
}
