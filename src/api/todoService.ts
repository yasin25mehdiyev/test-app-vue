import axios from 'axios'
import type { Todo, CreateTodoInput, UpdateTodoInput } from '../types'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const todoApi = {
  getTodos: async (): Promise<Todo[]> => {
    const { data } = await api.get('/todos')
    return data
  },

  getTodo: async (id: string): Promise<Todo> => {
    const { data } = await api.get(`/todos/${id}`)
    return data
  },

  createTodo: async (todo: CreateTodoInput): Promise<Todo> => {
    const { data } = await api.post('/todos', todo)
    return data
  },

  updateTodo: async ({ id, ...todo }: UpdateTodoInput): Promise<Todo> => {
    const { data } = await api.put(`/todos/${id}`, todo)
    return data
  },

  deleteTodo: async (id: string): Promise<void> => {
    await api.delete(`/todos/${id}`)
  },
}
