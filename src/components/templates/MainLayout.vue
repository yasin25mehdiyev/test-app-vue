<template>
  <div class="min-h-screen bg-background">
    <header class="border-b">
      <div class="container mx-auto py-4">
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-bold">Todo App</h1>
          <!-- Optional: could add user profile, theme toggle, etc. here -->
        </div>
      </div>
    </header>
    
    <main class="container mx-auto py-8">
      <slot></slot>
    </main>
    
    <footer class="border-t py-4">
      <div class="container mx-auto text-center text-sm text-muted-foreground">
        &copy; {{ new Date().getFullYear() }} Todo App - Built with Vue 3 and TanStack Query
      </div>
    </footer>
  </div>
</template>
