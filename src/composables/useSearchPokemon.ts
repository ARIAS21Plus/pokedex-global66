import { computed, ref, watch } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { pokemonService } from '@/services/pokemon.service'
import type { Pokemon } from '@/types/pokemon.types'
import { useSearchStore } from '@/stores/search.store'

export function useSearchPokemon() {
  const searchStore = useSearchStore()
  const searchQuery = ref('')
  const debouncedQuery = ref('')
  let debounceTimer: ReturnType<typeof setTimeout> | null = null

  // Debounce search input
  watch(searchQuery, (newValue) => {
    if (debounceTimer) clearTimeout(debounceTimer)

    debounceTimer = setTimeout(() => {
      debouncedQuery.value = newValue.trim().toLowerCase()
    }, 500)
  })

  // Query for search
  const { data, isLoading, isError, error } = useQuery<Pokemon | null>({
    queryKey: ['pokemon-search', debouncedQuery],
    queryFn: async () => {
      if (!debouncedQuery.value) return null
      return await pokemonService.searchByName(debouncedQuery.value)
    },
    enabled: () => !!debouncedQuery.value,
    retry: false,
  })

  const clearSearch = () => {
    searchQuery.value = ''
    debouncedQuery.value = ''
  }

  const filter = computed(() => searchStore.filter)

  watch(filter, (newValue) => {
    if (newValue === 'favorites') {
      clearSearch()
    }
  })

  const isSearchActive = computed(() => {
    return debouncedQuery.value !== ''
  })

  const isEmpty = computed(() => !data.value && isSearchActive.value)
  return {
    searchQuery,
    data,
    isLoading,
    isError,
    error,
    clearSearch,
    isSearchActive,
    isEmpty,
  }
}
