<script setup lang="ts">
import FilterBarContainer from '@/components/molecule/search/FilterBar/FilterBarContainer.vue'
</script>

<template>
  <div class="w-full flex flex-col h-dvh">
    <main class="flex-1 overflow-y-auto px-6">
      <slot />
    </main>
    <FilterBarContainer />
  </div>
</template>
