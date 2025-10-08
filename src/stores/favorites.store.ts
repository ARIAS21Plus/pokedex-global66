import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    items: {} as Record<string, { name: string; url: string }>,
  }),
  actions: {
    toggle(p: { name: string; url: string }) {
      if (this.items[p.name]) delete this.items[p.name]
      else this.items[p.name] = p
    },
  },
  persist: {
    key: 'favorites_pokemons',
    storage: localStorage,
    pick: ['items'],
  },
})
