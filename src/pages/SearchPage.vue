<script setup lang="ts">
import { computed } from 'vue'
import SearchTemplate from '@/components/template/Search.template.vue'
import SearchOrganism from '@/components/organism/Search.organism.vue'

import { useGetPokemons } from '@/composables/useGetPokemons'
import { useSearchPokemon } from '@/composables/useSearchPokemon'

const {
  loadMoreRef,
  filteredPokemons,
  isLoading: isGetPokemonsLoading,
  isEmpty: isGetPokemonsEmpty,
  error: getPokemonsError,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  shouldShowLoadMore,
} = useGetPokemons()

const {
  searchQuery,
  data: searchResult,
  isLoading: isSearchLoading,
  isEmpty: isSearchEmpty,
  isSearchActive,
} = useSearchPokemon()

// Show search result or filtered pokemons list
const displayPokemons = computed(() => {
  if (isSearchActive.value && searchResult.value) {
    // Convert single pokemon to list format
    return [
      {
        name: searchResult.value.name,
        url: ``,
      },
    ]
  }
  return filteredPokemons.value
})

const showLoadMore = computed(() => !isSearchActive.value && shouldShowLoadMore.value)
</script>

<template>
  <SearchTemplate>
    <SearchOrganism
      v-model:searchQuery="searchQuery"
      :displayPokemons="displayPokemons"
      :isSearchLoading="isSearchLoading"
      :isGetPokemonsLoading="isGetPokemonsLoading"
      :isGetPokemonsEmpty="isGetPokemonsEmpty"
      :isSearchEmpty="isSearchEmpty"
      :getPokemonsError="getPokemonsError"
      :showLoadMore="showLoadMore"
      :fetchNextPage="fetchNextPage"
      :hasNextPage="hasNextPage"
      :isFetchingNextPage="isFetchingNextPage"
      :shouldShowLoadMore="shouldShowLoadMore"
      :onLoadMoreRef="(el) => (loadMoreRef = el as HTMLElement)"
    />
  </SearchTemplate>
</template>
