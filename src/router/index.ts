import { createRouter, createWebHistory } from 'vue-router'
import TodoPage from '@/components/pages/TodoPage.vue'

const routes = [
  {
    path: '/',
    name: 'todos',
    component: TodoPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
