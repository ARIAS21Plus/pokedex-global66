<script setup lang="ts">
import Button from '@/components/atoms/Button.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="flex flex-col items-center w-full gap-5 py-5 px-5">
    <h1 class="text-4xl font-bold">Uh-oh!</h1>
    <p class="text-md text-secondary">You look lost on your journey!</p>
    <Button :as="RouterLink" to="/" variant="primary" rounded="full">Go back home</Button>
  </div>
</template>
