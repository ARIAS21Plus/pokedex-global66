import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'
import { useFavoritesStore } from '@/stores/favorites.store'

describe('useFavoritesStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it('debe inicializar con items vacío', () => {
    const store = useFavoritesStore()
    expect(store.items).toEqual({})
  })

  it('debe agregar un pokémon a favoritos', () => {
    const store = useFavoritesStore()
    const pokemon = { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' }

    store.toggle(pokemon)

    expect(store.items['pikachu']).toEqual(pokemon)
  })

  it('debe remover un pokémon de favoritos si ya existe', () => {
    const store = useFavoritesStore()
    const pokemon = { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' }

    // Agregar
    store.toggle(pokemon)
    expect(store.items['pikachu']).toBeDefined()

    // Remover
    store.toggle(pokemon)
    expect(store.items['pikachu']).toBeUndefined()
  })

  it('debe manejar múltiples pokémons favoritos', () => {
    const store = useFavoritesStore()
    const pikachu = { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' }
    const charizard = { name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' }

    store.toggle(pikachu)
    store.toggle(charizard)

    expect(Object.keys(store.items)).toHaveLength(2)
    expect(store.items['pikachu']).toEqual(pikachu)
    expect(store.items['charizard']).toEqual(charizard)
  })

  it('debe permitir agregar y remover diferentes pokémons independientemente', () => {
    const store = useFavoritesStore()
    const pikachu = { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' }
    const charizard = { name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' }

    store.toggle(pikachu)
    store.toggle(charizard)
    store.toggle(pikachu) // Remover pikachu

    expect(store.items['pikachu']).toBeUndefined()
    expect(store.items['charizard']).toEqual(charizard)
  })
})
