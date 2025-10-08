import { computed } from 'vue'
import { useInfiniteQuery } from '@tanstack/vue-query'
import { pokemonService } from '@/services/pokemon.service'
import type { PokemonListResponse } from '@/types/pokemon.types'

const LIMIT = 20

export function useInfinitePokemonQuery() {
  const { data, error, isError, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery<PokemonListResponse>({
      queryKey: ['pokemons', LIMIT],
      queryFn: ({ pageParam = 0 }) =>
        pokemonService.getList({ limit: LIMIT, offset: pageParam as number }),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        if (!lastPage?.next) return undefined
        try {
          const nextUrl = new URL(lastPage.next)
          const offStr = nextUrl.searchParams.get('offset')
          const nextOffset = offStr ? Number(offStr) : undefined
          return Number.isFinite(nextOffset) ? nextOffset : undefined
        } catch {
          return undefined
        }
      },
    })

  const allPokemons = computed(() => data?.value?.pages.flatMap((p) => p.results) ?? [])

  return {
    data,
    error,
    isLoading,
    isError,
    allPokemons,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  }
}
