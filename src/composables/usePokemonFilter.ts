import { computed, type ComputedRef } from 'vue'
import { useSearchStore } from '@/stores/search.store'
import { useFavoritesStore } from '@/stores/favorites.store'
import type { PokemonListItem } from '@/types/pokemon.types'

export function usePokemonFilter(pokemons: ComputedRef<PokemonListItem[]>) {
  const searchStore = useSearchStore()
  const favoritesStore = useFavoritesStore()

  const filteredPokemons = computed(() => {
    if (searchStore.filter === 'favorites') {
      return pokemons.value.filter((pokemon) => favoritesStore.items[pokemon.name])
    }
    return pokemons.value
  })

  const shouldShowLoadMore = computed(() => searchStore.filter === 'all')

  return {
    filteredPokemons,
    shouldShowLoadMore,
    currentFilter: computed(() => searchStore.filter),
  }
}
