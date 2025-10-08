<script setup lang="ts">
import { type ComponentPublicInstance } from 'vue'
import PokeBallSvg from '@/components/atoms/PokeBallSvg.vue'
import ListPokemonsContainer from '@/components/molecule/search/Pokemons/ListPokemons/ListPokemonsContiner.vue'
import EmptyResults from '@/components/molecule/search/EmptyResults.vue'
import ErrorMessage from '@/components/atoms/ErrorMessage.vue'
import MoreResultsButton from '@/components/molecule/search/MoreResultsButton.vue'
import SearchFormContainer from '@/components/molecule/search/SearchForm/SearchFormContainer.vue'
import ModalDetailPokemonsContainer from '@/components/molecule/search/ModalDetailPokemons/ModalDetailPokemonsContainer.vue'

const props = defineProps<{
  searchQuery: string
  displayPokemons: { name: string; url: string }[]
  isSearchLoading: boolean
  isGetPokemonsLoading: boolean
  isGetPokemonsEmpty: boolean
  isSearchEmpty: boolean
  getPokemonsError: Error | null
  showLoadMore: boolean
  hasNextPage: boolean
  isFetchingNextPage: boolean
  shouldShowLoadMore: boolean
  fetchNextPage: () => void
  onLoadMoreRef: (el: Element | ComponentPublicInstance | null) => void
}>()

const emit = defineEmits<{
  'update:searchQuery': [value: string]
}>()
</script>

<template>
  <div class="max-w-[570px] mx-auto py-8 w-full">
    <div class="space-y-6">
      <div class="sticky top-0 bg-background z-10 py-2">
        <SearchFormContainer
          :modelValue="props.searchQuery"
          @update:modelValue="emit('update:searchQuery', $event)"
        />
      </div>

      <PokeBallSvg
        class="w-10 h-10 animate-spin"
        v-if="props.isSearchLoading || props.isGetPokemonsLoading"
      />

      <EmptyResults v-else-if="props.isGetPokemonsEmpty || props.isSearchEmpty" />

      <ListPokemonsContainer
        :pokemons="props.displayPokemons"
        v-else-if="props.displayPokemons.length"
      />

      <ModalDetailPokemonsContainer />

      <ErrorMessage v-if="props.getPokemonsError" :error="props.getPokemonsError" />

      <!-- Manual load more button -->
      <div v-if="props.showLoadMore">
        <MoreResultsButton
          :fetchNextPage="props.fetchNextPage"
          :hasNextPage="props.hasNextPage"
          :isFetchingNextPage="props.isFetchingNextPage"
        />

        <!-- Sentinel for IntersectionObserver -->
        <div v-if="props.shouldShowLoadMore" :ref="props.onLoadMoreRef" class="h-10"></div>
      </div>
    </div>
  </div>
</template>
