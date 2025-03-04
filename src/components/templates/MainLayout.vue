<template>
  <div class="min-h-screen bg-background">
    <Header>
      <h1 class="text-2xl font-bold">Todo App</h1>
    </Header>

    <main class="container mx-auto py-8">
      <slot></slot>
    </main>

    <Footer>
      &copy; {{ new Date().getFullYear() }} Todo App - Built with Vue 3 and TanStack Query
    </Footer>
  </div>
</template>

<script setup lang="ts">
import { Header } from '@/components/ui/atoms/header';
import { Footer } from '@/components/ui/atoms/footer';
</script>
