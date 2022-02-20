import { createSSRApp } from 'vue'
import { createRouter } from './router'
import App from './App.vue'

import './assets/style/index.scss'

export function createApp() {
  // TODO: create store
  const app = createSSRApp(App)
  const router = createRouter()
  app.use(router)

  return { app, router }
}
