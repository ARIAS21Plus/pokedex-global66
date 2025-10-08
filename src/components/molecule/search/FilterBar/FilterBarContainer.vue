<script setup lang="ts">
import { computed } from 'vue'
import { useSearchStore, type FilterType } from '@/stores/search.store'
import FilterBarView from '@/components/molecule/search/FilterBar/FilterBarView.vue'

const searchStore = useSearchStore()

const isAll = computed(() => searchStore.filter === 'all')
const isFavorites = computed(() => searchStore.filter === 'favorites')

const toggleFilter = (filter: FilterType) => {
  searchStore.setFilter(filter)
}
</script>

<template>
  <FilterBarView :isAll="isAll" :isFavorites="isFavorites" :toggleFilter="toggleFilter" />
</template>
