<script setup lang="ts">
import { RouterLink } from 'vue-router'
import PikachuSvg from '@/components/atoms/PikachuSvg.vue'
import Button from '@/components/atoms/Button.vue'
</script>

<template>
  <div class="space-y-12 flex flex-col items-center py-12 px-5">
    <PikachuSvg class="max-w-[320px]" />
    <div class="space-y-8 text-center max-w-[570px]">
      <h1 class="text-2xl font-bold">Welcome to Pokédex</h1>
      <p class="text-md text-secondary">
        The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the
        Pokémon world.
      </p>
      <Button :as="RouterLink" to="/search" variant="primary" rounded="full"> Get started </Button>
    </div>
  </div>
</template>
