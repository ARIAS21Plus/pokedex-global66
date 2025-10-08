import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { computed } from 'vue'
import { usePokemonFilter } from '@/composables/usePokemonFilter'
import { useSearchStore } from '@/stores/search.store'
import { useFavoritesStore } from '@/stores/favorites.store'
import type { PokemonListItem } from '@/types/pokemon.types'

describe('usePokemonFilter', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  const mockPokemons: PokemonListItem[] = [
    { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
    { name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' },
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
  ]

  it('debe retornar todos los pokémons cuando filter es "all"', () => {
    const searchStore = useSearchStore()
    searchStore.setFilter('all')

    const pokemons = computed(() => mockPokemons)
    const { filteredPokemons } = usePokemonFilter(pokemons)

    expect(filteredPokemons.value).toHaveLength(3)
    expect(filteredPokemons.value).toEqual(mockPokemons)
  })

  it('debe filtrar solo favoritos cuando filter es "favorites"', () => {
    const searchStore = useSearchStore()
    const favoritesStore = useFavoritesStore()

    // Agregar pikachu a favoritos
    favoritesStore.toggle(mockPokemons[0])
    searchStore.setFilter('favorites')

    const pokemons = computed(() => mockPokemons)
    const { filteredPokemons } = usePokemonFilter(pokemons)

    expect(filteredPokemons.value).toHaveLength(1)
    expect(filteredPokemons.value[0].name).toBe('pikachu')
  })

  it('debe retornar array vacío cuando no hay favoritos y filter es "favorites"', () => {
    const searchStore = useSearchStore()
    searchStore.setFilter('favorites')

    const pokemons = computed(() => mockPokemons)
    const { filteredPokemons } = usePokemonFilter(pokemons)

    expect(filteredPokemons.value).toHaveLength(0)
  })

  it('debe mostrar botón "load more" solo cuando filter es "all"', () => {
    const searchStore = useSearchStore()
    const pokemons = computed(() => mockPokemons)

    searchStore.setFilter('all')
    const { shouldShowLoadMore: shouldShowAll } = usePokemonFilter(pokemons)
    expect(shouldShowAll.value).toBe(true)

    searchStore.setFilter('favorites')
    const { shouldShowLoadMore: shouldShowFav } = usePokemonFilter(pokemons)
    expect(shouldShowFav.value).toBe(false)
  })

  it('debe actualizar filteredPokemons cuando cambian los favoritos', () => {
    const searchStore = useSearchStore()
    const favoritesStore = useFavoritesStore()

    searchStore.setFilter('favorites')
    const pokemons = computed(() => mockPokemons)
    const { filteredPokemons } = usePokemonFilter(pokemons)

    // Inicialmente vacío
    expect(filteredPokemons.value).toHaveLength(0)

    // Agregar favorito
    favoritesStore.toggle(mockPokemons[0])
    expect(filteredPokemons.value).toHaveLength(1)

    // Agregar otro favorito
    favoritesStore.toggle(mockPokemons[1])
    expect(filteredPokemons.value).toHaveLength(2)

    // Remover un favorito
    favoritesStore.toggle(mockPokemons[0])
    expect(filteredPokemons.value).toHaveLength(1)
    expect(filteredPokemons.value[0].name).toBe('charizard')
  })

  it('debe retornar el filtro actual correctamente', () => {
    const searchStore = useSearchStore()
    const pokemons = computed(() => mockPokemons)

    const { currentFilter } = usePokemonFilter(pokemons)

    expect(currentFilter.value).toBe('all')

    searchStore.setFilter('favorites')
    expect(currentFilter.value).toBe('favorites')
  })
})
