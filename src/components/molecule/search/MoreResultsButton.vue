<script setup lang="ts">
import Button from '@/components/atoms/Button.vue'

const props = defineProps<{
  fetchNextPage: () => void
  hasNextPage: boolean
  isFetchingNextPage: boolean
}>()
</script>

<template>
  <div class="flex justify-center">
    <Button
      data-testid="load-more-btn"
      @click="props.fetchNextPage"
      :disabled="!props.hasNextPage || props.isFetchingNextPage"
      variant="secondary"
    >
      <span v-if="props.isFetchingNextPage">Loading…</span>
      <span v-else-if="props.hasNextPage">Load more</span>
      <span v-else>No more results</span>
    </Button>
  </div>
</template>
