<script setup></script>

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
