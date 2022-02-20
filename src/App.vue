<script setup>
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import seo from '../plugins/seo.js'
import { useHead } from '@vueuse/head'

const router = useRouter()
const route = useRoute()
const head = reactive(seo(route.meta))

useHead(head)

router.beforeEach((route) => {
  const headData = seo(route.meta)
  Object.assign(head, headData)
})
</script>

<template>
  <nav class="w-screen absolute flex">
    <router-link to="/" class="block p-8">Home</router-link>
    <router-link to="/contact" class="block p-8">Contact</router-link>
  </nav>
  <div class="flex h-screen justify-center items-center">
    <router-view></router-view>
  </div>
</template>

<style></style>
