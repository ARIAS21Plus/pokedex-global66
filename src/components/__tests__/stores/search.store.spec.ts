import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'
import { useSearchStore } from '@/stores/search.store'

describe('useSearchStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('debe inicializar con valores por defecto', () => {
    const store = useSearchStore()

    expect(store.filter).toBe('all')
    expect(store.searchQuery).toBe('')
    expect(store.isSearchActive).toBe(false)
    expect(store.modalDetailPokemon).toBeNull()
    expect(store.isModalDetailPokemonOpen).toBe(false)
  })

  it('debe cambiar el filtro con setFilter', () => {
    const store = useSearchStore()

    store.setFilter('favorites')

    expect(store.filter).toBe('favorites')
  })

  it('debe alternar entre "all" y "favorites" con toggleFilter', () => {
    const store = useSearchStore()

    expect(store.filter).toBe('all')

    store.toggleFilter()
    expect(store.filter).toBe('favorites')

    store.toggleFilter()
    expect(store.filter).toBe('all')
  })

  it('debe abrir el modal con setModalDetailPokemon', () => {
    const store = useSearchStore()
    const pokemon = { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' }

    store.setModalDetailPokemon(pokemon)

    expect(store.modalDetailPokemon).toEqual(pokemon)
    expect(store.isModalDetailPokemonOpen).toBe(true)
  })

  it('debe cerrar el modal con closeModalDetailPokemon', () => {
    const store = useSearchStore()
    const pokemon = { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' }

    // Primero abrir el modal
    store.setModalDetailPokemon(pokemon)
    expect(store.isModalDetailPokemonOpen).toBe(true)

    // Luego cerrar
    store.closeModalDetailPokemon()

    expect(store.modalDetailPokemon).toBeNull()
    expect(store.isModalDetailPokemonOpen).toBe(false)
  })

  it('debe mantener el estado correcto al cambiar múltiples veces de filtro', () => {
    const store = useSearchStore()

    store.setFilter('favorites')
    store.setFilter('all')
    store.setFilter('favorites')

    expect(store.filter).toBe('favorites')
  })
})
