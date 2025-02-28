export interface Todo {
  id: string
  title: string
  description?: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

export type CreateTodoInput = {
  title: string
  description?: string
  completed?: boolean
}

export type UpdateTodoInput = {
  id: string
  title?: string
  description?: string
  completed?: boolean
}

export enum TodoFilter {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}
