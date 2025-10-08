<script setup lang="ts">
import Button from '@/components/atoms/Button.vue'
import IconList from '@/components/atoms/icons/IconList.vue'
import IconStar from '@/components/atoms/icons/IconStar.vue'
import type { FilterType } from '@/stores/search.store'

const props = defineProps<{
  isAll: boolean
  isFavorites: boolean
  toggleFilter: (filter: FilterType) => void
}>()
</script>

<template>
  <div class="w-full bg-white shadow-[0px_-5px_4px_rgba(0,0,0,0.05)] py-4 px-6">
    <div class="max-w-[570px] mx-auto flex gap-5">
      <Button
        :variant="props.isAll ? 'primary' : 'secondary'"
        @click="props.toggleFilter('all')"
        class="w-full"
        rounded="full"
      >
        <IconList />
        All
      </Button>
      <Button
        :variant="props.isFavorites ? 'primary' : 'secondary'"
        @click="props.toggleFilter('favorites')"
        class="w-full"
        rounded="full"
      >
        <IconStar />
        Favorites
      </Button>
    </div>
  </div>
</template>
