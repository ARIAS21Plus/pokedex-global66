<script setup lang="ts">
import { computed } from 'vue'
import ItemPokemonView from '@/components/molecule/search/Pokemons/ItemPokemon/ItemPokemonView.vue'
import { useFavoritesStore } from '@/stores/favorites.store'

const favoritesStore = useFavoritesStore()

const props = defineProps<{
  pokemon: {
    url: string
    name: string
  }
  onOpenModalDetailPokemon: (pokemon: { url: string; name: string }) => void
}>()

const isFavorite = computed(() => !!favoritesStore.items[props.pokemon.name])

const toggleFavorite = () => {
  favoritesStore.toggle(props.pokemon)
}
</script>

<template>
  <ItemPokemonView
    :pokemon="props.pokemon"
    :onOpenModalDetailPokemon="props.onOpenModalDetailPokemon"
    :isFavorite="isFavorite"
    :toggleFavorite="toggleFavorite"
  />
</template>
