import { createSSRApp } from 'vue'
import { createRouter } from './router'
import { createHead, useHead } from '@vueuse/head'

import App from './App.vue'

import './assets/style/index.scss'

export function createApp() {
  // TODO: create store
  const app = createSSRApp(App)
  const router = createRouter()
  const head = createHead()
  app.use(router).use(head)

  return { app, head, router }
}
