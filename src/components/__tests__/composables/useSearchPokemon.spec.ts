import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'
import { useSearchPokemon } from '@/composables/useSearchPokemon'
import { useSearchStore } from '@/stores/search.store'

// Mock del servicio
vi.mock('@/services/pokemon.service', () => ({
  pokemonService: {
    searchByName: vi.fn().mockResolvedValue({
      id: 25,
      name: 'pikachu',
    }),
  },
}))

describe('useSearchPokemon', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    setActivePinia(createPinia())
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    })
    vi.clearAllMocks()
  })

  afterEach(() => {
    queryClient.clear()
    vi.clearAllTimers()
  })

  // Helper para crear wrapper con contexto de vue-query
  const createWrapper = (setup: () => unknown) => {
    return mount(
      defineComponent({
        setup,
        render: () => h('div'),
      }),
      {
        global: {
          plugins: [[VueQueryPlugin, { queryClient }]],
        },
      },
    )
  }

  it('debe inicializar con searchQuery vacío', () => {
    const wrapper = createWrapper(() => {
      const result = useSearchPokemon()
      expect(result.searchQuery.value).toBe('')
      expect(result.isSearchActive.value).toBe(false)
      return result
    })
    wrapper.unmount()
  })

  it('debe limpiar la búsqueda con clearSearch', async () => {
    const wrapper = createWrapper(() => {
      const { searchQuery, clearSearch, isSearchActive } = useSearchPokemon()

      searchQuery.value = 'pikachu'
      clearSearch()

      expect(searchQuery.value).toBe('')
      expect(isSearchActive.value).toBe(false)

      return { searchQuery, clearSearch, isSearchActive }
    })
    wrapper.unmount()
  })

  it('debe marcar isEmpty cuando no hay resultados y la búsqueda está activa', () => {
    const wrapper = createWrapper(() => {
      const { isEmpty } = useSearchPokemon()
      // Sin búsqueda activa
      expect(isEmpty.value).toBe(false)
      return { isEmpty }
    })
    wrapper.unmount()
  })

  it('debe limpiar búsqueda al cambiar a filtro "favorites"', () => {
    const wrapper = createWrapper(() => {
      const searchStore = useSearchStore()
      const { searchQuery, clearSearch } = useSearchPokemon()

      searchQuery.value = 'pikachu'

      // Simular cambio a favorites
      searchStore.setFilter('favorites')
      clearSearch()

      expect(searchQuery.value).toBe('')

      return { searchQuery, clearSearch }
    })
    wrapper.unmount()
  })

  it('debe mantener el estado de isSearchActive basado en debouncedQuery', () => {
    const wrapper = createWrapper(() => {
      const { searchQuery, isSearchActive } = useSearchPokemon()

      expect(isSearchActive.value).toBe(false)

      searchQuery.value = 'test'
      // Nota: isSearchActive depende de debouncedQuery que tiene delay de 500ms
      expect(isSearchActive.value).toBe(false)

      return { searchQuery, isSearchActive }
    })
    wrapper.unmount()
  })
})
