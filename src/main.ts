// import './assets/main.css'

// import { createApp } from 'vue'
// import App from './App.vue'

// createApp(App).mount('#app')

import { createApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { queryClient } from './api/queryClient'
import router from './router'
import App from './App.vue'
import './assets/main.css'

const app = createApp(App)

app.use(VueQueryPlugin, {
  queryClient,
})
app.use(router)
app.mount('#app')
