import { defineStore } from 'pinia'
import { ref } from 'vue'

export type FilterType = 'all' | 'favorites'

export const useSearchStore = defineStore('search', () => {
  const filter = ref<FilterType>('all')
  const searchQuery = ref('')
  const isSearchActive = ref(false)
  const modalDetailPokemon = ref<{ name: string; url: string } | null>(null)
  const isModalDetailPokemonOpen = ref(false)

  const setFilter = (newFilter: FilterType) => {
    filter.value = newFilter
  }

  const toggleFilter = () => {
    filter.value = filter.value === 'all' ? 'favorites' : 'all'
  }

  const setModalDetailPokemon = (pokemon: { name: string; url: string }) => {
    modalDetailPokemon.value = pokemon
    isModalDetailPokemonOpen.value = true
  }

  const closeModalDetailPokemon = () => {
    modalDetailPokemon.value = null
    isModalDetailPokemonOpen.value = false
  }

  return {
    filter,
    searchQuery,
    isSearchActive,
    modalDetailPokemon,
    isModalDetailPokemonOpen,
    setFilter,
    toggleFilter,
    setModalDetailPokemon,
    closeModalDetailPokemon,
  }
})
