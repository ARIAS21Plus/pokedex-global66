import { type ComputedRef, type Ref, unref } from 'vue'
import { pokemonService } from '@/services/pokemon.service'
import type { Pokemon } from '@/types/pokemon.types'
import { useQuery } from '@tanstack/vue-query'

export function useGetPokemonDetail(name: Ref<string> | ComputedRef<string>) {
  const { data, isLoading, isError, error } = useQuery<Pokemon>({
    queryKey: ['pokemon-detail', name],
    queryFn: () => pokemonService.searchByName(unref(name)),
    enabled: () => !!unref(name),
  })

  return {
    data,
    isLoading,
    isError,
    error,
  }
}
