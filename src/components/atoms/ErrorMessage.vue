<script setup lang="ts">
const props = defineProps<{
  error: Error | string
}>()
</script>

<template>
  <div class="w-full px-5 py-2 bg-white border border-red-500 rounded">
    <p class="text-red-500">
      An error occurred: {{ (props.error as Error)?.message || props.error }}
    </p>
  </div>
</template>
