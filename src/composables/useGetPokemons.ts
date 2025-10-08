import { computed } from 'vue'
import { useInfinitePokemonQuery } from './useInfinitePokemonQuery'
import { usePokemonFilter } from './usePokemonFilter'
import { useInfiniteScroll } from './useInfiniteScroll'

export function useGetPokemons() {
  // Fetch pokemons
  const { allPokemons, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfinitePokemonQuery()

  // Filter pokemons
  const { filteredPokemons, shouldShowLoadMore } = usePokemonFilter(allPokemons)

  // Infinite scroll
  const canLoadMore = computed(() => hasNextPage.value && !isFetchingNextPage.value)
  const { targetRef: loadMoreRef } = useInfiniteScroll({
    onLoadMore: fetchNextPage,
    enabled: canLoadMore,
  })

  // Empty state
  const isEmpty = computed(() => !isLoading.value && filteredPokemons.value.length === 0)

  return {
    // Refs
    loadMoreRef,

    // Data
    filteredPokemons,
    allPokemons,

    // States
    isLoading,
    isError,
    isEmpty,
    error,

    // Pagination
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    shouldShowLoadMore,
  }
}
